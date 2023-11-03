const { Client } = require("pg");
require("dotenv").config();
const client = new Client({
  user: "user",
  host: "localhost",
  database: "savanna-showcase",
  password: process.env.password,
  port: 5432,
});
console.log();
client.connect();
module.exports = client;
