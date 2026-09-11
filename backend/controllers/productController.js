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

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, images, category, countInStock } = req.body;

        const product = await Product.create({
            user: req.user._id,
            name,
            description,
            price,
            image,
            images: images || [], // අමතර පින්තූර ටික
            category,
            countInStock
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
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

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete product" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, image, images, category, countInStock } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name;
            product.description = description;
            product.price = price;
            product.image = image;
            product.images = images || []; // අමතර පින්තූර යාවත්කාලීන කිරීම
            product.category = category;
            product.countInStock = countInStock;

            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};