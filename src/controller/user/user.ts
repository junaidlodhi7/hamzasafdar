import { Request, Response } from 'express';
import User, { IUser } from '../../models/User';
import bcrypt from 'bcryptjs';
import removePasswordField from '../../utils/userUtility';  

// Create a new user
export const createUser = async (req: Request, res: Response):Promise<any> => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({email:email}).lean();
    if(user){
       return res.status(202).json({ message: 'Email already exist' });
    }
    const newUser = new User({
        email,
        password: hashedPassword,
    });

    try {
        let user = await newUser.save();
        const userWithoutPassword:any = user.toObject(); // Convert the Mongoose object to a plain JS object
        res.status(201).json({ message: 'User created successfully',user:removePasswordField(user) });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response):Promise<any> => {
    try {
        const users = await User.find().lean();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response):Promise<any> => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { email, password: hashedPassword },
            { new: true }
        );

        if (user) {
            res.status(200).json({ message: 'User updated successfully', user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
