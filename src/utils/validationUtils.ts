import { UserModel } from '../models/userModel';
import { BookModel } from '../models/bookModel';

// Utility to check if the user exists by email or phone
export const checkUserExistence = async (email: string, phone: string) => {
  return await UserModel.findOne({
    $or: [{ email }, { phone }]
  });
};

// Utility to check if the book exists by name, title, and userId
export const checkBookExistence = async (name: string, title: string, userId: string) => {
  return await BookModel.findOne({
    name,
    title,
    userId
  });
};