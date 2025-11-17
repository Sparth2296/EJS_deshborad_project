const User = require('../model/userModel');
const cloudinary = require('../config/cloudinary');
const Product = require('../model/productModel');

module.exports.registrationController = (req, res) => {
    res.render('registration');
}



exports.createUser = async (req, res) => {

        console.log(req.body);
        console.log(req.file);
        
  try {
    const { name, email, role ,username, password} = req.body;
    const userData = { name, email, role, username, password };

    if (req.file) {
      // multer-storage-cloudinary provides path & filename etc
      userData.profilePhoto = {
        url: req.file.path,         // full http url
        public_id: req.file.filename // cloudinary public id
      };
    }


    if(userData.role === 'admin'){
        userData.role = 'admin';
    }else if(userData.role === 'saleman'){
        userData.role = 'saleman';
    }else if(userData.role === 'user'){
        userData.role = 'user';
    }

    const user = await User.create(userData);
    
    res.redirect(`/user/${user._id}`);
     
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
    res.render('user', { user });


  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // <-- FIXED

    if (!user) return res.status(404).send('User not found');

    res.render('user', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};



module.exports.loginController = (req, res) => {
    res.render('login');
}


module.exports.loginPostController = async (req, res) => {
  try {
    const { username, password , role} = req.body;

    const user = await User.findOne({ username, password , role });

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    console.log(user);
    

    // Redirect based on role
    if (user.role === "admin") {
      return res.redirect(`/admin/${user._id}`);
    } else if (user.role === "salesman") {
      return res.redirect(`/salesman/${user._id}`);
    }else if(user.role === "user"){
        return res.redirect(`/user/${user._id}`);
    }

    return res.render('login', { error: "Role not recognized" });


  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }


}

module.exports.adminController = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    res.render("admin", { user });

  } catch (error) {
    console.error(error);
  }
};

module.exports.salesmanController = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    res.render("salesman", { user });

  } catch (error) {
    console.error(error);
  }
};


module.exports.createProductForm = (req, res) => {
    res.render("addproduct");
}

module.exports.createProduct = async (req, res) => {
    try {
        const { product_name, price, description, sort_description, discount, color, rating } = req.body;

        const product = await Product.create({
            product_name,
            price,
            description,
            sort_description,
            discount,
            color,
            rating,
            product_image: {
                url: req.file.path,
                public_id: req.file.filename
            }
        });

        res.redirect("/products");
    } catch (err) {
        console.log(err);
        res.status(500).send("Product creation failed");
    }
};

// Show all products
module.exports.getProducts = async (req, res) => {
    const products = await Product.find();
    res.render("products", { products });
};





