const db = require("../db");

async function storeArtData(fileName, public_id, url) {
  const query =
    "INSERT INTO art (name, public_id, url) VALUES ($1, $2, $3) RETURNING *";
  const values = [fileName, public_id, url];
  const dbResult = await db.query(query, values);

  return dbResult.rows[0];
}
module.exports = { storeArtData };
