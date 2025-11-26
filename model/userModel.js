const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
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
    phone:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    bio :{
        type: String,
        required: false,
    },
    role:{
        type: String,
        enum: ['user', 'admin', 'salesman'],
        default: 'user'
    },
    profilePhoto: {
    url: String,
    public_id: String
  }
}, { timestamps: true });



const User = mongoose.model('User', userSchema);

module.exports = User;