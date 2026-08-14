import Article from '../models/Article.js';
import Blog from '../models/Blog.js';

// Get metadata for single article
export const getArticleByName = async (req, res, next) => {
  try {
    const articleName = req.params.name;
    let articleInfo = await Article.findOne({ name: articleName });

    if (!articleInfo) {
      // Auto-create article metadata record if missing
      articleInfo = await Article.create({ name: articleName, upvotes: 0, comments: [] });
    }

    res.status(200).json(articleInfo);
  } catch (error) {
    next(error);
  }
};

// Get all articles content
export const getAllArticlesContent = async (req, res, next) => {
  try {
    const articleContent = await Blog.find({});
    res.status(200).json(articleContent);
  } catch (error) {
    next(error);
  }
};

// Upvote article
export const upvoteArticle = async (req, res, next) => {
  try {
    const articleName = req.params.name;

    const updatedArticle = await Article.findOneAndUpdate(
      { name: articleName },
      { $inc: { upvotes: 1 } },
      { returnDocument: 'after', upsert: true }
    );

    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

// Downvote article
export const downvoteArticle = async (req, res, next) => {
  try {
    const articleName = req.params.name;

    const article = await Article.findOne({ name: articleName });
    const currentUpvotes = article?.upvotes || 0;
    const newUpvotes = Math.max(0, currentUpvotes - 1);

    const updatedArticle = await Article.findOneAndUpdate(
      { name: articleName },
      { $set: { upvotes: newUpvotes } },
      { returnDocument: 'after', upsert: true }
    );

    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

// Add comment to article
export const addComment = async (req, res, next) => {
  try {
    const { username, text } = req.body;
    const articleName = req.params.name;

    const newComment = {
      username: username || 'Anonymous',
      text,
      createdAt: new Date(),
    };

    const updatedArticle = await Article.findOneAndUpdate(
      { name: articleName },
      { $push: { comments: newComment } },
      { returnDocument: 'after', upsert: true, runValidators: true }
    );

    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

// Delete comment by username and message content
export const deleteComment = async (req, res, next) => {
  try {
    const { name: articleName, username, msg: userMsg } = req.params;
    const decodedUsername = decodeURIComponent(username);
    const decodedMsg = decodeURIComponent(userMsg);

    const updatedArticle = await Article.findOneAndUpdate(
      { name: articleName },
      {
        $pull: {
          comments: {
            username: decodedUsername,
            text: decodedMsg,
          },
        },
      },
      { returnDocument: 'after' }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({
      message: 'Comment deleted successfully',
      article: updatedArticle,
    });
  } catch (error) {
    next(error);
  }
};

// Edit comment by index
export const editComment = async (req, res, next) => {
  try {
    const { commentIndex, username, text } = req.body;
    const articleName = req.params.name;

    const article = await Article.findOne({ name: articleName });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (!article.comments || article.comments[commentIndex] === undefined) {
      return res.status(400).json({ message: 'Invalid comment index' });
    }

    article.comments[commentIndex].username = username;
    article.comments[commentIndex].text = text;

    await article.save();

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};
