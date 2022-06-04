const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const validateRegisterInput = require('../validation/registerValidation');


router.get("/test", (req, res) => {
    res.send("Auth route working");
});

router.post("/register", async (req, res) => {
    try{

        const {errors, isValid} =  validateRegisterInput(req.body);

        if(!isValid){
            return res.status(400).json(errors);
        }

        // check for existing user
        const existingEmail = await User.findOne({
            email: new RegExp("^" + req.body.email + "$", "i")
        });

        if(existingEmail){
            return res
            .status(400)
            .json({error: 'Sorry, There is already a user with this email'});
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        // craeting a new user 
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        });

        // save user in the DB

        const savedUser = await newUser.save();

        // return new user
        return res.json(savedUser);

    } catch(err){

        console.log(err);

        res.status(500).send(err.message);
    }
})

module.exports = router;