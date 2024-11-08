import { Book } from '../models/bookModel';  // Ensure correct path to Book model

const bookResolvers = {
  Mutation: {
    addBook: async (_, { input }) => {
      const { title, authorId } = input;
      if (!title || !authorId) {
        throw new Error('Title and author are required');
      }
      const book = new Book({ title, authorId });
      await book.save();
      return { id: book.id, title: book.title, authorId: book.authorId, __typename: 'Book' };
    },
    // Add other book mutation resolvers here (e.g., updateBook, deleteBook)
  },
};

export default bookResolvers;