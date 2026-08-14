import express from 'express';
import {
  getArticleByName,
  getAllArticlesContent,
  upvoteArticle,
  downvoteArticle,
  addComment,
  deleteComment,
  editComment,
} from '../controllers/articleController.js';
import { validate } from '../middleware/validate.js';
import {
  addCommentSchema,
  editCommentSchema,
  nameParamSchema,
} from '../validations/schemas.js';

const router = express.Router();

// GET raw content articles list
router.get('/articles', getAllArticlesContent);

// GET single article metadata
router.get('/articles/:name', validate(nameParamSchema, 'params'), getArticleByName);

// POST upvote article
router.post('/articles/:name/upvote', validate(nameParamSchema, 'params'), upvoteArticle);

// POST downvote article
router.post('/articles/:name/downvote', validate(nameParamSchema, 'params'), downvoteArticle);

// POST add comment to article
router.post(
  '/articles/:name/add-comment',
  validate(nameParamSchema, 'params'),
  validate(addCommentSchema),
  addComment
);

// DELETE comment
router.delete('/articles/:name/Delete/:username/:msg', deleteComment);

// PUT edit comment
router.put(
  '/articles/:name/edit-comment',
  validate(nameParamSchema, 'params'),
  validate(editCommentSchema),
  editComment
);

export default router;
