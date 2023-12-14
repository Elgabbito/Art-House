const db = require("../db");

async function storeArtData(
	public_id,
	url,
	{ title, cost, type, description, location, purchase_type, artist_id }
) {
	const query =
		"INSERT INTO art (name, public_id, url, cost,type, description, location, purchase_type, artist_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
	const values = [
		title,
		public_id,
		url,
		cost,
		type,
		description,
		location,
		purchase_type,
		artist_id,
	];
	const dbResult = await db.query(query, values);
	return dbResult.rows[0];
}
async function getArtData() {
	const query = "SELECT * FROM art LIMIT 10";
	const dbResult = await db.query(query);
	return dbResult.rows;
}
async function getArtByCategory() {
	const query =
		"SELECT DISTINCT ON (type) * FROM art ORDER BY type, id OFFSET 1 LIMIT 1";
	const dbResult = await db.query(query);
	return dbResult.rows;
}
async function getSingleArt(id) {
	const artDetailsQuery = "SELECT * FROM art WHERE id = $1;";
	const bidsQuery = `SELECT users.name, bids.bid_id, bids.art_id, bids.amount, bids.created_at, bids.bidder_id
        FROM bids
        JOIN users
        ON bids.bidder_id = users.id
        WHERE bids.art_id = $1;`;
	const artDetailsResult = await db.query(artDetailsQuery, [id]);
	const bidsResult = await db.query(bidsQuery, [id]);
	return { details: artDetailsResult.rows[0], bids: bidsResult.rows.reverse() };
}
async function getFilteredArt(
	minPrice = min,
	maxPrice = max,
	name,
	location,
	category
) {
	// const query = `SELECT * art WHERE  ${name ? "name=" + name : ""}`;
	const query = `SELECT *
FROM art
WHERE cost BETWEEN ${minPrice} AND ${maxPrice}
  ${name ? `AND name = '${name}'` : ""}
  ${
		category
			? `AND type IN (${category.includes("painting") ? "'painting'" : ""},
    ${category.includes("ceramic") ? "'ceramic'" : ""},
    ${category.includes("sculpture") ? "'sculpture'" : ""},
    ${category.includes("drawing") ? "'drawing'" : ""},
    ${category.includes("photograph") ? "'photograph'" : ""})`
			: ""
	};`;
	// Add location to upload setction : ${location ? `AND location = '${location}'` : ""}
	const dbResult = await db.query(query);
	console.log("DBresults:", dbResult);
	return dbResult.rows[0];
}
async function deleteArtListing(artId) {
     const query = "DELETE FROM art WHERE id= $1 RETURNING *";
     const values = [artId];

     const result = await db.query(query, values)
     return result.rows[0];
}
module.exports = {
	storeArtData,
	getArtData,
	getArtByCategory,
	getFilteredArt,
	getSingleArt,
	deleteArtListing
};
