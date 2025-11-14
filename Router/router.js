const express = require("express");
const controller = require("../controller/controller");
const userModel = require("../model/userModel");
const adminModel = require("../model/adminModel");
const salesmanModel = require("../model/salemanModel");
const router = express.Router();

router.get("/", controller.registrationController);



router.post(
  "/create-user-admin-salesman",
  userModel.uploadProfilePicture,
  adminModel.uploadProfilePicture,
  salesmanModel.uploadProfilePicture,
  controller.create_User_Admin_Salesman
);

module.exports = router;
