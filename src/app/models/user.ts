export class User {
  user_id: string; // Coincide con el campo user_id en Node.js
  username: string; // Coincide con el campo username en Node.js
  email: string; // Coincide con el campo email en Node.js
  password_hash: string; // Coincide con el campo password_hash en Node.js
  user_role: string; // Coincide con el campo user_role en Node.js
  created_at: Date; // Coincide con el campo created_at en Node.js
  updated_at: Date; // Coincide con el campo updated_at en Node.js

  constructor(
    user_id: string,
    username: string,
    email: string,
    password_hash: string,
    user_role: string, // New field for user role
    created_at: Date,
    updated_at: Date
  ) {
    this.user_id = user_id;
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
    this.user_role = user_role; // Assign the user role
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
