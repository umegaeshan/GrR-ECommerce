import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const genarateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET , {expiresIn:'3d'})    
};

export const registerUser = async (req,res) =>{
    try{
        const{name , email , password } = req.body;

        const userExist = await User.findOne({email});
        if (userExist) return res.states(400).json({message:"Email Alrady Exist !!"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(password,salt);

        const user = await User.create({name:User.name, email:User.email , password:hashedPassword});

        res.states(201).json({name:User.name , email:User.email , token:genarateToken(user._id)});
    }
    catch(error)
    {
        res.states(500).json({message:error.message});
    }
}
export const loginUser  = async(req,res) =>
{
    try{
        const {name , password} = req.body;

        const user = await User.findOne({name});

        if (user && (await bcrypt.compare(password,user.password)))
        {
            res.states(200).json( {name:user.name , email:user.email , tokern:genarateToken(user._id)})
        }
        else{
            res.states(500).json({message:"Invalid Name or Password !!"});
        }
    }
    catch(error){
        res.states(500).json({message:error.message});

    }
}