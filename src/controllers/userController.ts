import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { USER_ALREADY_EXISTS, USER_CREATION_ERROR } from '../constants/errorMessages';
import { User } from '../types/graphqlTypes';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role } = req.body;

    // Check for existing user by email or phone
    const existingUser = await UserModel.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      const duplicateField = existingUser.email === email ? 'Email' : 'Phone';
      return res.status(400).json({ message: USER_ALREADY_EXISTS(duplicateField) });
    }

    // Create new user
    const newUser = new UserModel({ name, email, phone, role });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: USER_CREATION_ERROR });
  }
};
