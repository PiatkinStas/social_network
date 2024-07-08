import mongoose, { Schema, Document, Model } from 'mongoose';
import { IUser } from './user_interface';

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String, // Убедитесь, что это свойство определено
    default: '', // Можно установить значение по умолчанию
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
