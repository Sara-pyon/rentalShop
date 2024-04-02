const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const Joi = require('joi');
const validator = require('../middleware/validator');
const router = express.Router();

router.post('/', validator(validateAuth) ,async(req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(404).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send("Successfully logged in");
});

function validateAuth(req){
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).required()
          .email({
              minDomainSegments: 2, 
              tlds: { allow: ['com', 'net'] }
          }),
        password:Joi.string().min(8).max(1024)
                .pattern( new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
                .message('Invalid email or password')
    });

    return schema.validate(req);
}

module.exports = router;