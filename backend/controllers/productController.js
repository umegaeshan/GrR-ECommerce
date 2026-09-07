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

// 3. තනි භාණ්ඩයක විස්තර ලබා ගැනීම (Get Single Product)
export const getProductById = async (req, res) => {
    try {
        // URL එකෙන් එන ID එක පාවිච්චි කරලා Database එකෙන් භාණ්ඩය හොයනවා
        const product = await Product.findById(req.params.id);
        
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Invalid ID or server error" });
    }
};
