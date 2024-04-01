const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get("jwtPrivateKey"));
    return token;
}

const User = mongoose.model('User', userSchema);

const validateUser = function(user){
    const schema = Joi.object({
        first_name: Joi.string().min(3).max(50).required(),
        last_name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required()
                    .email({
                        minDomainSegments: 2, 
                        tlds: { allow: ['com', 'net'] }
                    }),
        password: Joi.string().min(8).max(1024)
                    .pattern( new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
                    .message('Your password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long')
    });

    return schema.validate(user);
};

exports.User = User;
exports.validateUser = validateUser;