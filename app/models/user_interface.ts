import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  hash_password: string;
  about_user: {
    firstName: string;
    lastName: string;
    birthYear: string;
    country: string;
    city: string;
  };
  createdAt?: Date;
  avatarUrl?: string;
  _id: Types.ObjectId;
  // другие свойства, если они будут добавлены в будущем
}
