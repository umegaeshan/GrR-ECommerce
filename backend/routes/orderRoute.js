import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// සාමාන්‍ය කෙනෙකුට Order එකක් දාන්න (ලොගින් වෙලා හිටියම ඇති)
router.post('/', protect, createOrder);

// Admin ට ඔක්කොම Orders බලාගන්න (ලොගින් වෙලා, Admin කෙනෙකුත් වෙන්න ඕනේ)
router.get('/', protect, admin, getOrders);

export default router;