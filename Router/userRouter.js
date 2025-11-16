// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const parser = require('../middlewares/upload'); // multer-storage-cloudinary
const userController = require('../controller/userController');

// create user + upload single profile photo named 'profilePhoto'
router.post('/create', parser.single('profilePhoto'), userController.createUser);

// update profile photo
router.post('/:id/photo', parser.single('profilePhoto'), userController.updatePhoto);

module.exports = router;
