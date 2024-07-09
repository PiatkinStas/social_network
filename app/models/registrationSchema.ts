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
  about_user: {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    birthYear: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
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
