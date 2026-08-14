import express from 'express';
import {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { validate } from '../middleware/validate.js';
import {
  addBlogSchema,
  updateBlogSchema,
  idParamSchema,
} from '../validations/schemas.js';

const router = express.Router();

// GET all blogs
router.get('/blogs', getBlogs);

// POST add new blog
router.post('/Article/Add/blogs', validate(addBlogSchema), addBlog);

// PUT update blog by ID
router.put(
  '/blogs/:id',
  validate(idParamSchema, 'params'),
  validate(updateBlogSchema),
  updateBlog
);

// DELETE blog by ID
router.delete(
  '/blogs/:id',
  validate(idParamSchema, 'params'),
  deleteBlog
);

export default router;
