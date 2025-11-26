const express = require("express");
const router = express.Router();
const multer = require("../middlewares/upload");
const controller = require("../controller/controller");

// Middlewares
function isLogged(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

function isAdmin(req, res, next) {
  if (req.session.user?.role !== "admin") return res.status(403).send("Unauthorized");
  next();
}

function isSalesman(req, res, next) {
  if (req.session.user?.role !== "salesman") return res.status(403).send("Unauthorized");
  next();
}

// Auth
router.get("/registration", controller.registrationController);
router.post("/registration", multer.single("profilePhoto"), controller.createUser);

router.get("/login", controller.loginController);
router.post("/login", controller.loginPostController);

router.get("/logout", controller.logoutController);

// User Routes
router.get("/", isLogged, controller.userHome);
router.get("/user", isLogged, controller.userHome);
router.get("/about", isLogged, controller.aboutcontroller);
router.get("/contact", isLogged, controller.contactcontroller);


// Product
router.get("/products", isLogged,controller.getProducts);
router.get("/product/:id", isLogged, controller.getProductDetails);

// Salesman
router.get("/salesman", isSalesman, controller.salesmanController);
router.get("/addproduct", isSalesman, controller.createProductForm);
router.post("/addproduct", isSalesman, multer.single("product_image"), controller.createProduct);
router.get("/products/edit/:id", isSalesman, controller.editProductForm);
router.post("/products/update/:id", isSalesman, multer.single("product_image"), controller.updateProduct);
router.post("/products/delete/:id", isSalesman, controller.deleteProduct);

// Admin
router.get("/admin", isAdmin, controller.adminController);



module.exports = router;
