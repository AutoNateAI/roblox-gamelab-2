document.querySelectorAll("button, .primary-button, .secondary-button, .outline-button, .filter-row button").forEach((element) => {
  element.addEventListener("mousedown", () => element.classList.add("pressed"));
  element.addEventListener("mouseup", () => element.classList.remove("pressed"));
  element.addEventListener("mouseleave", () => element.classList.remove("pressed"));
});

window.addEventListener("scroll", () => {
  document.querySelector(".top-shell")?.classList.toggle("scrolled", window.scrollY > 30);
});

// --- Dark mode toggle ---
function syncThemeIcon() {
  const button = document.querySelector("[data-theme-toggle] .material-symbols-outlined");
  if (!button) return;
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  button.textContent = theme === "dark" ? "light_mode" : "dark_mode";
}

document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("anai-theme", next);
  syncThemeIcon();
});

syncThemeIcon();

// --- Mermaid diagrams (lazy-loaded only when a tutorial page has one) ---
const mermaidBlocks = Array.from(document.querySelectorAll("pre.mermaid"));
if (mermaidBlocks.length) {
  mermaidBlocks.forEach((block) => {
    block.dataset.mermaidSource = block.textContent;
  });
  import("https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs").then(({ default: mermaid }) => {
    const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
    const darkVars = {
      fontFamily: "JetBrains Mono, monospace",
      background: "#0e141d",
      primaryColor: "#121a24",
      primaryBorderColor: "#3a4b5c",
      primaryTextColor: "#eef2ee",
      lineColor: "#f2b134",
      secondaryColor: "#1a2430",
      secondaryBorderColor: "#3a4b5c",
      secondaryTextColor: "#eef2ee",
      tertiaryColor: "#1a2430",
      tertiaryBorderColor: "#3a4b5c",
      tertiaryTextColor: "#eef2ee",
      edgeLabelBackground: "#0e141d",
      clusterBkg: "#0e141d",
      clusterBorder: "#253141",
      textColor: "#eef2ee",
      nodeTextColor: "#eef2ee",
    };
    const lightVars = {
      fontFamily: "JetBrains Mono, monospace",
      background: "#eef1e8",
      primaryColor: "#ffffff",
      primaryBorderColor: "#aab5a2",
      primaryTextColor: "#14181a",
      lineColor: "#9a6c00",
      secondaryColor: "#e2e8da",
      secondaryBorderColor: "#aab5a2",
      secondaryTextColor: "#14181a",
      tertiaryColor: "#e2e8da",
      tertiaryBorderColor: "#aab5a2",
      tertiaryTextColor: "#14181a",
      edgeLabelBackground: "#eef1e8",
      clusterBkg: "#eef1e8",
      clusterBorder: "#d7ddce",
      textColor: "#14181a",
      nodeTextColor: "#14181a",
    };
    function renderMermaid() {
      mermaidBlocks.forEach((block) => {
        block.removeAttribute("data-processed");
        block.innerHTML = block.dataset.mermaidSource;
      });
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: isLight() ? lightVars : darkVars,
      });
      mermaid.run({ nodes: mermaidBlocks });
    }
    renderMermaid();
    document.querySelector("[data-theme-toggle]")?.addEventListener("click", renderMermaid);
  });
}

// Shared loader for CDN libraries that only ship a classic UMD build (no ESM
// build to `import()` the way Mermaid does above) — appends a <script> tag
// and resolves once it has attached its global (window.Chart, window.L).
// Named distinctly from the Square-SDK `loadScript()` further down this file
// — this file loads as `type="module"`, where two top-level functions with
// the same name is a SyntaxError that silently kills the entire script.
function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

// --- Research charts (lazy-loaded only when a research page has one) ---
const chartBlocks = Array.from(document.querySelectorAll(".research-chart[data-chart]"));
if (chartBlocks.length) {
  const chartSpecs = chartBlocks.map((block) => {
    try {
      return JSON.parse(block.dataset.chart);
    } catch {
      return null;
    }
  });
  loadExternalScript("https://cdn.jsdelivr.net/npm/chart.js@4.4.4/dist/chart.umd.min.js").then(() => {
    const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
    const palette = ["#f2b134", "#5aa9e6", "#7fbf7f", "#e07a5f", "#9a6cff"];
    // Research-brief chart labels tend to be full sentences ("PLC reference
    // price — before H.R. 1"), not short categories. Vertical bars cram those
    // onto the x-axis and the wrapped/rotated labels eat almost the entire
    // fixed-height canvas on a phone, leaving the bars themselves a sliver —
    // fine on a wide screen, broken under ~640px. Flipping bar charts
    // horizontal on narrow viewports puts that text on the y-axis instead,
    // where it has the full chart width to read normally.
    const mobileQuery = window.matchMedia("(max-width: 640px)");
    let charts = [];
    function renderCharts() {
      charts.forEach((chart) => chart.destroy());
      charts = [];
      const isMobile = mobileQuery.matches;
      const gridColor = isLight() ? "rgba(20,24,26,0.12)" : "rgba(238,242,238,0.14)";
      const textColor = isLight() ? "#14181a" : "#eef2ee";
      chartBlocks.forEach((block, index) => {
        const spec = chartSpecs[index];
        const canvas = block.querySelector("canvas");
        if (!spec || !canvas) return;
        const type = spec.type || "bar";
        const horizontal = type === "bar" && isMobile;
        charts.push(
          new window.Chart(canvas, {
            type,
            data: {
              labels: spec.labels || [],
              datasets: (spec.series || []).map((series, seriesIndex) => ({
                label: series.name || "",
                data: series.data || [],
                backgroundColor: series.color || palette[seriesIndex % palette.length],
                borderColor: series.color || palette[seriesIndex % palette.length],
                borderWidth: type === "line" ? 2 : 0,
                tension: 0.25,
              })),
            },
            options: {
              indexAxis: horizontal ? "y" : "x",
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: spec.title ? { display: true, text: spec.title, color: textColor, font: { family: "JetBrains Mono, monospace", size: isMobile ? 12 : 13 } } : { display: false },
                legend: { display: (spec.series || []).length > 1, labels: { color: textColor, font: { family: "JetBrains Mono, monospace" } } },
              },
              scales: {
                x: { ticks: { color: textColor, font: { size: isMobile ? 11 : 12 } }, grid: { color: gridColor }, beginAtZero: horizontal },
                y: { ticks: { color: textColor, font: { size: isMobile ? 11 : 12 }, autoSkip: false }, grid: { color: gridColor }, beginAtZero: !horizontal },
              },
            },
          }),
        );
      });
    }
    renderCharts();
    document.querySelector("[data-theme-toggle]")?.addEventListener("click", renderCharts);
    mobileQuery.addEventListener("change", renderCharts);
  });
}

// --- Research maps (lazy-loaded only when a research page has one) ---
const mapBlocks = Array.from(document.querySelectorAll(".research-map[data-map]"));
if (mapBlocks.length) {
  const mapSpecs = mapBlocks.map((block) => {
    try {
      return JSON.parse(block.dataset.map);
    } catch {
      return null;
    }
  });
  const leafletCss = document.createElement("link");
  leafletCss.rel = "stylesheet";
  leafletCss.href = "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(leafletCss);
  loadExternalScript("https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js").then(() => {
    const L = window.L;
    const isLight = () => document.documentElement.getAttribute("data-theme") === "light";
    const tileUrl = () =>
      isLight() ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    let maps = [];
    function renderMaps() {
      maps.forEach((map) => map.remove());
      maps = [];
      mapBlocks.forEach((block, index) => {
        const spec = mapSpecs[index];
        const container = block.querySelector(".map-canvas");
        if (!spec || !container) return;
        container.innerHTML = "";
        const markers = spec.markers || [];
        const center = spec.center || (markers[0] ? [markers[0].lat, markers[0].lng] : [37.5, -92]);
        const map = L.map(container, { scrollWheelZoom: false }).setView(center, spec.zoom || 7);
        L.tileLayer(tileUrl(), { attribution: "&copy; OpenStreetMap &copy; CARTO", maxZoom: 18 }).addTo(map);
        markers.forEach((marker) => {
          if (typeof marker.lat === "number" && typeof marker.lng === "number") {
            L.marker([marker.lat, marker.lng]).addTo(map).bindPopup(marker.label || "");
          }
        });
        if (markers.length > 1) {
          map.fitBounds(markers.map((marker) => [marker.lat, marker.lng]), { padding: [24, 24] });
        }
        maps.push(map);
      });
    }
    renderMaps();
    document.querySelector("[data-theme-toggle]")?.addEventListener("click", renderMaps);
  });
}

// --- Research graphs (lazy — pure inline SVG + vanilla JS, no library) ---
// Server (graphBlockHtml in src/pages.mjs) renders the full node/edge layout
// and slider controls already, so this works with JS disabled too — this
// block only adds live recompute-on-slider-input on top of that.
const graphBlocks = Array.from(document.querySelectorAll(".research-graph[data-graph]"));
graphBlocks.forEach((block) => {
  let spec;
  try {
    spec = JSON.parse(block.dataset.graph);
  } catch {
    return;
  }
  const nodes = spec.nodes || [];
  const edges = spec.edges || [];
  const inputs = spec.inputs || [];
  const sliders = Array.from(block.querySelectorAll("[data-graph-input]"));

  function formatValue(value, format) {
    if (typeof value !== "number" || Number.isNaN(value)) return "";
    if (format === "percent") return `${value.toFixed(1)}%`;
    return String(Math.round(value * 100) / 100);
  }

  function recompute() {
    const values = {};
    sliders.forEach((slider) => {
      values[slider.dataset.graphInput] = Number(slider.value);
    });

    // Edge visual weight scales with how far its driving input sits from
    // that input's own range floor — purely illustrative emphasis, not a
    // magnitude claim (the evidence-class color/legend carries the actual
    // epistemic status of each edge, this only shows "more pressure here
    // right now").
    edges.forEach((edge) => {
      const edgeEl = block.querySelector(`.graph-edge[data-edge-from="${CSS.escape(edge.from)}"][data-edge-to="${CSS.escape(edge.to)}"]`);
      const inputSpec = inputs.find((inp) => inp.id === edge.from);
      if (!edgeEl || !inputSpec || values[edge.from] == null) return;
      const range = (inputSpec.max ?? 100) - (inputSpec.min ?? 0) || 1;
      const intensity = Math.min(1, Math.max(0.3, (values[edge.from] - (inputSpec.min ?? 0)) / range));
      edgeEl.style.opacity = String(intensity);
      const path = edgeEl.querySelector("path");
      if (path) path.style.strokeWidth = String(1.5 + intensity * 2.5);
    });

    // Output nodes: a linear extrapolation anchored to two real, disclosed
    // numbers (the node's own `baseline` and the driving input's own
    // `verifiedAt` value) — never a fitted/regressed model. Past the
    // disclosed anchor it's explicitly flagged as extrapolation. See
    // reference/interactive-blocks.md in the research-brief skill for why
    // this stays linear-and-anchored instead of pretending to more
    // precision than two data points support.
    nodes.forEach((node) => {
      if (!node.output || node.baseline == null || !node.driverInput || node.driverGain == null) return;
      const driverValue = values[node.driverInput];
      const inputSpec = inputs.find((inp) => inp.id === node.driverInput);
      if (driverValue == null || !inputSpec) return;
      const estimate = node.baseline + driverValue * node.driverGain;
      const valueEl = block.querySelector(`[data-node-value="${CSS.escape(node.id)}"]`);
      if (!valueEl) return;
      valueEl.textContent = formatValue(estimate, node.format);
      const extrapolated = inputSpec.verifiedAt != null && driverValue > inputSpec.verifiedAt;
      valueEl.classList.toggle("graph-node-value-extrapolated", extrapolated);
      valueEl.parentElement?.parentElement?.classList.toggle("graph-node-extrapolated", extrapolated);
    });
  }

  sliders.forEach((slider) => {
    const valueLabel = block.querySelector(`[data-slider-value="${CSS.escape(slider.dataset.graphInput)}"]`);
    const inputSpec = inputs.find((inp) => inp.id === slider.dataset.graphInput);
    slider.addEventListener("input", () => {
      if (valueLabel) valueLabel.textContent = `${slider.value}${inputSpec?.unit || ""}`;
      recompute();
    });
  });

  recompute();

  // Tap/keyboard-activate a node (no drag) to see what backs it. Only nodes
  // the author gave `detail` text get this. The click branch of the old
  // handler is gone — tap-vs-drag is now disambiguated by the pointer
  // engine below (a "tap" is a pointerdown+up on a node with under ~6px of
  // total movement between them).
  const detailPanel = block.querySelector("[data-graph-detail]");
  const detailTitle = block.querySelector("[data-graph-detail-title]");
  const detailText = block.querySelector("[data-graph-detail-text]");
  function showDetail(nodeSpec) {
    if (!detailPanel || !detailTitle || !detailText || !nodeSpec?.detail) return;
    detailTitle.textContent = String(nodeSpec.label || nodeSpec.id).replace(/\n/g, " ");
    detailText.textContent = nodeSpec.detail;
    detailPanel.hidden = false;
    detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  block.querySelector("[data-graph-detail-close]")?.addEventListener("click", () => {
    if (detailPanel) detailPanel.hidden = true;
  });
  block.querySelectorAll(".graph-node-has-detail[data-node-id]").forEach((nodeEl) => {
    const nodeSpec = nodes.find((n) => n.id === nodeEl.dataset.nodeId);
    nodeEl.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && nodeSpec) {
        event.preventDefault();
        showDetail(nodeSpec);
      }
    });
  });

  // --- Pan / zoom / drag canvas ---
  // No library: the viewport <g> (see graphBlockHtml in src/pages.mjs) gets
  // a translate+scale transform for pan/zoom, and each node <g> gets its
  // own translate for drag — edges are geometry recomputed from each node's
  // (original position + drag offset) on every move, and each edge's
  // animated flow-dot follows automatically because it's an <mpath> pointed
  // at the edge's own <path> id, not a static path string.
  const svg = block.querySelector("[data-graph-svg]");
  const viewport = block.querySelector("[data-graph-viewport]");
  if (!svg || !viewport) return;

  const baseWidth = Number(svg.dataset.graphBaseWidth) || 800;
  const baseHeight = Number(svg.dataset.graphBaseHeight) || 400;
  const MIN_SCALE = 0.5;
  const MAX_SCALE = 3;
  const view = { scale: 1, tx: 0, ty: 0 };

  function applyView() {
    viewport.setAttribute("transform", `translate(${view.tx} ${view.ty}) scale(${view.scale})`);
  }
  applyView();

  function unitsPerScreenPixel() {
    const rect = svg.getBoundingClientRect();
    return rect.width ? baseWidth / rect.width : 1;
  }

  // Zoom while keeping whatever SVG point sits under `center` visually
  // fixed — the standard "zoom toward cursor/pinch-midpoint" recipe.
  function zoomBy(factor, center) {
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, view.scale * factor));
    if (newScale === view.scale) return;
    const pivot = center || { x: view.tx + (view.scale * baseWidth) / 2, y: view.ty + (view.scale * baseHeight) / 2 };
    const originX = (pivot.x - view.tx) / view.scale;
    const originY = (pivot.y - view.ty) / view.scale;
    view.tx = pivot.x - originX * newScale;
    view.ty = pivot.y - originY * newScale;
    view.scale = newScale;
    applyView();
  }

  // --- Node positions: read once from the server-rendered rects, before
  // any drag offset is ever applied, so drag math always has a stable base
  // to add an offset to instead of compounding rounding error.
  const originalPos = new Map();
  const nodeOffsets = new Map();
  nodes.forEach((n) => {
    const nodeEl = block.querySelector(`.graph-node[data-node-id="${CSS.escape(n.id)}"]`);
    const rect = nodeEl?.querySelector("rect");
    if (!rect) return;
    originalPos.set(n.id, {
      x: parseFloat(rect.getAttribute("x")),
      y: parseFloat(rect.getAttribute("y")),
      w: parseFloat(rect.getAttribute("width")),
      h: parseFloat(rect.getAttribute("height")),
    });
    nodeOffsets.set(n.id, { dx: 0, dy: 0 });
  });

  function currentPos(id) {
    const base = originalPos.get(id);
    const offset = nodeOffsets.get(id);
    if (!base) return null;
    return { x: base.x + (offset?.dx || 0), y: base.y + (offset?.dy || 0), w: base.w, h: base.h };
  }

  function edgeElFor(edge) {
    return block.querySelector(`.graph-edge[data-edge-from="${CSS.escape(edge.from)}"][data-edge-to="${CSS.escape(edge.to)}"]`);
  }

  function updateEdgePath(edge) {
    const from = currentPos(edge.from);
    const to = currentPos(edge.to);
    const path = edgeElFor(edge)?.querySelector("path");
    if (!from || !to || !path) return;
    // Top-to-bottom flow (matches graphBlockHtml in src/pages.mjs): bottom
    // edge of the source node to top edge of the target, curving through a
    // shared mid-height instead of the old left-to-right mid-width curve.
    const x1 = from.x + from.w / 2;
    const y1 = from.y + from.h;
    const x2 = to.x + to.w / 2;
    const y2 = to.y;
    const midY = (y1 + y2) / 2;
    path.setAttribute("d", `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`);
    const label = edgeElFor(edge)?.querySelector(".graph-edge-label");
    if (label) {
      label.setAttribute("x", String((x1 + x2) / 2 + 10));
      label.setAttribute("y", String(midY));
    }
  }

  function edgesTouching(nodeId) {
    return edges.filter((e) => e.from === nodeId || e.to === nodeId);
  }

  block.querySelector("[data-graph-zoom-in]")?.addEventListener("click", () => zoomBy(1.25));
  block.querySelector("[data-graph-zoom-out]")?.addEventListener("click", () => zoomBy(0.8));
  block.querySelector("[data-graph-zoom-reset]")?.addEventListener("click", () => {
    view.scale = 1;
    view.tx = 0;
    view.ty = 0;
    applyView();
    nodeOffsets.forEach((offset, id) => {
      offset.dx = 0;
      offset.dy = 0;
      block.querySelector(`.graph-node[data-node-id="${CSS.escape(id)}"]`)?.removeAttribute("transform");
    });
    edges.forEach(updateEdgePath);
  });

  svg.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const rect = svg.getBoundingClientRect();
      const k = rect.width ? baseWidth / rect.width : 1;
      const point = { x: (event.clientX - rect.left) * k, y: (event.clientY - rect.top) * k };
      zoomBy(event.deltaY < 0 ? 1.12 : 0.89, point);
    },
    { passive: false },
  );

  // Pointer Events unify mouse/touch/pen: pointerdown on a node starts a
  // node-drag, pointerdown on empty canvas starts a pan, and a second
  // simultaneous pointer switches to pinch-zoom (tracked by pointerId in
  // `activePointers`). A pointerdown+up on a node with under ~6px of total
  // movement is treated as a tap instead of a drag.
  const activePointers = new Map();
  let pinchStartDistance = null;
  let pinchStartScale = 1;
  let dragTarget = null;
  let dragStart = null;
  let dragMoved = 0;

  function pointerDistance() {
    const pts = Array.from(activePointers.values());
    return pts.length < 2 ? null : Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
  }

  function pointerMidpoint() {
    const pts = Array.from(activePointers.values());
    return pts.length < 2 ? null : { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
  }

  svg.addEventListener("pointerdown", (event) => {
    const nodeEl = event.target.closest(".graph-node[data-node-id]");
    svg.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.size >= 2) {
      dragTarget = null;
      pinchStartDistance = pointerDistance();
      pinchStartScale = view.scale;
      return;
    }

    dragStart = { x: event.clientX, y: event.clientY };
    dragMoved = 0;
    dragTarget = nodeEl ? { type: "node", id: nodeEl.dataset.nodeId, el: nodeEl } : { type: "pan" };
  });

  svg.addEventListener("pointermove", (event) => {
    if (!activePointers.has(event.pointerId)) return;
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.size >= 2) {
      event.preventDefault();
      const distance = pointerDistance();
      const midpoint = pointerMidpoint();
      if (distance && pinchStartDistance && midpoint) {
        const rect = svg.getBoundingClientRect();
        const k = rect.width ? baseWidth / rect.width : 1;
        const pivot = { x: (midpoint.x - rect.left) * k, y: (midpoint.y - rect.top) * k };
        zoomBy(pinchStartScale * (distance / pinchStartDistance) / view.scale, pivot);
      }
      return;
    }

    if (!dragTarget || !dragStart) return;
    event.preventDefault();
    const dxPx = event.clientX - dragStart.x;
    const dyPx = event.clientY - dragStart.y;
    dragMoved = Math.max(dragMoved, Math.hypot(dxPx, dyPx));
    const k = unitsPerScreenPixel();

    if (dragTarget.type === "pan") {
      view.tx += dxPx * k;
      view.ty += dyPx * k;
      applyView();
    } else {
      const offset = nodeOffsets.get(dragTarget.id);
      if (offset) {
        offset.dx += (dxPx * k) / view.scale;
        offset.dy += (dyPx * k) / view.scale;
        dragTarget.el.setAttribute("transform", `translate(${offset.dx} ${offset.dy})`);
        edgesTouching(dragTarget.id).forEach(updateEdgePath);
      }
    }
    dragStart = { x: event.clientX, y: event.clientY };
  });

  function endPointer(event) {
    activePointers.delete(event.pointerId);
    if (activePointers.size < 2) pinchStartDistance = null;
    if (activePointers.size === 0) {
      if (dragTarget?.type === "node" && dragMoved < 6) {
        showDetail(nodes.find((n) => n.id === dragTarget.id));
      }
      dragTarget = null;
      dragStart = null;
    }
  }
  svg.addEventListener("pointerup", endPointer);
  svg.addEventListener("pointercancel", endPointer);
});

// --- Mobile navigation ---
const mobileMenuToggle = document.querySelector("[data-mobile-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
mobileMenuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu?.classList.toggle("open") || false;
  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    mobileMenuToggle?.setAttribute("aria-expanded", "false");
  });
});

// --- Lightweight image carousel ---
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const main = carousel.querySelector("[data-carousel-main]");
  const controls = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  if (!main || controls.length < 2) return;

  let activeIndex = Math.max(
    0,
    controls.findIndex((control) => control.classList.contains("active")),
  );

  function showSlide(index) {
    activeIndex = (index + controls.length) % controls.length;
    const control = controls[activeIndex];
    main.src = control.dataset.carouselSlide;
    controls.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === activeIndex));
  }

  controls.forEach((control, index) => {
    control.addEventListener("click", () => showSlide(index));
  });

  setInterval(() => showSlide(activeIndex + 1), 3000);
});

// --- Mock checkout / success: read ?program=&offering= against the embedded catalog ---
function money(value) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(`${value}T00:00:00`),
  );
}

function readCatalog() {
  const script = document.getElementById("programs-data");
  if (!script) return null;
  try {
    return JSON.parse(script.textContent);
  } catch {
    return null;
  }
}

function findSelection(catalog) {
  const params = new URLSearchParams(window.location.search);
  const programHandle = params.get("program");
  const offeringId = params.get("offering");
  const program = catalog.programs.find((p) => p.handle === programHandle) || catalog.programs[0];
  const offering = program?.offerings.find((o) => o.id === offeringId) || program?.offerings[0];
  return { program, offering };
}

function cohortCapacity(program, offering) {
  return `${offering?.capacity || program?.offerings?.[0]?.capacity || 25}-seat cohort`;
}

const catalog = readCatalog();
const selection = catalog ? findSelection(catalog) : {};
const marketplaceApiBase = "https://autonateai-learning-hub.web.app/api/marketplace";
const squareApiBase = `${marketplaceApiBase}/square`;
let squareCard = null;
let squareConfig = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      if (window.Square) resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function setupSquareCard(config) {
  const container = document.querySelector("[data-square-card]");
  if (!container || !config.enabled) return;
  container.innerHTML = "";
  container.classList.remove("unavailable");
  const scriptUrl =
    config.environment === "production"
      ? "https://web.squarecdn.com/v1/square.js"
      : "https://sandbox.web.squarecdn.com/v1/square.js";
  await loadScript(scriptUrl);
  const payments = window.Square.payments(config.applicationId, config.locationId);
  squareCard = await payments.card();
  await squareCard.attach("[data-square-card]");
  container.classList.add("ready");
  document.body.classList.add("square-enabled");
  // Whichever pay button this page has — single-seat checkout or the
  // multi-seat sponsorship form — becomes clickable once the card field
  // actually attaches.
  document.querySelectorAll("[data-checkout-complete], [data-sponsorship-submit]").forEach((button) => {
    button.classList.remove("disabled");
    button.removeAttribute("aria-disabled");
  });
}

async function fetchSquareConfig() {
  const response = await fetch(`${squareApiBase}/config`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Square config returned ${response.status}`);
  return response.json();
}

function markSquareUnavailable(message) {
  const container = document.querySelector("[data-square-card]");
  if (container) {
    container.classList.add("unavailable");
    container.innerHTML = `<span>${message}</span>`;
  }
}

// Square's routine "payment setup pending / ready" status banner is gone from
// the customer-facing checkout UI — this element (present but hidden by
// default on both /checkout and /for-organizations) only surfaces if
// something actually goes wrong, so a real failure is never silent.
const squareStatusEl = document.querySelector("[data-square-status]");
if (squareStatusEl) {
  fetchSquareConfig()
    .then(async (config) => {
      squareConfig = config;
      if (config.enabled) {
        try {
          await setupSquareCard(config);
        } catch (error) {
          squareConfig = null;
          squareStatusEl.hidden = false;
          squareStatusEl.innerHTML = `<strong>Card fields could not load</strong><span>${error.message || "Square could not mount the secure card field. Refresh the page, or contact us to complete this by invoice."}</span>`;
          markSquareUnavailable("Card fields could not load. Refresh the page or contact us to complete this by invoice.");
        }
      } else {
        squareStatusEl.hidden = false;
        squareStatusEl.innerHTML = `<strong>Card payment is temporarily unavailable</strong><span>Contact us at autonate.ai@gmail.com and we'll get this sorted out.</span>`;
        markSquareUnavailable("Card payment is temporarily unavailable — contact us to complete this by invoice.");
      }
    })
    .catch((error) => {
      squareStatusEl.hidden = false;
      squareStatusEl.innerHTML = `<strong>Square status unavailable</strong><span>${error.message || "Payment configuration could not be checked. Refresh the page, or contact us to complete this by invoice."}</span>`;
      markSquareUnavailable("Card fields are unavailable until Square status loads.");
    });
}

const summaryEl = document.querySelector("[data-order-summary]");
if (catalog && summaryEl) {
  const { program, offering } = selection;
  if (program && offering) {
    summaryEl.innerHTML = `
      <div class="summary-item">
        <img src="${program.thumbnail}" alt="${program.name}" />
        <div><strong>${program.name}</strong><span>${offering.deliveryType} &middot; ${offering.meetingFrequency || ""}</span><em>Next cohort opens ${formatDate(program.startDate)} &middot; ${cohortCapacity(program, offering)} &middot; Dedicated Discord cohort channel</em></div>
        <b>${money(offering.price)}</b>
      </div>
    `;
    document.querySelectorAll("[data-order-subtotal]").forEach((el) => (el.textContent = money(offering.price)));
    document.querySelectorAll("[data-order-total]").forEach((el) => (el.textContent = money(offering.price)));

    const completeButton = document.querySelector("[data-checkout-complete]");
    if (completeButton) {
      completeButton.href = `/success?program=${program.handle}&offering=${offering.id}`;
    }
  }
}

const completeButton = document.querySelector("[data-checkout-complete]");
completeButton?.addEventListener("click", async (event) => {
  event.preventDefault();
  if (!squareCard || !squareConfig?.enabled || !selection.program || !selection.offering) {
    if (squareStatusEl) {
      squareStatusEl.hidden = false;
      squareStatusEl.innerHTML = `<strong>Card fields still loading</strong><span>Square has to finish loading before payment can be processed. Refresh the page if the card field does not appear.</span>`;
    }
    return;
  }
  const checkoutFields = Object.fromEntries(
    Array.from(document.querySelectorAll("[data-checkout-field]")).map((field) => [
      field.dataset.checkoutField,
      field.value.trim(),
    ]),
  );
  const purchaserEmail = checkoutFields.buyerEmail || "";
  if (!checkoutFields.cardholderName || !purchaserEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(purchaserEmail)) {
    if (squareStatusEl) {
      squareStatusEl.hidden = false;
      squareStatusEl.innerHTML = `<strong>Missing checkout details</strong><span>Add the name on card and a valid purchaser email before payment.</span>`;
    }
    return;
  }
  completeButton.setAttribute("aria-busy", "true");
  completeButton.classList.add("disabled");
  completeButton.innerHTML = "Processing...";

  try {
    const tokenResult = await squareCard.tokenize();
    if (tokenResult.status !== "OK") {
      throw new Error(tokenResult.errors?.[0]?.message || "Square could not tokenize the card.");
    }
    const response = await fetch(`${squareApiBase}/payments`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sourceId: tokenResult.token,
        programHandle: selection.program.handle,
        offeringId: selection.offering.id,
        buyer: checkoutFields,
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || payload.errors?.[0]?.detail || "Square payment failed.");
    }
    const paymentId = payload.payment?.id || "";
    localStorage.setItem(
      "anai-latest-payment",
      JSON.stringify({
        paymentId,
        buyerEmail: checkoutFields.buyerEmail,
        cardholderName: checkoutFields.cardholderName,
        programHandle: selection.program.handle,
        offeringId: selection.offering.id,
        paidAt: new Date().toISOString(),
      }),
    );
    const paymentParam = paymentId ? `&payment=${encodeURIComponent(paymentId)}` : "";
    window.location.href = `/success?program=${selection.program.handle}&offering=${selection.offering.id}${paymentParam}`;
  } catch (error) {
    if (squareStatusEl) {
      squareStatusEl.hidden = false;
      squareStatusEl.innerHTML = `<strong>Payment failed</strong><span>${error.message}</span>`;
    }
    completeButton.removeAttribute("aria-busy");
    completeButton.classList.remove("disabled");
    completeButton.innerHTML = `Complete Purchase <span class="material-symbols-outlined">arrow_forward</span>`;
  }
});

const successProgramEl = document.querySelector("[data-success-program]");
if (catalog && successProgramEl) {
  const { program, offering } = findSelection(catalog);
  if (program && offering) {
    successProgramEl.textContent = program.name;
    const offeringEl = document.querySelector("[data-success-offering]");
    if (offeringEl) offeringEl.textContent = `${program.name} - ${offering.deliveryType}`;
    const totalEl = document.querySelector("[data-success-total]");
    if (totalEl) totalEl.textContent = money(offering.price);
  }
}

const studentInfoForm = document.querySelector("[data-student-info-form]");
studentInfoForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const studentFields = Object.fromEntries(
    Array.from(studentInfoForm.querySelectorAll("[data-student-field]")).map((field) => [
      field.dataset.studentField,
      field.value.trim(),
    ]),
  );
  const statusEl = document.querySelector("[data-student-info-status]");
  if (!studentFields.studentName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentFields.studentEmail || "")) {
    if (statusEl) statusEl.textContent = "Add the student's name and a valid student email.";
    return;
  }
  const params = new URLSearchParams(window.location.search);
  let latestPayment = {};
  try {
    latestPayment = JSON.parse(localStorage.getItem("anai-latest-payment") || "{}");
  } catch {
    latestPayment = {};
  }
  const submitButton = studentInfoForm.querySelector("button");
  submitButton?.setAttribute("disabled", "true");
  if (statusEl) statusEl.textContent = "Saving student details...";
  localStorage.setItem(
    "anai-latest-student-info",
    JSON.stringify({ ...studentFields, savedAt: new Date().toISOString() }),
  );
  try {
    const response = await fetch(`${marketplaceApiBase}/enrollments`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...studentFields,
        buyerEmail: latestPayment.buyerEmail || "",
        paymentId: params.get("payment") || latestPayment.paymentId || "",
        programHandle: params.get("program") || latestPayment.programHandle || "",
        offeringId: params.get("offering") || latestPayment.offeringId || "",
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Student details could not be saved.");
    if (statusEl) statusEl.textContent = "Student details saved for onboarding.";
  } catch (error) {
    submitButton?.removeAttribute("disabled");
    if (statusEl) statusEl.textContent = `${error.message} Your browser kept a local backup.`;
  }
});

// --- Work With Us: opens the visitor's email client with a pre-filled
// message instead of posting anywhere — no backend needed for this form.
const workWithUsForm = document.querySelector("[data-workwithus-form]");
workWithUsForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const fields = Object.fromEntries(
    Array.from(workWithUsForm.querySelectorAll("[data-workwithus-field]")).map((field) => [
      field.dataset.workwithusField,
      field.value.trim(),
    ]),
  );
  const statusEl = workWithUsForm.querySelector("[data-workwithus-status]");
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email || "");
  if (!fields.name || !emailValid || !fields.details) {
    if (statusEl) statusEl.textContent = "Add your name, a valid email, and a bit about what you need before continuing.";
    return;
  }
  const subject = `Work With AutoNateAI — ${fields.orgType || "Inquiry"} from ${fields.name}`;
  const bodyLines = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    fields.organization ? `Organization: ${fields.organization}` : null,
    fields.orgType ? `Type: ${fields.orgType}` : null,
    fields.need ? `What they need: ${fields.need}` : null,
    "",
    "Details:",
    fields.details,
  ].filter((line) => line !== null);
  window.location.href = `mailto:autonate.ai@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
});

// --- Consulting booking form ---
const bookingForm = document.querySelector("[data-booking-form]");
const bookingDurations = {
  Discovery: ["15", "30"],
  "Follow-up": ["30", "45", "60", "90", "120"],
};

function refreshBookingDurations() {
  const callTypeField = bookingForm?.querySelector("[data-booking-call-type]");
  const durationField = bookingForm?.querySelector("[data-booking-duration]");
  if (!callTypeField || !durationField) return;
  const options = bookingDurations[callTypeField.value] || [];
  durationField.innerHTML = options.length
    ? options.map((minutes) => `<option value="${minutes}">${minutes} min</option>`).join("")
    : `<option value="">Pick a call type first</option>`;
  durationField.disabled = options.length === 0;
}

bookingForm?.querySelector("[data-booking-call-type]")?.addEventListener("change", refreshBookingDurations);

const BOOKING_WINDOW_START_MINUTES = 8 * 60;
const BOOKING_WINDOW_END_MINUTES = 18 * 60;

function bookingTimeOfDayMinutes(datetimeLocalValue) {
  const match = /T(\d{2}):(\d{2})/.exec(datetimeLocalValue || "");
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function bookingFitsBusinessHours(datetimeLocalValue, durationMinutes) {
  const start = bookingTimeOfDayMinutes(datetimeLocalValue);
  if (start === null) return true;
  return start >= BOOKING_WINDOW_START_MINUTES && start + durationMinutes <= BOOKING_WINDOW_END_MINUTES;
}

bookingForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const statusEl = bookingForm.querySelector("[data-booking-status]");
  const submitButton = bookingForm.querySelector("button[type=submit]");
  const fields = Object.fromEntries(
    Array.from(bookingForm.querySelectorAll("[data-booking-field]")).map((field) => [
      field.dataset.bookingField,
      field.value.trim(),
    ]),
  );

  if (!fields.name || !fields.email || !fields.callType || !fields.duration || !fields.preferredDateTime) {
    if (statusEl) statusEl.textContent = "Fill in your name, email, call type, duration, and a preferred time.";
    return;
  }

  const durationMinutes = Number(fields.duration) || 0;
  if (!bookingFitsBusinessHours(fields.preferredDateTime, durationMinutes)) {
    if (statusEl) statusEl.textContent = "Preferred time must start and end between 8:00 AM and 6:00 PM Central.";
    return;
  }
  if (fields.alternateDateTime && !bookingFitsBusinessHours(fields.alternateDateTime, durationMinutes)) {
    if (statusEl) statusEl.textContent = "Alternate time must start and end between 8:00 AM and 6:00 PM Central.";
    return;
  }

  submitButton?.setAttribute("disabled", "true");
  if (statusEl) statusEl.textContent = "Sending your request...";

  try {
    const response = await fetch(`${marketplaceApiBase}/consulting/booking`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(fields),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Booking could not be submitted.");
    bookingForm.reset();
    refreshBookingDurations();
    if (statusEl) {
      statusEl.textContent = "Request sent. We'll confirm your time by email shortly.";
    }
  } catch (error) {
    if (statusEl) statusEl.textContent = error.message;
  } finally {
    submitButton?.removeAttribute("disabled");
  }
});

// --- Article search / category filters / pagination ---
const articleSearch = document.querySelector("[data-article-search]");
const articleGrid = document.querySelector("[data-article-grid]");
const articlePagination = document.querySelector("[data-article-pagination]");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
const ARTICLES_PER_PAGE = 9;
let activeArticleFilter = "All";
let articlePage = 1;

function renderArticlePagination(totalPages) {
  if (!articlePagination) return;
  if (totalPages <= 1) {
    articlePagination.innerHTML = "";
    return;
  }
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  articlePagination.innerHTML = `
    <button type="button" data-article-page="prev" ${articlePage <= 1 ? "disabled" : ""} aria-label="Previous page"><span class="material-symbols-outlined">chevron_left</span></button>
    ${pages
      .map((p) => (p === articlePage ? `<span class="pagination-current">${p}</span>` : `<button type="button" data-article-page="${p}">${p}</button>`))
      .join("")}
    <button type="button" data-article-page="next" ${articlePage >= totalPages ? "disabled" : ""} aria-label="Next page"><span class="material-symbols-outlined">chevron_right</span></button>
  `;
  articlePagination.querySelectorAll("[data-article-page]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.articlePage === "prev" ? articlePage - 1 : button.dataset.articlePage === "next" ? articlePage + 1 : Number(button.dataset.articlePage);
      if (!target || target < 1 || target > totalPages || target === articlePage) return;
      articlePage = target;
      filterArticles();
      articleGrid?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function filterArticles() {
  if (!articleGrid) return;
  const query = (articleSearch?.value || "").trim().toLowerCase();
  const cards = Array.from(articleGrid.querySelectorAll("[data-category]"));
  const matches = cards.filter((card) => {
    const categoryMatch = activeArticleFilter === "All" || card.dataset.category === activeArticleFilter;
    const textMatch = !query || (card.dataset.search || "").includes(query);
    return categoryMatch && textMatch;
  });

  const totalPages = Math.max(1, Math.ceil(matches.length / ARTICLES_PER_PAGE));
  articlePage = Math.min(Math.max(1, articlePage), totalPages);
  const start = (articlePage - 1) * ARTICLES_PER_PAGE;
  const visible = new Set(matches.slice(start, start + ARTICLES_PER_PAGE));

  cards.forEach((card) => {
    card.hidden = !visible.has(card);
  });

  articleGrid.classList.toggle("is-empty", matches.length === 0);
  renderArticlePagination(totalPages);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeArticleFilter = button.dataset.filter || "All";
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    articlePage = 1;
    filterArticles();
  });
});

// Allow a link into Research & Case Studies to land pre-filtered, e.g.
// /articles?type=Regions from the homepage's "All Regions" button.
const presetType = new URLSearchParams(window.location.search).get("type");
const presetButton = presetType && filterButtons.find((button) => button.dataset.filter === presetType);
(presetButton || filterButtons[0])?.classList.add("active");
if (presetButton) activeArticleFilter = presetType;
articleSearch?.addEventListener("input", () => {
  articlePage = 1;
  filterArticles();
});
filterArticles();

// --- For Organizations: seat-based sponsorship checkout ---
// Reuses the same Square SDK load/attach flow as the single-seat checkout
// above (both pages declare a [data-square-status]/[data-square-card] pair,
// so `squareCard`/`squareConfig` end up populated the same way here). The
// server is always the source of truth for the charged amount — this
// SPONSORSHIP_UNIT_PRICE is display-only, for the live total shown before
// payment.
const sponsorshipForm = document.querySelector("[data-sponsorship-form]");
if (sponsorshipForm) {
  const SPONSORSHIP_UNIT_PRICE = 499;
  const seatsInput = sponsorshipForm.querySelector("[data-sponsorship-seats]");
  const tierButtons = Array.from(document.querySelectorAll("[data-seat-tier]"));
  const submitButton = document.querySelector("[data-sponsorship-submit]");
  const statusEl = document.querySelector("[data-sponsorship-status]");
  const successEl = document.querySelector("[data-sponsorship-success]");
  const successDetailEl = document.querySelector("[data-sponsorship-success-detail]");

  function currentSeats() {
    const value = Math.round(Number(seatsInput?.value));
    if (!Number.isFinite(value) || value < 1) return 1;
    return Math.min(value, 200);
  }

  function syncTierSelection(seats) {
    tierButtons.forEach((button) => {
      button.classList.toggle("selected", Number(button.dataset.seatTier) === seats);
    });
  }

  function recomputeTotal() {
    const seats = currentSeats();
    const total = seats * SPONSORSHIP_UNIT_PRICE;
    document.querySelectorAll("[data-sponsorship-total], [data-sponsorship-total-2]").forEach((el) => {
      el.textContent = money(total);
    });
    const label = document.querySelector("[data-sponsorship-seats-label]");
    if (label) label.textContent = `${seats} seat${seats === 1 ? "" : "s"} · ${money(SPONSORSHIP_UNIT_PRICE)} per seat`;
    syncTierSelection(seats);
  }

  tierButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (seatsInput) seatsInput.value = String(button.dataset.seatTier);
      recomputeTotal();
      document.querySelector("#pay")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  seatsInput?.addEventListener("input", recomputeTotal);
  recomputeTotal();

  submitButton?.addEventListener("click", async () => {
    if (!squareCard || !squareConfig?.enabled) {
      if (statusEl) statusEl.textContent = "Card fields still loading. Refresh the page if this does not clear in a few seconds.";
      return;
    }

    const fields = Object.fromEntries(
      Array.from(sponsorshipForm.querySelectorAll("[data-sponsorship-field]")).map((field) => [
        field.dataset.sponsorshipField,
        field.value.trim(),
      ]),
    );
    const seats = currentSeats();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email || "");
    if (!fields.organization || !fields.name || !emailValid || !fields.cardholderName) {
      if (statusEl) statusEl.textContent = "Add your organization, contact name, contact email, and the name on the card before paying.";
      return;
    }

    submitButton.setAttribute("aria-busy", "true");
    submitButton.classList.add("disabled");
    submitButton.setAttribute("aria-disabled", "true");
    const originalLabel = submitButton.innerHTML;
    submitButton.innerHTML = "Processing...";

    try {
      const tokenResult = await squareCard.tokenize();
      if (tokenResult.status !== "OK") {
        throw new Error(tokenResult.errors?.[0]?.message || "Square could not tokenize the card.");
      }
      const response = await fetch(`${squareApiBase}/sponsorship-payment`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          seats,
          buyer: fields,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || payload.errors?.[0]?.detail || "Square payment failed.");
      }

      // Best-effort log for follow-up; payment already succeeded above regardless of this call.
      fetch(`${marketplaceApiBase}/sponsorships`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          seats,
          organization: fields.organization,
          contactName: fields.name,
          contactEmail: fields.email,
          amountPaid: seats * SPONSORSHIP_UNIT_PRICE,
          paymentId: payload.payment?.id || "",
        }),
      }).catch(() => {});

      sponsorshipForm.hidden = true;
      if (successEl) {
        successEl.hidden = false;
        if (successDetailEl) {
          successDetailEl.textContent = `${seats} seat${seats === 1 ? "" : "s"} for ${fields.organization} — ${money(seats * SPONSORSHIP_UNIT_PRICE)} paid. A confirmation has gone to our team.`;
        }
        successEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (error) {
      if (statusEl) statusEl.textContent = error.message;
    } finally {
      submitButton.removeAttribute("aria-busy");
      submitButton.classList.remove("disabled");
      submitButton.removeAttribute("aria-disabled");
      submitButton.innerHTML = originalLabel;
    }
  });
}
