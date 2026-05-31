process.env.DATABASE_URL ||= "postgresql://sinego:sinego_dev_password@localhost:5432/sinego_care";
process.env.ADMIN_TOKEN ||= "dev-admin-token";
await import("../server.js");
