const {
  vertifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("./vertifyToken");
const Product = require("../models/Prouduct");
const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedProuduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProuduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update new auction
router.put("/allauction/:id", verifyToken, async (req, res) => {
  try {
    const isBigger = false;
    const product = await Product.findById(req.params.id);
    const price = product.allAuction[product.allAuction.length - 1].price;
    const newPrice = req.body.price;
    if (newPrice < price) {
      res.status(400).json("You must make an offer greater than the original offer");
    }
    else if(newPrice<100 && newPrice-price<5){
      res.status(400).json("You must bid five dollars more than the original bid");
    }
    else if(newPrice>100 && newPrice-price<10){
      res.status(400).json("You must bid ten dollars more than the original bid");
    }
    else
    {const updatedProuduct = await Product.findByIdAndUpdate(req.params.id, {
      $push: {
        allAuction: req.body,
      },
    });
    res.status(200).json(updatedProuduct);}
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL Products

router.get("/", async (req, res) => {
  const qNEW = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNEW) {
      products = await Product.find().sort({ createdAt: -1 });
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/myauction/:user", async (req, res) => {

  try {
      const products = await Product.find({"createdBy": req.params.user});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
