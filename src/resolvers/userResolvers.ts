import { User } from '../models/userModel';  // Make sure this path is correct
import bcrypt from 'bcrypt';

// Define resolvers for User mutations
const userResolvers = {
  Mutation: {
    addUser: async (_, { input }) => {
      const { name, email, password } = input;
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      return { id: user.id, name: user.name, email: user.email, __typename: 'User' };
    },
    // Add other user mutation resolvers here (e.g., updateUser, deleteUser)
  },
};

export default userResolvers;