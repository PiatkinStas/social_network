import mongoose from 'mongoose';
console.log('MONGODB_URI from .env.local:', process.env.MONGODB_URI);
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: MongooseCache;
    }
  }
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseCache;
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

let cached = globalWithMongoose.mongoose;

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

const checkConnection = () => {
  const state = mongoose.connection.readyState;
  switch (state) {
    case 0:
      console.log('Mongoose connection state: disconnected');
      break;
    case 1:
      console.log('Mongoose connection state: connected');
      break;
    case 2:
      console.log('Mongoose connection state: connecting');
      break;
    case 3:
      console.log('Mongoose connection state: disconnecting');
      break;
    default:
      console.log('Mongoose connection state: unknown');
      break;
  }
};

export { connectDB, checkConnection };
