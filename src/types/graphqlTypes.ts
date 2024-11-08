export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface Book {
  id: string;
  name: string;
  title: string;
  userId: string;
}

export interface UserInput {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface BookInput {
  name: string;
  title: string;
  userId: string;
}