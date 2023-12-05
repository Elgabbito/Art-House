const db = require("../db");


//create a art table 
async function uploadArt(image, description, price, artistName, location) {
    const query = 'INSERT INTO arts(image, description, price, artistName, location) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [image, description, price, artistName, location]

    const result = await db.query(query, values)
    return result.rows[0];
}

async function deleteArtListing(artId) {
     const query = "DELETE FROM art WHERE id= $1 RETURNING *";
     const values = [artId];

     const result = await db.query(query, values)
     return result.rows[0];
}

module.exports ={uploadArt, deleteArtListing}