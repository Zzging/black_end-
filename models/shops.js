const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Shops {
  constructor(product_name, ProductType, price, balance, Detail, path, id) {
    this.product_name = product_name;
    this.ProductType = ProductType;
    this.price = price;
    this.balance = balance;
    this.Detail = Detail;
    this.path = path;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    //ifนับว่ามันมีมั้ย
    if (this._id) {
      // Update the product db.shops.updateOne({_id:object(....)},{$set: {}});
      dbOp = db
        .collection("shops")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      // Insert product db.shops.insertOne({"key1":val1,"key2":val2})
      dbOp = db.collection("shops").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("shops") //db.shops.find({})
      .find()
      .toArray()
      .then((shops) => {
        console.log(shops);
        return shops;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByName(name) {
    const db = getDb();
    return db
      .collection("shops")
      .find({ product_name: name })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("shops")
      .find({ _id: mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByType(type) {
    const db = getDb();
    return db
      .collection("shops")
      .find({ ProductType: type })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("shops")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) }) //db.shops.deleteOne({_id:ObjectId('......')}) ลบที่เงื่อนไขตรง
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Shops;
