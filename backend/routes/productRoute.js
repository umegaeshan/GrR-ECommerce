import express from 'express'
import { getProduct , createProduct ,getProductById , deleteProduct ,updateProduct} from '../controllers/productController.js'
import { protect , admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/',getProduct);
router.get('/:id',getProductById);

router.post('/',protect,admin,createProduct);

router.delete('/:id', protect, admin, deleteProduct);

router.put('/:id', protect, admin, updateProduct);

export default router;