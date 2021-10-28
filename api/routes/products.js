const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const checkAuth = require("../middleware/check-auth");
const productController = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  dest:'uploads/',
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Product = require("../models/product");

router.get("/", productController.product_get_all);

router.post("/",checkAuth, upload.single('productImage'), productController.product_post_createProduct);

router.get("/:productId", productController.product_get_one);

router.patch("/:productId",checkAuth,upload.single('productImage'), productController.product_patch_singleProduct);

router.delete("/:productId",checkAuth, productController.product_delete);

module.exports = router;