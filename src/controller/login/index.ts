import { Request, Response } from 'express';
require('dotenv').config();
import User, { IUser } from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET:any = process.env.JWT_SECRET;

export const login = async (req: Request, res: Response):Promise<any> => {
    const { email, password } = req.body;
    try {
        const user:any = await User.findOne({email:email}).lean();
        if (!user) return res.status(400).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
       return  res.json({ token });
      
    } catch (error) {
        res.status(400).json({ message: 'Error!', error });
    }
};