// middlewares/upload.js
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // put uploads into folder by role or user id (optional)
    const folder = req.body.role ? `profiles/${req.body.role}` : 'profiles';
    return {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
   
    };
  },
});

const parser = multer({ storage });

module.exports = parser;
