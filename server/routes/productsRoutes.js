const express = require("express")
const router = express.Router()
const { getAllProducts, getProductById, createProduct } = require("../controllers/productsControllers.js")

router.get( "/", getAllProducts );
router.get( "/:id", getProductById );
router.post( "/", createProduct );
module.exports = router;