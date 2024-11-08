import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const userValidation = [
  body('email').isEmail().withMessage('Please provide a valid email address.'),
  body('phone').isLength({ min: 10 }).withMessage('Please provide a valid phone number.'),
  body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
  body('role').isIn(['user', 'admin']).withMessage('Role must be either "user" or "admin".'),
];

export const bookValidation = [
  body('name').isLength({ min: 3 }).withMessage('Book name must be at least 3 characters long.'),
  body('title').isLength({ min: 3 }).withMessage('Book title must be at least 3 characters long.'),
  body('userId').isMongoId().withMessage('Invalid user ID provided.'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};