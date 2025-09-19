import { Sequelize } from "sequelize";

export const getSequelize = () => {
  const dbName = process.env.POSTGRES_DB || "postgres";
  const dbUser = process.env.POSTGRES_USER || "postgres";
  const dbPass = process.env.POSTGRES_PASSWORD || "root";
  const dbHost = process.env.POSTGRES_HOST || "localhost";
  const dbPort = Number(process.env.POSTGRES_PORT || 5432);

  return new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: "postgres",
    logging: false,
  });
};

export const buildSequelize = () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    return new Sequelize(databaseUrl, {
      dialect: "postgres",
      logging: false,
    });
  }

  return getSequelize();
};

export const sequelize = buildSequelize();

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Postgres Connected Successfully");

    // Sync models with DB (safe in dev, not recommended in prod — use migrations instead)
    await sequelize.sync({ alter: true });
    console.log("✅ All models synced successfully");
  } catch (err) {
    console.error("❌ Postgres Connection Error:", err.message);
    process.exit(1);
  }
};
