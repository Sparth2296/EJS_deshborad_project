const mongoose = require('mongoose');
const multer = require('multer');

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('profilePicture');

saleManerSchema.statics.uploadProfilePicture = upload;
saleManerSchema.statics.profilePicturePath = 'uploads/profilePicture/';

const Salesman = mongoose.model('Salesman', saleManerSchema);

module.exports = Salesman;
