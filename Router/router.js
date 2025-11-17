const express = require("express");
const controller = require("../controller/controller");
const parser = require('../middlewares/upload'); // multer-storage-cloudinary



const router = express.Router();

router.get("/", controller.registrationController);



router.post('/create', parser.single('profilePhoto'), controller.createUser);
router.post('/:id/photo', parser.single('profilePhoto'), controller.updatePhoto);

router.get("/login", controller.loginController);
router.post("/login", controller.loginPostController);



router.get('/userprofile/:id', controller.getUserProfile);
router.get('/admin/:id', controller.adminController);
router.get('/salesman/:id', controller.salesmanController);


router.get('/create', controller.createProductForm);
router.get('/products', controller.getProducts);
router.post('/products/create', parser.single('product_image'), controller.createProduct);
// router.get('/allproduct', controller.getProducts);




module.exports = router;
