const mongoose = require('mongoose');


const saleManerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['user', 'admin', 'salesman'],
        default: 'salesman'
    },
    profilePicture:{
        type: String,
        required: true,
    }
})



const Salesman = mongoose.model('Salesman', saleManerSchema);

module.exports = Salesman;
