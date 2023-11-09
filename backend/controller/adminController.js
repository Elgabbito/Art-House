const userModel = require('../models/userModel')

async function createNewUser(req, res, next) {
    try {
        //  check if the person is an admin
        // if(!req.user || req.user.role !== 'admin' ) { 
        //     return res.status(403).json({ message: "Admin permission Required"})
        // }
        const {name, email, password, user_role } = req.body || {};
        // if(req.body === ""){
        //     console.error("Input cannot be blank", error)
        // }
        const newUser = await userModel.createUser(name, email, password, user_role);

         return res.status(201).json({ message : "User Successfully Created", user: newUser})

    } catch (error) {
        console.error("Error Creating User:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    }
module.exports =  { createNewUser };

