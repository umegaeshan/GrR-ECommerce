import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

// Token එක හදන Function එක
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET , { expiresIn: '3d' })    
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async(req,res)=>{
    try{
        const {token} = req.body;

        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:process.env.GOOGLE_CLIENT_ID,
        });

        const {name , email }= ticket.getPayload();

        let user = await User.findOne({email});

       if(!user)
        {
            const generatedPassword = Math.random().toString(36).slice(-8);
            const salt = await bcrypt.genSalt(10); // getSalt වෙනුවට genSalt විය යුතුයි
            const hashedPassword = await bcrypt.hash(generatedPassword,salt);

            user = await User.create({name,email,password:hashedPassword});
        }

        res.status(200).json({
            name:user.name, 
            email:user.email, 
            isAdmin: user.isAdmin, // <--- මේ පේළිය අලුතින් දැම්මා
            token:generateToken(user._id)
        });

    }
    catch(error){
        res.status(500).json({message:"Google Authentication Failed !!!"})
    }
};




export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Email එක කලින් තියෙනවද බැලීම
        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: "Email Already Exists !!" });

        // Password එක Hash කිරීම
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // අලුත් User ව Database එකේ Save කිරීම (මෙතනයි වෙනස වුණේ)
        const user = await User.create({ name, email, password: hashedPassword });

        // සාර්ථකව Save වුණාම Data ටික යැවීම
        res.status(201).json({ name: user.name, email: user.email, token: generateToken(user._id) });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        // නමෙන් (name) User ව හොයනවා
        const user = await User.findOne({ name });

        // User ඉන්නවා නම් සහ Password එක හරි නම්
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({ 
                name: user.name, 
                email: user.email, 
                isAdmin: user.isAdmin, // <--- මේ පේළිය අලුතින් දැම්මා
                token: generateToken(user._id) 
            });
        } else {
            // වැරදි නම් 400 error එකක් දෙනවා
            res.status(400).json({ message: "Invalid Name or Password !!" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = req.body.isAdmin; // Admin බලතල දීම හෝ ඉවත් කිරීම

            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "පරිශීලකයා සොයාගත නොහැකි විය" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};