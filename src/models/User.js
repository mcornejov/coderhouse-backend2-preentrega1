import mongoose from 'mongoose';

// Modelo base de usuario. Campos mínimos para el registro y la autenticación
// que se implementarán en las próximas entregas (bcrypt, JWT, roles).
const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 0 },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
