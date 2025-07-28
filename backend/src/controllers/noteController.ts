import { Response } from 'express';
import { Note } from '../models/Note';
import { AuthRequest } from '../middleware/authMiddleware'; // Import our custom request type

export const getNotes = async (req: AuthRequest, res: Response) => {
    try {
        const notes = await Note.find({ userId: req.userId });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const createNote = async (req: AuthRequest, res: Response) => {
    const { title, content } = req.body;
    const newNote = new Note({ title, content, userId: req.userId });
    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};