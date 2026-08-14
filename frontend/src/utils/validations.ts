import * as Yup from 'yup';

export const articleValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .matches(/^[a-zA-Z0-9_-]+$/, 'Identifier can only contain letters, numbers, hyphens and underscores')
    .required('Article identifier name is required'),
  title: Yup.string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title cannot exceed 200 characters')
    .required('Article title is required'),
  author: Yup.string()
    .trim()
    .min(2, 'Author name must be at least 2 characters')
    .max(100, 'Author name cannot exceed 100 characters')
    .required('Author name is required'),
  content: Yup.string()
    .trim()
    .min(10, 'Article content must be at least 10 characters')
    .required('Article content is required'),
});

export const editArticleValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .required('Article title is required'),
  author: Yup.string()
    .trim()
    .min(2, 'Author name must be at least 2 characters')
    .required('Author name is required'),
  content: Yup.string()
    .trim()
    .min(10, 'Article content must be at least 10 characters')
    .required('Article content is required'),
});

export const commentValidationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(2, 'Username must be at least 2 characters')
    .max(50, 'Username cannot exceed 50 characters')
    .required('Username is required'),
  text: Yup.string()
    .trim()
    .min(2, 'Comment must be at least 2 characters')
    .max(1000, 'Comment cannot exceed 1000 characters')
    .required('Comment text cannot be empty'),
});
