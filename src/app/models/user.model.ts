// src/app/models/user.model.ts
export interface User {
  id: number;
  username: string;
  password_hash: string;
  role: string;  // Can be 'user', 'doctor', or 'admin'
  specialization?: string;  // Only applies to doctors
  age: number;
}
