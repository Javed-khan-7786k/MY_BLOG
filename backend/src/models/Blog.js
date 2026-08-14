import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Blog name is required'],
      trim: true,
      minlength: [2, 'Blog name must be at least 2 characters'],
    },
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      minlength: [2, 'Blog title must be at least 2 characters'],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      minlength: [2, 'Author name must be at least 2 characters'],
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
      minlength: [5, 'Blog content must be at least 5 characters'],
    },
  },
  {
    timestamps: true,
    collection: 'blogs_Content',
  }
);

// Virtual field for backwards compatibility if needed
blogSchema.virtual('Blog').get(function () {
  return this.content;
}).set(function (v) {
  this.content = v;
});

blogSchema.set('toJSON', { virtuals: true });
blogSchema.set('toObject', { virtuals: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
