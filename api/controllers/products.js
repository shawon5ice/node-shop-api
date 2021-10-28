const Product = require('../models/product')

exports.product_get_all = (req, res) => {
    Product.find()
      .select("name price _id productImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              price: doc.price,
              productImage: doc.productImage,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/products/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}

exports.product_post_createProduct = (req, res) => {
    console.log(req);
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path 
    });
    product
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created product successfully",
          createdProduct: {
              name: result.name,
              price: result.price,
              _id: result._id,
              productImage:result.productImage,
              request: {
                  type: 'GET',
                  url: "http://localhost:3000/products/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}


exports.product_get_one = (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
      .select('name price _id productImage')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:3000/products'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
}

exports.product_patch_singleProduct = (req, res) => {
    const id = req.params.productId;
    // const updateOps = {};
    // for (const ops of req.body) {
    //   updateOps[ops.propName] = ops.value;
    // }
    var name,price;
    const productDetailsInDb = Product.findById(id);
    if(req.body.price===''){
      price = productDetailsInDb.price
    }else{
      price = req.body.price;
    }
  
    if(req.body.name===''){
      name = productDetailsInDb.name
    }else{
      name = req.body.name;
    }
    Product.updateOne({ _id: id }, { $set:{price: price,name: name},productImage: req.file.path })
      .then(result => {
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + id
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }

  exports.product_delete = (req, res) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products',
                body: { name: 'String', price: 'Number' }
            }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err.message
        });
      });
  }