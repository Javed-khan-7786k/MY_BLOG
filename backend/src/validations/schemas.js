import Joi from 'joi';

export const addBlogSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Article identifier name is required',
    'string.min': 'Name must be at least 2 characters long',
    'any.required': 'Article identifier name is required',
  }),
  title: Joi.string().trim().min(2).max(200).required().messages({
    'string.empty': 'Article title is required',
    'string.min': 'Title must be at least 2 characters long',
    'any.required': 'Article title is required',
  }),
  author: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Author name is required',
    'string.min': 'Author name must be at least 2 characters long',
    'any.required': 'Author name is required',
  }),
  content: Joi.string().trim().min(5).optional(),
  Blog: Joi.string().trim().min(5).optional(),
}).or('content', 'Blog').messages({
  'object.missing': 'Article content is required',
});

export const updateBlogSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  title: Joi.string().trim().min(2).max(200).required().messages({
    'string.empty': 'Article title is required',
    'any.required': 'Article title is required',
  }),
  author: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Author name is required',
    'any.required': 'Author name is required',
  }),
  content: Joi.string().trim().min(5).optional(),
  Blog: Joi.string().trim().min(5).optional(),
}).or('content', 'Blog').messages({
  'object.missing': 'Article content is required',
});

export const addCommentSchema = Joi.object({
  username: Joi.string().trim().min(1).max(50).default('Anonymous').messages({
    'string.empty': 'Username cannot be empty',
  }),
  text: Joi.string().trim().min(1).max(2000).required().messages({
    'string.empty': 'Comment text is required',
    'any.required': 'Comment text is required',
  }),
});

export const editCommentSchema = Joi.object({
  commentIndex: Joi.number().integer().min(0).required().messages({
    'number.base': 'commentIndex must be a valid number',
    'number.min': 'commentIndex cannot be negative',
    'any.required': 'commentIndex is required',
  }),
  username: Joi.string().trim().min(1).max(50).required().messages({
    'string.empty': 'Username is required',
    'any.required': 'Username is required',
  }),
  text: Joi.string().trim().min(1).max(2000).required().messages({
    'string.empty': 'Comment text is required',
    'any.required': 'Comment text is required',
  }),
});

export const idParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    'string.hex': 'Invalid MongoDB ObjectId format',
    'string.length': 'ObjectId must be 24 characters hex string',
    'any.required': 'ID parameter is required',
  }),
});

export const nameParamSchema = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Article name parameter is required',
    'any.required': 'Article name parameter is required',
  }),
});
