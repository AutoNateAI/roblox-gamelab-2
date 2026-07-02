local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local Config = require(ReplicatedStorage:WaitForChild("Configs"):WaitForChild("GameConfig"))

local remotes = ReplicatedStorage:FindFirstChild("ActionRemotes")
if not remotes then
	remotes = Instance.new("Folder")
	remotes.Name = "ActionRemotes"
	remotes.Parent = ReplicatedStorage
end

local actionEvent = remotes:FindFirstChild("ActionEvent") or Instance.new("RemoteEvent")
actionEvent.Name = "ActionEvent"
actionEvent.Parent = remotes

local flightEvent = remotes:FindFirstChild("FlightEvent") or Instance.new("RemoteEvent")
flightEvent.Name = "FlightEvent"
flightEvent.Parent = remotes

local arena = workspace:FindFirstChild("ClaudecraftArena")
if arena then
	arena:Destroy()
end

arena = Instance.new("Folder")
arena.Name = "ClaudecraftArena"
arena.Parent = workspace

local enemiesFolder = Instance.new("Folder")
enemiesFolder.Name = "Enemies"
enemiesFolder.Parent = arena

local effectsFolder = Instance.new("Folder")
effectsFolder.Name = "Effects"
effectsFolder.Parent = arena

local interiorsFolder = Instance.new("Folder")
interiorsFolder.Name = "BuildingInteriors"
interiorsFolder.Parent = arena

local lastActionAt: { [Player]: { [string]: number } } = {}
local flightState: { [Player]: { enabled: boolean, velocity: LinearVelocity?, attachment: Attachment? } } = {}

local function makePart(
	name: string,
	size: Vector3,
	cframe: CFrame,
	color: Color3,
	material: Enum.Material,
	parent: Instance
)
	local part = Instance.new("Part")
	part.Name = name
	part.Anchored = true
	part.Size = size
	part.CFrame = cframe
	part.Color = color
	part.Material = material
	part.TopSurface = Enum.SurfaceType.Smooth
	part.BottomSurface = Enum.SurfaceType.Smooth
	part.Parent = parent
	return part
end

local function addLabel(part: BasePart, text: string)
	local gui = Instance.new("BillboardGui")
	gui.Name = "Label"
	gui.AlwaysOnTop = true
	gui.MaxDistance = 150
	gui.Size = UDim2.fromOffset(180, 36)
	gui.StudsOffset = Vector3.new(0, 4, 0)
	gui.Parent = part

	local label = Instance.new("TextLabel")
	label.BackgroundTransparency = 1
	label.Font = Enum.Font.GothamBold
	label.Size = UDim2.fromScale(1, 1)
	label.Text = text
	label.TextColor3 = Color3.fromRGB(246, 241, 217)
	label.TextScaled = true
	label.TextStrokeTransparency = 0.35
	label.Parent = gui
end

local function markMinimap(instance: Instance, kind: string, name: string, color: Color3)
	instance:SetAttribute("MinimapKind", kind)
	instance:SetAttribute("MinimapName", name)
	instance:SetAttribute("MinimapColor", color)
end

local function scaledBoardPosition(board, point, y: number)
	return Vector3.new(point[1] * board.CoordinateScale, y, point[2] * board.CoordinateScale)
end

local poiColors = {
	hub = Color3.fromRGB(0, 212, 255),
	poi = Color3.fromRGB(0, 220, 136),
	camp = Color3.fromRGB(255, 184, 0),
	danger = Color3.fromRGB(255, 75, 145),
}

local function buildTree(parent: Instance, position: Vector3, scale: number)
	local trunk = makePart(
		"TreeTrunk",
		Vector3.new(2.2 * scale, 8 * scale, 2.2 * scale),
		CFrame.new(position + Vector3.new(0, 4 * scale, 0)),
		Color3.fromRGB(83, 55, 35),
		Enum.Material.Wood,
		parent
	)
	trunk.CanCollide = true

	local crown = makePart(
		"PineCrown",
		Vector3.new(10 * scale, 17 * scale, 10 * scale),
		CFrame.new(position + Vector3.new(0, 12 * scale, 0)),
		Color3.fromRGB(14, 74, 48),
		Enum.Material.Grass,
		parent
	)
	crown.Shape = Enum.PartType.Ball
	crown.CanCollide = false
end

local function addRoadSegment(parent: Instance, board, fromPoint, toPoint)
	local from = scaledBoardPosition(board, fromPoint, 0.15)
	local to = scaledBoardPosition(board, toPoint, 0.15)
	local midpoint = (from + to) / 2
	local road = makePart(
		"Road",
		Vector3.new(18, 0.35, (to - from).Magnitude + 4),
		CFrame.lookAt(midpoint, to),
		board.Colors.Road,
		Enum.Material.Ground,
		parent
	)
	road.CanCollide = false
end

local function addPoiMarker(parent: Instance, board, poi)
	local color = poiColors[poi.Kind] or poiColors.poi
	local marker = makePart(
		poi.Name,
		Vector3.new(4, 4, 4),
		CFrame.new(scaledBoardPosition(board, poi.Position, 2)),
		color,
		Enum.Material.Neon,
		parent
	)
	marker.Shape = Enum.PartType.Ball
	marker.CanCollide = false
	marker:SetAttribute("PoiId", poi.Id)
	marker:SetAttribute("PoiKind", poi.Kind)
	addLabel(marker, poi.Name)
end

local function addHouse(parent: Instance, position: Vector3, rotation: number)
	local model = Instance.new("Model")
	model.Name = "EastbrookHouse"
	model.Parent = parent

	local body = makePart(
		"HouseBody",
		Vector3.new(18, 11, 15),
		CFrame.new(position + Vector3.new(0, 5.5, 0)) * CFrame.Angles(0, rotation, 0),
		Color3.fromRGB(111, 76, 51),
		Enum.Material.WoodPlanks,
		model
	)
	body.CanCollide = true

	local roof = makePart(
		"Roof",
		Vector3.new(21, 4, 18),
		CFrame.new(position + Vector3.new(0, 12.5, 0)) * CFrame.Angles(0, rotation, 0),
		Color3.fromRGB(105, 45, 39),
		Enum.Material.Slate,
		model
	)
	roof.CanCollide = true

	local door = makePart(
		"Door",
		Vector3.new(4, 7, 0.5),
		body.CFrame * CFrame.new(0, -2, -7.7),
		Color3.fromRGB(48, 31, 24),
		Enum.Material.Wood,
		model
	)
	door.CanCollide = false
end

local function buildCamp(center: Vector3)
	for index = 1, 5 do
		local angle = (math.pi * 2 / 5) * index
		local pos = center + Vector3.new(math.cos(angle) * 18, 0, math.sin(angle) * 18)
		makePart(
			"Bandit Crate",
			Vector3.new(8, 4, 8),
			CFrame.new(pos + Vector3.new(0, 2, 0)) * CFrame.Angles(0, angle, 0),
			Color3.fromRGB(116, 75, 48),
			Enum.Material.WoodPlanks,
			arena
		)
	end

	makePart(
		"Campfire",
		Vector3.new(8, 1, 8),
		CFrame.new(center + Vector3.new(0, 0.5, 0)),
		Color3.fromRGB(214, 82, 36),
		Enum.Material.Neon,
		arena
	)
	local smoke = Instance.new("Smoke")
	smoke.Color = Color3.fromRGB(100, 100, 100)
	smoke.Opacity = 0.18
	smoke.RiseVelocity = 7
	smoke.Size = 6
	smoke.Parent = arena.Campfire
end

local function buildChapel(center: Vector3)
	makePart(
		"Fallen Chapel Floor",
		Vector3.new(42, 2, 34),
		CFrame.new(center + Vector3.new(0, 1, 0)),
		Color3.fromRGB(98, 98, 104),
		Enum.Material.Slate,
		arena
	)
	for _, offset in ipairs({
		Vector3.new(-20, 10, -15),
		Vector3.new(20, 10, -15),
		Vector3.new(-20, 10, 15),
		Vector3.new(20, 10, 15),
	}) do
		makePart(
			"Broken Chapel Pillar",
			Vector3.new(5, 20, 5),
			CFrame.new(center + offset + Vector3.new(0, 1, 0)),
			Color3.fromRGB(132, 132, 138),
			Enum.Material.Rock,
			arena
		)
	end
	makePart(
		"Chapel Arch",
		Vector3.new(34, 5, 5),
		CFrame.new(center + Vector3.new(0, 23, -15)),
		Color3.fromRGB(130, 130, 136),
		Enum.Material.Rock,
		arena
	)
end

local teleportDebounce: { [Player]: number } = {}

local function teleportPlayer(player: Player, position: Vector3)
	local now = os.clock()
	if teleportDebounce[player] and now - teleportDebounce[player] < 1 then
		return
	end
	teleportDebounce[player] = now

	local character = player.Character
	local root = character and character:FindFirstChild("HumanoidRootPart")
	if root then
		root.CFrame = CFrame.new(position + Vector3.new(0, 4, 0))
	end
end

local function connectTeleport(part: BasePart, targetPosition: Vector3)
	part.Touched:Connect(function(hit)
		local player = Players:GetPlayerFromCharacter(hit.Parent)
		if player then
			teleportPlayer(player, targetPosition)
		end
	end)
end

local function addBuilding(config, index: number)
	local model = Instance.new("Model")
	model.Name = config.Name
	model.Parent = arena
	model:SetAttribute("BuildingId", config.Id)

	local body = makePart(
		"BuildingBody",
		Vector3.new(32, 18, 28),
		CFrame.new(config.Position + Vector3.new(0, 9, 0)),
		config.Color,
		Enum.Material.WoodPlanks,
		model
	)
	markMinimap(body, "Building", config.Name, config.Color)

	local roof = makePart(
		"BuildingRoof",
		Vector3.new(38, 5, 34),
		CFrame.new(config.Position + Vector3.new(0, 20.5, 0)),
		config.Color:Lerp(Color3.new(0.18, 0.05, 0.04), 0.45),
		Enum.Material.Slate,
		model
	)
	roof.CanCollide = true

	local door = makePart(
		"EnterDoor",
		Vector3.new(8, 9, 1),
		CFrame.new(config.Position + Vector3.new(0, 4.5, -14.6)),
		Color3.fromRGB(40, 28, 22),
		Enum.Material.Wood,
		model
	)
	door.CanCollide = false
	door.Transparency = 0.08
	addLabel(door, config.Name)

	local interiorOrigin = Vector3.new(1300 + index * 140, 0, 0)
	local room = Instance.new("Model")
	room.Name = config.Name .. " Interior"
	room.Parent = interiorsFolder

	local floor = makePart(
		"InteriorFloor",
		Vector3.new(74, 2, 58),
		CFrame.new(interiorOrigin + Vector3.new(0, -1, 0)),
		Color3.fromRGB(52, 58, 64),
		Enum.Material.Concrete,
		room
	)
	floor.CanCollide = true

	for _, wall in ipairs({
		{ Offset = Vector3.new(0, 10, -29), Size = Vector3.new(74, 20, 2) },
		{ Offset = Vector3.new(0, 10, 29), Size = Vector3.new(74, 20, 2) },
		{ Offset = Vector3.new(-37, 10, 0), Size = Vector3.new(2, 20, 58) },
		{ Offset = Vector3.new(37, 10, 0), Size = Vector3.new(2, 20, 58) },
	}) do
		makePart(
			"InteriorWall",
			wall.Size,
			CFrame.new(interiorOrigin + wall.Offset),
			config.Color:Lerp(Color3.fromRGB(245, 245, 235), 0.4),
			Enum.Material.SmoothPlastic,
			room
		)
	end

	local tablePart = makePart(
		"PlanningTable",
		Vector3.new(24, 3, 12),
		CFrame.new(interiorOrigin + Vector3.new(0, 1.5, 0)),
		Color3.fromRGB(116, 75, 48),
		Enum.Material.WoodPlanks,
		room
	)
	tablePart.CanCollide = true

	local exit = makePart(
		"ExitDoor",
		Vector3.new(12, 1, 12),
		CFrame.new(interiorOrigin + Vector3.new(0, 0.35, 22)),
		Color3.fromRGB(255, 214, 88),
		Enum.Material.Neon,
		room
	)
	exit.CanCollide = false
	addLabel(exit, "Exit to " .. config.Name)

	connectTeleport(door, interiorOrigin)
	connectTeleport(exit, config.Position + Vector3.new(0, 0, -24))
end

local function buildCollectibles()
	local folder = Instance.new("Folder")
	folder.Name = "Collectibles"
	folder.Parent = arena

	for _, collectible in ipairs(Config.World.Collectibles) do
		local orb = makePart(
			collectible.Name,
			Vector3.new(5, 5, 5),
			CFrame.new(collectible.Position),
			collectible.Color,
			Enum.Material.Neon,
			folder
		)
		orb.Shape = Enum.PartType.Ball
		orb.CanCollide = false
		markMinimap(orb, "Collectible", collectible.Name, collectible.Color)

		local light = Instance.new("PointLight")
		light.Color = collectible.Color
		light.Range = 18
		light.Brightness = 1.2
		light.Parent = orb

		local collected = false
		orb.Touched:Connect(function(hit)
			local player = Players:GetPlayerFromCharacter(hit.Parent)
			if not player or collected then
				return
			end
			collected = true
			local humanoid = hit.Parent:FindFirstChildOfClass("Humanoid")
			if humanoid then
				humanoid.Health = math.min(humanoid.MaxHealth, humanoid.Health + 35)
			end
			orb.Transparency = 1
			orb:SetAttribute("MinimapKind", nil)
			task.delay(12, function()
				if orb.Parent then
					collected = false
					orb.Transparency = 0
					markMinimap(orb, "Collectible", collectible.Name, collectible.Color)
				end
			end)
		end)
	end
end

local function buildObstacleCourse()
	local folder = Instance.new("Folder")
	folder.Name = "ObstacleCourse"
	folder.Parent = arena

	for _, obstacle in ipairs(Config.World.ObstacleCourse) do
		local part = makePart(
			obstacle.Name,
			obstacle.Size,
			CFrame.new(obstacle.Position),
			obstacle.Color,
			Enum.Material.WoodPlanks,
			folder
		)
		part.CanCollide = true
		markMinimap(part, "Obstacle", obstacle.Name, Color3.fromRGB(255, 184, 0))
	end
end

local function buildWorld()
	local board = Config.World.Board
	local boardFolder = Instance.new("Folder")
	boardFolder.Name = "EastbrookValeBoard"
	boardFolder.Parent = arena

	local boardSize = board.Size * board.CoordinateScale
	makePart(
		"Meadow",
		Vector3.new(boardSize, 2, boardSize),
		CFrame.new(0, -1, 0),
		board.Colors.Grass,
		Enum.Material.Grass,
		boardFolder
	)

	local lake = makePart(
		"Mirror Lake",
		Vector3.new(0.7, board.Water.Radius * board.CoordinateScale * 2, board.Water.Radius * board.CoordinateScale * 2),
		CFrame.new(scaledBoardPosition(board, board.Water.Position, 0.2)) * CFrame.Angles(0, 0, math.pi / 2),
		board.Colors.Water,
		Enum.Material.Glass,
		boardFolder
	)
	lake.CanCollide = false
	lake.Shape = Enum.PartType.Cylinder
	lake.Transparency = 0.18

	local roads = Instance.new("Folder")
	roads.Name = "Roads"
	roads.Parent = boardFolder
	for _, roadLine in ipairs(board.Roads) do
		for index = 1, #roadLine - 1 do
			addRoadSegment(roads, board, roadLine[index], roadLine[index + 1])
		end
	end

	local pois = Instance.new("Folder")
	pois.Name = "PointsOfInterest"
	pois.Parent = boardFolder
	for _, poi in ipairs(board.Pois) do
		addPoiMarker(pois, board, poi)
	end

	local random = Random.new(board.Seed)
	local houses = Instance.new("Folder")
	houses.Name = "Houses"
	houses.Parent = boardFolder
	for index = 1, board.HouseCount do
		local cluster = index <= math.floor(board.HouseCount * 0.65) and Vector2.new(0, 0)
			or Vector2.new(30 * board.CoordinateScale, 3 * board.CoordinateScale)
		local angle = random:NextNumber(0, math.pi * 2)
		local radius = random:NextNumber(55, 155)
		local position = Vector3.new(cluster.X + math.cos(angle) * radius, 0, cluster.Y + math.sin(angle) * radius)
		addHouse(houses, position, random:NextNumber(0, math.pi * 2))
	end

	local forest = Instance.new("Folder")
	forest.Name = "Forest"
	forest.Parent = boardFolder
	local halfSize = boardSize / 2 - 22
	local created = 0
	local attempts = 0
	local lakePosition = scaledBoardPosition(board, board.Water.Position, 0)
	while created < board.ForestCount and attempts < board.ForestCount * 8 do
		attempts += 1
		local x = random:NextNumber(-halfSize, halfSize)
		local z = random:NextNumber(-halfSize, halfSize)
		local point = Vector3.new(x, 0, z)
		local allowed = Vector2.new(x, z).Magnitude > 90
		if (point - lakePosition).Magnitude < board.Water.Radius * board.CoordinateScale + 20 then
			allowed = false
		end
		if allowed then
			buildTree(forest, point, random:NextNumber(0.75, 1.35))
			created += 1
		end
	end

	local hills = Instance.new("Folder")
	hills.Name = "BoundaryHills"
	hills.Parent = boardFolder
	for index = 1, 28 do
		local angle = (index / 28) * math.pi * 2
		local height = random:NextNumber(45, 90)
		local hill = makePart(
			"Hill",
			Vector3.new(90, height, 90),
			CFrame.new(math.cos(angle) * halfSize, height / 3 - 4, math.sin(angle) * halfSize),
			board.Colors.Rock,
			Enum.Material.Rock,
			hills
		)
		hill.Shape = Enum.PartType.Ball
	end

	makePart(
		"Hero Spawn Pad",
		Vector3.new(26, 2, 26),
		CFrame.new(0, 1, 0),
		Color3.fromRGB(238, 207, 106),
		Enum.Material.Marble,
		arena
	)

	makePart(
		"Copper Dig",
		Vector3.new(46, 8, 34),
		CFrame.new(scaledBoardPosition(board, { -84, -64 }, 4)),
		Color3.fromRGB(124, 94, 62),
		Enum.Material.Rock,
		arena
	)
	buildCamp(scaledBoardPosition(board, { 76, -76 }, 0))
	buildChapel(scaledBoardPosition(board, { 80, 80 }, 0))
	buildCollectibles()
	buildObstacleCourse()
	for index, building in ipairs(Config.World.Buildings) do
		addBuilding(building, index)
	end
end

local function createLimb(name: string, size: Vector3, offset: Vector3, color: Color3, parent: Model)
	local part = Instance.new("Part")
	part.Name = name
	part.Size = size
	part.Color = color
	part.Material = Enum.Material.SmoothPlastic
	part.CanCollide = false
	part.Position = parent:GetPivot().Position + offset
	part.Parent = parent
	return part
end

local function weld(root: BasePart, part: BasePart)
	local weldConstraint = Instance.new("WeldConstraint")
	weldConstraint.Part0 = root
	weldConstraint.Part1 = part
	weldConstraint.Parent = root
end

local function createCreatureEnemyRig(template, spawnPosition: Vector3)
	local model = Instance.new("Model")
	model.Name = template.Name
	model:SetAttribute("Damage", template.Damage)
	model:SetAttribute("Home", spawnPosition)

	local scale = template.Scale or 1
	local root = Instance.new("Part")
	root.Name = "HumanoidRootPart"
	root.Size = Vector3.new(5, 3, 7) * scale
	root.Transparency = 1
	root.CanCollide = false
	root.Position = spawnPosition
	root.Parent = model
	model.PrimaryPart = root
	markMinimap(root, "Enemy", template.Name, template.Color)

	local humanoid = Instance.new("Humanoid")
	humanoid.MaxHealth = template.Health
	humanoid.Health = template.Health
	humanoid.WalkSpeed = template.Speed
	humanoid.DisplayName = template.Name
	humanoid.Parent = model

	local body = Instance.new("Part")
	body.Name = "CreatureBody"
	body.Shape = Enum.PartType.Ball
	body.Size = Vector3.new(6, 3.2, 8) * scale
	body.Color = template.Color
	body.Material = Enum.Material.SmoothPlastic
	body.CanCollide = false
	body.Position = spawnPosition
	body.Parent = model
	weld(root, body)

	local head = Instance.new("Part")
	head.Name = "CreatureHead"
	head.Shape = Enum.PartType.Ball
	head.Size = Vector3.new(3, 2.5, 3) * scale
	head.Color = template.Color:Lerp(Color3.new(1, 1, 1), 0.12)
	head.Material = Enum.Material.SmoothPlastic
	head.CanCollide = false
	head.Position = spawnPosition + Vector3.new(0, 0.8 * scale, -4.2 * scale)
	head.Parent = model
	weld(root, head)

	for index = 1, 4 do
		local side = index <= 2 and -1 or 1
		local front = index % 2 == 0 and -1 or 1
		local leg = Instance.new("Part")
		leg.Name = "CreatureLeg"
		leg.Size = Vector3.new(1.2, 3, 1.2) * scale
		leg.Color = template.Color:Lerp(Color3.new(0, 0, 0), 0.16)
		leg.Material = Enum.Material.SmoothPlastic
		leg.CanCollide = false
		leg.Position = spawnPosition + Vector3.new(side * 2.2 * scale, -2.2 * scale, front * 2.4 * scale)
		leg.Parent = model
		weld(root, leg)
	end

	if template.Kind == "spider" then
		for index = 1, 8 do
			local angle = (index / 8) * math.pi * 2
			local leg = Instance.new("Part")
			leg.Name = "SpiderLeg"
			leg.Size = Vector3.new(0.7, 0.7, 5.5) * scale
			leg.Color = template.Color:Lerp(Color3.new(0, 0, 0), 0.2)
			leg.Material = Enum.Material.SmoothPlastic
			leg.CanCollide = false
			leg.CFrame = CFrame.new(
				spawnPosition + Vector3.new(math.cos(angle) * 3 * scale, -0.8 * scale, math.sin(angle) * 3 * scale)
			) * CFrame.Angles(0, -angle, 0)
			leg.Parent = model
			weld(root, leg)
		end
	end

	addLabel(head, template.Name)
	model:PivotTo(CFrame.new(spawnPosition))
	model.Parent = enemiesFolder
	return model
end

local function createHumanoidEnemyRig(template, spawnPosition: Vector3)
	local description = Instance.new("HumanoidDescription")
	description.HeadColor = template.Color:Lerp(Color3.new(1, 1, 1), 0.18)
	description.TorsoColor = template.Color
	description.LeftArmColor = template.Color
	description.RightArmColor = template.Color
	description.LeftLegColor = template.Color:Lerp(Color3.new(0, 0, 0), 0.12)
	description.RightLegColor = template.Color:Lerp(Color3.new(0, 0, 0), 0.12)

	local model = Players:CreateHumanoidModelFromDescriptionAsync(description, Enum.HumanoidRigType.R15)
	model.Name = template.Name
	model:SetAttribute("Damage", template.Damage)
	model:SetAttribute("Home", spawnPosition)

	local scale = template.Scale or 1
	local humanoid = model:FindFirstChildOfClass("Humanoid")
	humanoid.MaxHealth = template.Health
	humanoid.Health = template.Health
	humanoid.WalkSpeed = template.Speed
	humanoid.DisplayName = template.Name

	if scale ~= 1 then
		model:ScaleTo(scale)
	end

	local root = model:FindFirstChild("HumanoidRootPart")
	if root then
		markMinimap(root, "Enemy", template.Name, template.Color)
		addLabel(root, template.Name)
	end

	model:PivotTo(CFrame.new(spawnPosition))
	model.Parent = enemiesFolder
	return model
end

local function createEnemyRig(template, spawnPosition: Vector3)
	if template.Kind == "beast" or template.Kind == "spider" then
		return createCreatureEnemyRig(template, spawnPosition)
	end

	return createHumanoidEnemyRig(template, spawnPosition)
end

local function spawnEnemies()
	for _, template in ipairs(Config.Enemies) do
		for index = 1, template.Count do
			local angle = (index / math.max(template.Count, 1)) * math.pi * 2
			local radius = template.Spread * (0.35 + (index % 4) * 0.16)
			local spawnPosition = template.Center + Vector3.new(math.cos(angle) * radius, 4, math.sin(angle) * radius)
			createEnemyRig(template, spawnPosition)
		end
	end
end

local function nearestEnemy(position: Vector3, maxDistance: number)
	local bestEnemy = nil
	local bestDistance = maxDistance
	for _, enemy in ipairs(enemiesFolder:GetChildren()) do
		local humanoid = enemy:FindFirstChildOfClass("Humanoid")
		local root = enemy:FindFirstChild("HumanoidRootPart")
		if humanoid and root and humanoid.Health > 0 then
			local distance = (root.Position - position).Magnitude
			if distance < bestDistance then
				bestEnemy = enemy
				bestDistance = distance
			end
		end
	end
	return bestEnemy, bestDistance
end

local function damageEnemy(enemy: Model, amount: number)
	local humanoid = enemy:FindFirstChildOfClass("Humanoid")
	local root = enemy:FindFirstChild("HumanoidRootPart")
	if not humanoid or not root or humanoid.Health <= 0 then
		return
	end

	humanoid:TakeDamage(amount)
	local flash = makePart(
		"Hit Flash",
		Vector3.new(4, 4, 4),
		CFrame.new(root.Position),
		Color3.fromRGB(110, 225, 255),
		Enum.Material.Neon,
		effectsFolder
	)
	flash.Shape = Enum.PartType.Ball
	flash.CanCollide = false
	TweenService:Create(flash, TweenInfo.new(0.25), { Transparency = 1, Size = Vector3.new(8, 8, 8) }):Play()
	task.delay(0.3, function()
		flash:Destroy()
	end)
end

local function canUse(player: Player, actionName: string, cooldown: number)
	local now = os.clock()
	lastActionAt[player] = lastActionAt[player] or {}
	local last = lastActionAt[player][actionName] or 0
	if now - last < cooldown then
		return false
	end
	lastActionAt[player][actionName] = now
	return true
end

local function characterRoot(player: Player)
	local character = player.Character
	if not character then
		return nil
	end
	return character:FindFirstChild("HumanoidRootPart") :: BasePart?
end

local function doMelee(player: Player)
	local root = characterRoot(player)
	if not root or not canUse(player, "Melee", Config.Actions.Melee.Cooldown) then
		return
	end
	local enemy = nearestEnemy(root.Position + root.CFrame.LookVector * 5, Config.Actions.Melee.Range)
	if enemy then
		damageEnemy(enemy, Config.Actions.Melee.Damage)
	end
end

local function doSlam(player: Player)
	local root = characterRoot(player)
	if not root or not canUse(player, "GroundSlam", Config.Actions.GroundSlam.Cooldown) then
		return
	end

	local slam = makePart(
		"Ground Slam",
		Vector3.new(1, 1, 1),
		CFrame.new(root.Position - Vector3.new(0, 2.2, 0)),
		Color3.fromRGB(255, 214, 88),
		Enum.Material.Neon,
		effectsFolder
	)
	slam.Shape = Enum.PartType.Ball
	slam.CanCollide = false
	TweenService:Create(slam, TweenInfo.new(0.45), {
		Size = Vector3.new(Config.Actions.GroundSlam.Radius * 2, 1, Config.Actions.GroundSlam.Radius * 2),
		Transparency = 1,
	}):Play()
	task.delay(0.5, function()
		slam:Destroy()
	end)

	for _, enemy in ipairs(enemiesFolder:GetChildren()) do
		local enemyRoot = enemy:FindFirstChild("HumanoidRootPart")
		if enemyRoot and (enemyRoot.Position - root.Position).Magnitude <= Config.Actions.GroundSlam.Radius then
			damageEnemy(enemy :: Model, Config.Actions.GroundSlam.Damage)
		end
	end
end

local function doBurst(player: Player)
	local root = characterRoot(player)
	if not root or not canUse(player, "ArcaneBurst", Config.Actions.ArcaneBurst.Cooldown) then
		return
	end

	for _, enemy in ipairs(enemiesFolder:GetChildren()) do
		local enemyRoot = enemy:FindFirstChild("HumanoidRootPart")
		if enemyRoot and (enemyRoot.Position - root.Position).Magnitude <= Config.Actions.ArcaneBurst.Radius then
			damageEnemy(enemy :: Model, Config.Actions.ArcaneBurst.Damage)
		end
	end
end

local function doBolt(player: Player, direction: Vector3)
	local root = characterRoot(player)
	if not root or direction.Magnitude < 0.5 or not canUse(player, "HandBolt", Config.Actions.HandBolt.Cooldown) then
		return
	end

	local bolt = Instance.new("Part")
	bolt.Name = "Hand Bolt"
	bolt.Shape = Enum.PartType.Ball
	bolt.Size = Vector3.new(2.2, 2.2, 2.2)
	bolt.Color = Color3.fromRGB(70, 215, 255)
	bolt.Material = Enum.Material.Neon
	bolt.CanCollide = false
	bolt.CFrame = CFrame.new(root.Position + Vector3.new(0, 1.5, 0) + direction.Unit * 5)
	bolt.Parent = effectsFolder

	local velocity = direction.Unit * Config.Actions.HandBolt.Speed
	local bornAt = os.clock()
	local hit = false
	local connection
	connection = RunService.Heartbeat:Connect(function(dt)
		if hit or not bolt.Parent then
			connection:Disconnect()
			return
		end
		bolt.Position += velocity * dt
		local enemy = nearestEnemy(bolt.Position, 5)
		if enemy then
			hit = true
			damageEnemy(enemy, Config.Actions.HandBolt.Damage)
			bolt:Destroy()
		elseif os.clock() - bornAt > Config.Actions.HandBolt.LifeTime then
			bolt:Destroy()
		end
	end)
end

local function setFlight(player: Player, enabled: boolean)
	local root = characterRoot(player)
	if not root then
		return
	end

	flightState[player] = flightState[player] or { enabled = false }
	local state = flightState[player]
	state.enabled = enabled

	if state.velocity then
		state.velocity:Destroy()
		state.velocity = nil
	end
	if state.attachment then
		state.attachment:Destroy()
		state.attachment = nil
	end

	if enabled then
		local attachment = Instance.new("Attachment")
		attachment.Name = "FlightAttachment"
		attachment.Parent = root

		local velocity = Instance.new("LinearVelocity")
		velocity.Name = "FlightVelocity"
		velocity.Attachment0 = attachment
		velocity.MaxForce = 100000
		velocity.VectorVelocity = Vector3.zero
		velocity.Parent = root

		state.attachment = attachment
		state.velocity = velocity
	end
end

actionEvent.OnServerEvent:Connect(function(player: Player, actionName: string, direction: Vector3?)
	if actionName == "Melee" then
		doMelee(player)
	elseif actionName == "HandBolt" and typeof(direction) == "Vector3" then
		doBolt(player, direction)
	elseif actionName == "GroundSlam" then
		doSlam(player)
	elseif actionName == "ArcaneBurst" then
		doBurst(player)
	end
end)

flightEvent.OnServerEvent:Connect(function(player: Player, enabled: boolean, moveVector: Vector3?)
	if typeof(enabled) ~= "boolean" then
		return
	end

	local state = flightState[player]
	if not state or state.enabled ~= enabled then
		setFlight(player, enabled)
		state = flightState[player]
	end

	if state and state.velocity and typeof(moveVector) == "Vector3" then
		state.velocity.VectorVelocity = moveVector.Magnitude > 1 and moveVector.Unit * Config.Player.FlightSpeed
			or moveVector * Config.Player.FlightSpeed
	end
end)

Players.PlayerAdded:Connect(function(player)
	player.CharacterAdded:Connect(function(character)
		local humanoid = character:WaitForChild("Humanoid") :: Humanoid
		humanoid.WalkSpeed = Config.Player.WalkSpeed
		humanoid.JumpPower = Config.Player.JumpPower
		humanoid.MaxHealth = Config.Player.MaxHealth
		humanoid.Health = Config.Player.MaxHealth

		local root = character:WaitForChild("HumanoidRootPart") :: BasePart
		root.CFrame = CFrame.new(Config.World.Spawn)
	end)
end)

Players.PlayerRemoving:Connect(function(player)
	lastActionAt[player] = nil
	flightState[player] = nil
end)

buildWorld()
spawnEnemies()

task.spawn(function()
	while true do
		for _, enemy in ipairs(enemiesFolder:GetChildren()) do
			local humanoid = enemy:FindFirstChildOfClass("Humanoid")
			local root = enemy:FindFirstChild("HumanoidRootPart") :: BasePart?
			if humanoid and root then
				if humanoid.Health <= 0 then
					enemy:Destroy()
				else
					local targetPlayer = nil
					local targetDistance = 90
					for _, player in ipairs(Players:GetPlayers()) do
						local playerRoot = characterRoot(player)
						local playerHumanoid = player.Character and player.Character:FindFirstChildOfClass("Humanoid")
						if playerRoot and playerHumanoid and playerHumanoid.Health > 0 then
							local distance = (playerRoot.Position - root.Position).Magnitude
							if distance < targetDistance then
								targetPlayer = player
								targetDistance = distance
							end
						end
					end

					if targetPlayer then
						local playerRoot = characterRoot(targetPlayer)
						if playerRoot then
							humanoid:MoveTo(playerRoot.Position)
							if targetDistance < 5 then
								local playerHumanoid = targetPlayer.Character
									and targetPlayer.Character:FindFirstChildOfClass("Humanoid")
								if playerHumanoid then
									playerHumanoid:TakeDamage(enemy:GetAttribute("Damage") or 8)
								end
							end
						end
					else
						local home = enemy:GetAttribute("Home")
						if typeof(home) == "Vector3" and (root.Position - home).Magnitude > 8 then
							humanoid:MoveTo(home)
						end
					end
				end
			end
		end

		if #enemiesFolder:GetChildren() < 12 then
			spawnEnemies()
		end

		task.wait(0.75)
	end
end)
