const mongoose = require('mongoose');
const multer = require('multer');

const adminSchema = new mongoose.Schema({
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
        default: 'admin'
    },
    profilePicture:{
        type: String,
        required: true,
    }
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');   
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('profilePicture');

adminSchema.statics.uploadProfilePicture = upload;
adminSchema.statics.profilePicturePath = 'uploads/profilePicture/';

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
