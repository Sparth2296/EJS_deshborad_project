const User = require('../model/userModel');
const cloudinary = require('../config/cloudinary');
const Product = require('../model/productModel');

// Register Page
module.exports.registrationController = (req, res) => {
  res.render('registration');
};

// Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, role, username, password } = req.body;

    const userData = { name, email, role, username, password };

    if (req.file) {
      userData.profilePhoto = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    // Normalize roles
    if (role === 'admin') userData.role = 'admin';
    else if (role === 'salesman') userData.role = 'salesman';
    else userData.role = 'user';

    const user = await User.create(userData);

    req.session.user = user; // save session
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating user');
  }
};

// Login Page
module.exports.loginController = (req, res) => {
  res.render('login');
};

// Login Logic
module.exports.loginPostController = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const user = await User.findOne({ username, password, role });

    if (!user) {
      return res.render('login', { error: 'Invalid Credentials' });
    }

    req.session.user = user;

    // Redirect based on role
    if (user.role === "admin") return res.redirect("/admin");
    if (user.role === "salesman") return res.redirect("/salesman");
    return res.redirect("/user");

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

// Logout
module.exports.logoutController = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

// User Home
module.exports.userHome = (req, res) => {
  res.render('home', { user: req.session.user });
};

// About Page
module.exports.aboutcontroller = (req, res) => {
  res.render('about', { user: req.session.user });
};

// Contact Page
module.exports.contactcontroller = (req, res) => {
  res.render('contact', { user: req.session.user });
};



// Admin Dashboard
module.exports.adminController = async (req, res) => {
  const products = await Product.find();
  const users = await User.find();
  res.render("admin", { user: req.session.user, products, users });
};

// Salesman Dashboard
module.exports.salesmanController = async (req, res) => {
  const products = await Product.find();
  res.render("salesman", { user: req.session.user, products });
};

// Add Product (Form)
module.exports.createProductForm = (req, res) => {
  res.render("addproduct");
};

// Create Product (Submit)
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
        public_id: req.file.filename,
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
  res.render("products", { user: req.session.user, products });
};

// Product Details
module.exports.getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("detaileproduct", { user: req.session.user, product });
};
