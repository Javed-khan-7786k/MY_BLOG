import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { editArticleValidationSchema } from '../utils/validations';
import { BiLike, BiCommentDetail, BiEdit, BiTrash, BiCheck, BiX, BiUser, BiBookOpen } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

interface ArticleItem {
  _id: string;
  name: string;
  title: string;
  author: string;
  content: string;
}

interface CardProps {
  article: ArticleItem;
  onArticleDeleted?: (deletedId: string) => void;
}

const fetchMetadata = async (name: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/articles/${name}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Error loading metadata:', error);
    return null;
  }
};

export const Card = ({ article, onArticleDeleted }: CardProps) => {
  const [metadata, setMetadata] = useState<{ upvotes?: number; comments?: any[] } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const getMetadata = async () => {
      if (article?.name) {
        const data = await fetchMetadata(article.name);
        if (isMounted && data) setMetadata(data);
      }
    };
    getMetadata();
    return () => {
      isMounted = false;
    };
  }, [article.name]);

  // Formik for Inline Article Editing
  const formik = useFormik({
    initialValues: {
      title: article.title || '',
      author: article.author || '',
      content: article.content || '',
    },
    validationSchema: editArticleValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError(null);
      const updatedPayload = {
        name: article.name,
        title: values.title.trim(),
        author: values.author.trim(),
        Blog: values.content.trim(),
      };

      try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/${article._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPayload),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to update article');
        }

        article.title = data.title;
        article.author = data.author;
        article.content = data.content || data.Blog;
        setIsEditing(false);
      } catch (err: any) {
        setServerError(err.message || 'Update failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!window.confirm(`Are you sure you want to delete "${article.title}"?`)) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${article._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        if (onArticleDeleted) onArticleDeleted(article._id);
      } else {
        alert('Failed to delete article');
      }
    } catch (err) {
      console.error('Deletion error:', err);
    }
  };

  // Editing State UI Formik Form
  if (isEditing) {
    return (
      <div className="w-full bg-white rounded-2xl border border-indigo-200 p-5 shadow-lg my-3 space-y-4 animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center space-x-1.5">
            <BiEdit className="text-base" />
            <span>Edit Article Details</span>
          </h4>
          <button
            onClick={() => setIsEditing(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <BiX className="text-xl" />
          </button>
        </div>

        {serverError && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg">{serverError}</div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full text-xs p-2.5 border rounded-xl outline-none bg-slate-50 ${
                formik.touched.title && formik.errors.title ? 'border-red-500' : 'focus:border-indigo-500 focus:bg-white'
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-[11px] text-red-600 font-medium">{formik.errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full text-xs p-2.5 border rounded-xl outline-none bg-slate-50 ${
                formik.touched.author && formik.errors.author ? 'border-red-500' : 'focus:border-indigo-500 focus:bg-white'
              }`}
            />
            {formik.touched.author && formik.errors.author && (
              <p className="mt-1 text-[11px] text-red-600 font-medium">{formik.errors.author}</p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Content</label>
            <textarea
              name="content"
              rows={4}
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full text-xs p-2.5 border rounded-xl outline-none bg-slate-50 resize-y ${
                formik.touched.content && formik.errors.content ? 'border-red-500' : 'focus:border-indigo-500 focus:bg-white'
              }`}
            />
            {formik.touched.content && formik.errors.content && (
              <p className="mt-1 text-[11px] text-red-600 font-medium">{formik.errors.content}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              className="inline-flex items-center space-x-1 px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm active:scale-95 transition-all disabled:opacity-50"
            >
              <BiCheck />
              <span>Save</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Default Card View
  return (
    <div className="group relative flex my-3 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200 w-full">
      {/* Top Header Badge & Actions */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 font-mono">
          <BiBookOpen className="text-xs" />
          <span>{article.name}</span>
        </span>

        <div className="flex items-center space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            title="Edit Article"
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <BiEdit className="text-lg" />
          </button>
          <button
            onClick={handleDelete}
            title="Delete Article"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <BiTrash className="text-lg" />
          </button>
        </div>
      </div>

      {/* Main Content Link */}
      <Link to={`/article/${article.name}`} className="block focus:outline-none group-hover:cursor-pointer">
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug tracking-tight group-hover:text-indigo-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-xs leading-relaxed text-slate-600 font-normal line-clamp-3 mb-4">
          {article.content}
        </p>
      </Link>

      {/* Footer Meta Row */}
      <div className="mt-auto border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-1.5">
          <div className="h-6 w-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[10px] uppercase">
            {article.author?.charAt(0) || <BiUser />}
          </div>
          <span className="font-semibold text-slate-700">{article.author}</span>
        </div>

        <div className="flex items-center space-x-3 text-slate-500 font-medium text-xs">
          <div className="flex items-center space-x-1" title="Upvotes">
            <BiLike className="text-indigo-500 text-sm" />
            <span>{metadata?.upvotes || 0}</span>
          </div>
          <div className="flex items-center space-x-1" title="Comments">
            <BiCommentDetail className="text-indigo-500 text-sm" />
            <span>{metadata?.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};