const { vertifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./vertifyToken");
const cart = require("../models/Prouduct")
const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAuthorization ,async (req,res)=>{
    const newCart = new cart (req.body)
    try{
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err)
    }
})  

//UPDATE
router.put("/:id", verifyTokenAndAdmin , async (req, res) => {
    
    try {
      const updatedCart = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE

  router.delete("/:id", verifyTokenAndAuthorization , async (req, res)=>{
    try{
      await cart.findByIdAndDelete(req.params.id)
      res.status(200).json("Cart has been deleted")
    }catch(err){
      res.status(500).json(err)
    }
  })

  //GET

  router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res)=>{
    try{
      const cart = await Product.findOne({userId: req.params.userId})
      res.status(200).json(cart)
    }catch(err){
      res.status(500).json(err)
    }
  })

  //GET ALL cart

  router.get("/", verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const carts =await cart.find()
      res.status(200).json(carts)
    }catch(err){
      res.status(500).json(err)
    }
  })

module.exports = router;
