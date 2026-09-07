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



export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "භාණ්ඩය සාර්ථකව මකා දමන ලදී" });
    } catch (error) {
        res.status(500).json({ message: "භාණ්ඩය මකා දැමීම අසාර්ථකයි" });
    }
};


export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, countInStock } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name;
            product.description = description;
            product.price = price;
            product.image = image;
            product.category = category;
            product.countInStock = countInStock;

            const updatedProduct = await product.save();
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: "භාණ්ඩය සොයාගත නොහැකි විය" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};