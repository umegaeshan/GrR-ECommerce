import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users',userRoute);
app.use('/api/products', productRoute);

app.get('/',(req,res) =>{
    res.send("GrR E-Commerce API is running...")
});

const PORT = process.env.PORT || 5000;

app.listen (PORT , ()=>{
    console.log(`Database Running on ${PORT}`);
});