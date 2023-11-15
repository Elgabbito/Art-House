const db = require("../db");

async function storeArtData(title, public_id, url, cost, type, description) {
  const query =
    "INSERT INTO art (name, public_id, url, cost,type, description) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [title, public_id, url, cost, type, description];
  const dbResult = await db.query(query, values);
  return dbResult.rows[0];
}
module.exports = { storeArtData };
