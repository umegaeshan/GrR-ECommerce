import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

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
            const salt = await bcrypt.genSalt(10); 
            const hashedPassword = await bcrypt.hash(generatedPassword,salt);

            user = await User.create({name,email,password:hashedPassword});
        }

        res.status(200).json({
            _id: user._id,
            name:user.name, 
            email:user.email, 
            isAdmin: user.isAdmin, 
            token:generateToken(user._id)
        });

    }
    catch(error){
        console.error("Google Auth Backend Error:", error); 
        res.status(500).json({message:"Google Authentication Failed !!!"})
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // නමෙන් (name) කලින් කෙනෙක් ඉන්නවද කියලා අලුතින් පරීක්ෂා කිරීම අත්‍යවශ්‍යයි!
        const userExistsByName = await User.findOne({ name });
        if (userExistsByName) return res.status(400).json({ message: "Username already taken!!" });

        const userExistByEmail = await User.findOne({ email });
        if (userExistByEmail) return res.status(400).json({ message: "Email Already Exists !!" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ 
            _id: user._id,
            name: user.name, 
            email: user.email, 
            token: generateToken(user._id) 
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// සාමාන්‍ය Login වීම
export const loginUser = async (req, res) => {
    try {
        // 🔴 වෙනස 1: Frontend එකෙන් එන name සහ password ලබා ගැනීම
        const { name, password } = req.body;

        // 🔴 වෙනස 2: Database එකෙන් Email එක වෙනුවට Name එක හරහා සෙවීම
        const user = await User.findOne({ name });

        // User ඉන්නවා නම් සහ Password එක හරි නම්
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({ 
                _id: user._id,
                name: user.name, 
                email: user.email, 
                isAdmin: user.isAdmin,
                token: generateToken(user._id) 
            });
        } else {
            // වැරදි නම් 400 error එකක් දෙනවා
            res.status(400).json({ message: "Invalid Username or Password !!" });
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
            user.isAdmin = req.body.isAdmin;

            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "User deletion failed" });
    }
};