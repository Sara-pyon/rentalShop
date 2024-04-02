const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true,
        default: false,
    },
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
    phone: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    }
});

const Customer = mongoose.model('Customers', customerSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        first_name: Joi.string()
                .required()
                .min(3)
                .max(50),
        last_name: Joi.string()
                .required()
                .min(3)
                .max(50),
        phone: Joi.number()
                .required()
                .positive(),
        isGold: Joi.boolean(),
        email: Joi.string().min(5).max(255).required()
                .email({
                    minDomainSegments: 2, 
                    tlds: { allow: ['com', 'net'] }
                }),
    })
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;