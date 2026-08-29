import mongoose from 'mongoose'

const orderShema = new mongoose.Schema(
    {
        user:{type:mongoose.Schema.Types.ObjectId, ref:'User' ,required:true},
        orderItems:[
            {
                name:{type:String , required:true},
                qnt:{type:Number , required:true},
                prices:{type:Number , required:true},
                product:{ type:mongoose.Schema.ObjectId, ref:'Product' , required:true},
            }
        ],
        totalPrices:{type:Number , required:true , default:0.0},
        isPaid:{type:Boolean , required:true , default:false},
        isDelivered:{type:Boolean ,  required:true , default:false}
    },
    {
        timestamps:true
    }
);

export default mongoose.model('Order', orderShema);