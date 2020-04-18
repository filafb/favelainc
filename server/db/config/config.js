const pkg = require("../../../package.json")

const databaseName = pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "")

module.exports = {
  development: {
    url: `postgres://localhost:5432/${databaseName}`,
    dialect: "postgres"
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres"
  }
}
