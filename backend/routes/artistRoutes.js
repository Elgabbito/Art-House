const express = require("express")
const router = express.Router();
const artistModel = require("../models/artistmodel")


//uploading art 

router.post("/upload", async(req, res) =>{
    const {image, description, price, artistName, location} = req.body;
     try {
        const uploadedArt = await artistModel.uploadArt(image, description, price, artistName, location)
        return res.json({success : true , art: uploadedArt})
     } catch (error) {
        console.error("Failed to Upload",error)
        return res.status(500).json({message : "Internal Server Error"})
        
    }
})

router.delete("/delete", async(req, res) =>{
    const artId = req.params.artId;
    try {
        const deletedArt =  await artistModel.deleteArtListing(artId);
        return res.json({ success: true, deletedArt})        
    } catch (error) {
        console.error("Fail to Delete", error);
        return res.status(500).json({message : "Internal Server Error"})
        
    }
})


module.exports = router; 