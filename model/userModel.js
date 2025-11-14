const mongoose = require("mongoose");
const multer = require("multer");

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
    role:{
        type: String,
        enum: ['user', 'admin', 'salesman'],
        default: 'user'
    },
    profilePicture:{
        type: String,
        required: true,
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/profilePicture/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('profilePicture');

userSchema.statics.uploadProfilePicture = upload;
userSchema.statics.profilePicturePath = 'uploads/profilePicture/';

const User = mongoose.model('User', userSchema);

module.exports = User;