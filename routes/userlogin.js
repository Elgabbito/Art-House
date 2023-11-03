// const express = require('express')
// const bcrypt =  require('bcrypt')
// const db = require("../db")
// const router = express.Router();
// const saltRounds = Number(process.env.saltRounds);

// //login route 
// router.post("/", async(req, res, next) => {
//     const {email, Password} = req.body;

//     try {
//         const result = await db.query("SELECT password FROM users WHERE email = $1", [email])
//         if (result.rows.length === 0) {
//             res.status(401).json({message: "Invalid Email or Password"})    
//         }
//         const hashedPassword = result.rows[0].password;

//               //comparing the password
//         const PasswordMatch = await bcrypt.compare(Password, hashedPassword);

//         if (PasswordMatch) {
//             return res.json({message: "Login Successful"})
//         } else{
//             //password doesnt match
//             return res.status(401).json({message: "Invalid Email or Password"})
//         }
//     } catch (error) {
//         return res.status(500).json({message : "Internal server Error"});
//     }  
// })

// module.exports = router;