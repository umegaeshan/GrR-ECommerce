import express from 'express'
import { registerUser,loginUser, googleAuth , getUsers ,updateUser ,deleteUser} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',registerUser);

router.post('/login',loginUser);

router.post('/google', googleAuth);

router.get('/', protect, admin, getUsers);

router.put('/:id', protect, admin, updateUser);

router.delete('/:id', protect, admin, deleteUser);

export default router;

