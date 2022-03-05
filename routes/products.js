const express=require('express')
const router = express.Router()

const {getAllProducts,getAllStaticProducts}=require("../controllers/products")
router.route('/').get(getAllProducts)
router.route('/static').get(getAllStaticProducts)
module.exports=router