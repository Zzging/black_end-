const { validationResult } = require("express-validator");

const mongodb = require("mongodb");
const Shops = require("../models/shops");
const Categories = require("../models/categories");
const ObjectId = mongodb.ObjectId;
const Cart = require("../models/carts");

exports.getproductindex = (req, res, next) => {
  Shops.fetchAll()
    .then((productShop) => {
      res.render("shops/index", {
        pageTitle: "Search Product",
        prods: productShop,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getproductShop = (req, res, next) => {
  Shops.fetchAll()
    .then((productShop) => {
      res.render("shops/shop", {
        pageTitle: "shop",
        prods: productShop,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getproductDetail = (req, res, next) => {
  const { product_id } = req.params;

  Shops.findById(product_id)
    .then((productShop) => {
      res.render("shops/detail", {
        pageTitle: "shop",
        prods: productShop,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const { product_name, ProductType, price, balance, Detail } = req.body;
  const { filename } = req.file;
  let path = "/assets/img/" + filename;
  const errors = validationResult(req);

  const shops = new Shops(
    product_name,
    ProductType,
    price,
    balance,
    Detail,
    path
  );
  shops
    .save()
    .then((result) => {
      res.redirect("/stock");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getproductCart = (req, res, next) => {
  Cart.fetchAll()
    .then((productShop) => {
      res.render("shops/cart", {
        pageTitle: "shop",
        prods: productShop,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const { product_id } = req.params;
  Shops.deleteById(product_id)
    .then((result) => {
      res.redirect("/stock");
    })
    .catch((err) => console.log(err));
};

exports.viewCreate = (req, res, next) => {
  Cart.fetchAll()
    .then((carts) => {
      res.render("shops/create", {
        pageTitle: "Create",
        product_cart: carts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.adminEdit = (req, res, next) => {
  const { product_id } = req.params;
  Shops.findById(product_id)
    .then((product) => {
      Cart.fetchAll().then((cart) => {
        product_name = product.product_name;
        price = product.price;
        ProductType = product.ProductType;
        res.render("shops/edit", {
          pageTitle: "Edit",
          errorMessage: null,
          product_id: product_id,
          product_name: product_name,
          ProductType: ProductType,
          price: price,
          balance: product.balance,
          Detail: product.Detail,
          path: product.path,
          product_cart: cart,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.adminStock = (req, res, next) => {
  Shops.fetchAll()
    .then((products) => {
      Cart.fetchAll().then((carts) => {
        res.render("shops/stock", {
          pageTitle: "Stock",
          products: products,
          product_cart: carts,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postproductCart = (req, res, next) => {
  const { name, balance } = req.body;
  Shops.findByName(name).then((product) => {
    pname = product.product_name;
    pprice = product.price;

    const cart = new Cart(pname, pprice, balance);

    cart
      .save()
      .then((result) => {
        res.redirect("/shop");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
