const { Client } = require("pg");
require("dotenv").config();
const client = new Client({
  user: "marnin_a",
  host: "localhost",
  database: "savanna-showcase",
  password: process.env.password,
  port: 5432,
});
console.log();
client.connect();
module.exports = client;
