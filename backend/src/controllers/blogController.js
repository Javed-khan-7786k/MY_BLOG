import Blog from '../models/Blog.js';
import Article from '../models/Article.js';

// Get all blogs
export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

// Add new blog
export const addBlog = async (req, res, next) => {
  try {
    const { name, title, author, content, Blog: blogContent } = req.body;
    const finalContent = content || blogContent;

    const newBlog = await Blog.create({
      name,
      title,
      author,
      content: finalContent,
    });

    // Ensure corresponding article metadata doc exists in articles collection
    await Article.findOneAndUpdate(
      { name },
      { $setOnInsert: { name, upvotes: 0, comments: [] } },
      { upsert: true, returnDocument: 'after' }
    );

    res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
};

// Update blog document
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, title, author, content, Blog: blogContent } = req.body;
    const finalContent = content || blogContent;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        title,
        author,
        content: finalContent,
      },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog target not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

// Delete blog document
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const targetBlog = await Blog.findById(id);
    if (!targetBlog) {
      return res.status(404).json({ message: 'Target blog document could not be found' });
    }

    await Blog.findByIdAndDelete(id);
    await Article.deleteOne({ name: targetBlog.name });

    res.status(200).json({
      message: 'Successfully removed from both content and metadata database collections.',
      deletedName: targetBlog.name,
      deletedId: id,
    });
  } catch (error) {
    next(error);
  }
};
