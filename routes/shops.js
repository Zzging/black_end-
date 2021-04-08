const express = require("express");

const { check } = require("express-validator");
const router = express.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "/Users/WIN10X64/Desktop/งานพี่ตั้ม/mini_project/public/assets/img"
    );
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

const shopController = require("../controllers/shops");

router.get("/", shopController.getproductindex);
router.get("/shop", shopController.getproductShop);
router.get("/shopDetail/:product_id", shopController.getproductDetail);
router.get("/cart", shopController.getproductCart);

router.get("/stock", shopController.adminStock);
router.get("/productDetail/:product_id", shopController.getproductDetail);
router.get("/editProduct/:product_id", shopController.adminEdit);
router.get("/delete/:product_id", shopController.deleteProduct);

router.get("/create", shopController.viewCreate);

router.get("/edit/:product_id", shopController.adminEdit);

router.post("/create", [upload.single("image")], shopController.postAddProduct);

router.post(
  "/push",
  [
    check("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("product name is required"),
    check("balance").isFloat({ gt: 0 }).withMessage("greater than zero"),
  ],
  shopController.postproductCart
);

exports.routes = router;
