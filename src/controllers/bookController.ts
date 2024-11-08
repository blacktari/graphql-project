import { Request, Response } from 'express';
import { BookModel } from '../models/bookModel'; // Ensure this import is correct
import { UserModel } from '../models/userModel'; // Add this import for UserModel
import { BOOK_ALREADY_EXISTS, BOOK_CREATION_ERROR } from '../constants/errorMessages';
import { Book } from '../types/graphqlTypes';

export const createBook = async (req: Request, res: Response) => {
  try {
    const { name, title, userId } = req.body;

    // Check if the user exists
    const userExists = await UserModel.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check for existing book by name and title
    const existingBook = await BookModel.findOne({ name, title, userId });
    if (existingBook) {
      return res.status(400).json({ message: BOOK_ALREADY_EXISTS });
    }

    // Create new book
    const newBook = new BookModel({ name, title, userId });
    await newBook.save();

    return res.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: BOOK_CREATION_ERROR });
  }
};