const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true,
        default: false,
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 20
    }
});

const Customer = mongoose.model('Customers', customerSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string()
                .required()
                .min(5)
                .max(50),
        phone: Joi.number()
                .required()
                .positive(),
        isGold: Joi.boolean()
    })
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;