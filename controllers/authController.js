import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }
        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password does not match'
            })
        }
        user = new User({ name, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log(user, 'this is user');
        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
        );

        return res.status(201).json({
            token,
            success: true,
            message: 'User created Successfully',
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error
        })
    }
}

const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
    
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token,success: true, message: 'Logged in Succesfully' });
    }catch(error){
        console.log(error);
        console.error(error.message);
        return res.status(500).json({success: false, message: error});
    }
}

export {
    createUser,
    loginUser
}