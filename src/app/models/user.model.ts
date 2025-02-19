// src/app/models/user.model.ts
export interface User {
  id: number;
  username: string;
  password_hash: string;
  role: string;  // Can be 'user', 'doctor', or 'admin'
  specialization?: string;  // Only applies to doctors
  email: string;
  age: number;
  drugs: Drug[];  // Array of drugs associated with the user
}

export interface Drug {
  id: number;
  name: string;
  prescription: boolean;
  stock: number;
  info: string;
  price: number;
}
