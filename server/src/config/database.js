const { sequelize, Sequelize } = require("sequelize");

let sequelize;

const buildSequelize = () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return new Sequelize(databaseUrl, {
      dialect: "postgres",
      logging: false,
    });
  }

  const dbName = process.env.POSTGRES_DB || "js_mini";
  const dbUser = process.env.POSTGRES_USER || "postgres";
  const dbPass = process.env.POSTGRES_PASSWORD || "postgres";
  const dbHost = process.env.POSTGRES_HOST || "localhost";
  const dbPort = Number(process.env.POSTGRES_PORT || 5432);

  return new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
  });
};

sequelize = buildSequelize();

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres Connected Successfully");

    await sequelize.sync();
  } catch (err) {
    console.error("Postgres Connection Error");
    process.exit();
  }
};

module.exports = {
  connectDB,
  getSequelize: () => sequelize,
  sequelize,
};
