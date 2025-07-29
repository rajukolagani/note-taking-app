import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(201).json({ result: newUser, token });
  } catch (error) {
    // --- ADDED THIS LINE ---
    console.error("Error during registration:", error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Ensure JWT_SECRET is available and not undefined before using it
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    // --- ADDED THIS LINE ---
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};