import Product from "../models/productModel.js";


export const getProduct = async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
    
}

export const createProduct = async(req,res)=>{
    try{
        const{name,description, price, image, category, countInStock}=req.body;

        const product = await Product.create({
            name,description, price, image, category, countInStock,
        });
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};
