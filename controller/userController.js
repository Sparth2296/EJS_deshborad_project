    // controllers/userController.js
const User = require('../model/userModel');
const cloudinary = require('../config/cloudinary');

exports.createUser = async (req, res) => {

        console.log(req.body);
        console.log(req.file);
        
  try {
    const { name, email, role ,username, password} = req.body;
    const userData = { name, email, role, username, password };


    console.log(userData);
    

    if (req.file) {
      // multer-storage-cloudinary provides path & filename etc
      userData.profilePhoto = {
        url: req.file.path,         // full http url
        public_id: req.file.filename // cloudinary public id
      };
    }

    const user = await User.create(userData);
    
    res.redirect(`/users/${user._id}`);
     
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    // Optionally delete previous image from Cloudinary
    if (user.profilePhoto && user.profilePhoto.public_id) {
      await cloudinary.uploader.destroy(user.profilePhoto.public_id);
    }

    if (req.file) {
      user.profilePhoto = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }
    await user.save();
    res.redirect(`/users/${user._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
