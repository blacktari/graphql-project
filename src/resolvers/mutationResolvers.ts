import { User } from '../models/userModel';  // Import your User model (assuming you are using Mongoose)
import bcrypt from 'bcrypt';

// Define types for input to resolve TypeScript 'any' issues
interface UserInput {
  name: string;
  email: string;
  password: string;
}

const resolvers = {
  Mutation: {
    addUser: async (_: any, { input }: { input: UserInput }) => {
      const { name, email, password } = input;

      // Validation
      if (!email || !password || !name) {
        throw new Error("All fields are required");
      }

      // Hash password before saving (bcrypt for password security)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user object with the hashed password
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await user.save();

      // Return the new user details (for GraphQL response)
      return {
        id: user.id,  // Ensure that the user has an 'id' field
        name: user.name,
        email: user.email,
        __typename: 'User',  // Returning typename for consistency in GraphQL
      };
    },
  },
};

export default resolvers;