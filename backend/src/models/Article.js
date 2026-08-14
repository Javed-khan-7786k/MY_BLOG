import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Comment username is required'],
      trim: true,
      default: 'Anonymous',
    },
    text: {
      type: String,
      required: [true, 'Comment text content is required'],
      trim: true,
      minlength: [1, 'Comment text cannot be empty'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const articleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Article identifier name is required'],
      unique: true,
      trim: true,
    },
    upvotes: {
      type: Number,
      default: 0,
      min: [0, 'Upvotes cannot be negative'],
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
    collection: 'articles',
  }
);

const Article = mongoose.model('Article', articleSchema);

export default Article;
