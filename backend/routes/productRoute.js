import express from 'express'
import { getProduct , createProduct ,getProductById } from '../controllers/productController.js'
import { protect , admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',getProduct);
router.get('/:id',getProductById);

router.post('/',protect,admin,createProduct);

export default router;