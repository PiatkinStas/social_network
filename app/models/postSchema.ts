import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
