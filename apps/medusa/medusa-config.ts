import { defineConfig } from "@medusajs/utils";

export default defineConfig({
  admin: {
    path: "/admin",
  },
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:4173",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001",
      authCors:
        process.env.AUTH_CORS || "http://localhost:7001,http://localhost:4173",
      jwtSecret: process.env.JWT_SECRET || "dev-jwt-secret",
      cookieSecret: process.env.COOKIE_SECRET || "dev-cookie-secret",
    },
  },
});
