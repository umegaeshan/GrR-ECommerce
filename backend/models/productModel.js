import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true }, // ප්‍රධාන පින්තූරය
    images: [{ type: String }], // අමතර පින්තූර 3 ක් සදහා Array එකක්
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);