import express from 'express'
import { getProduct , createProduct } from '../controllers/productController.js'
import { protect , admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',getProduct);

router.post('/',protect,admin,createProduct);

export default router;