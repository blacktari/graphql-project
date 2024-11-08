import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  name: String,
  title: String,
  userId: mongoose.Schema.Types.ObjectId,
});

export const BookModel = mongoose.model('Book', bookSchema);
