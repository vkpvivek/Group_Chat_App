
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.postUser = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    console.log(username + "...." + email + "....." + phone + "...." + password);

    const saltrounds = 5;

    try {
        const hash = await bcrypt.hash(password, saltrounds);
        const data = await User.create({ username, email, phone, password: hash });

        res.status(201).json({
            newUserDetails: data
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(201).json({ message: "USer Already Exist Please Login" });
    }
};


