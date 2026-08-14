import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { commentValidationSchema } from '../utils/validations';
import { API_BASE_URL } from '../config/api';
import { BiSend, BiErrorCircle } from 'react-icons/bi';

interface AddCommentProps {
  onAddComment: (article: any) => void;
}

const AddComment = ({ onAddComment }: AddCommentProps) => {
  const { name: articleName } = useParams<{ name: string }>();
  const [serverError, setServerError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      text: '',
    },
    validationSchema: commentValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setServerError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/articles/${articleName}/add-comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.username.trim(),
            text: values.text.trim(),
          }),
        });

        const updatedArticle = await response.json();
        if (!response.ok) {
          throw new Error(updatedArticle.message || 'Failed to post comment');
        }

        onAddComment(updatedArticle);
        resetForm();
      } catch (err: any) {
        setServerError(err.message || 'Failed to add comment');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm mt-8">
      <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center space-x-2">
        <span>Leave a Comment</span>
      </h3>

      {serverError && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium flex items-center space-x-2">
          <BiErrorCircle className="text-base flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            Name
          </label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Your name"
            className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-slate-50 outline-none transition-all ${
              formik.touched.username && formik.errors.username
                ? 'border-red-500 ring-1 ring-red-200'
                : 'border-slate-200 focus:border-indigo-500 focus:bg-white'
            }`}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="mt-1 text-xs text-red-600 font-medium">{formik.errors.username}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
            Comment
          </label>
          <textarea
            name="text"
            rows={3}
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Share your perspective..."
            className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-slate-50 outline-none transition-all resize-none ${
              formik.touched.text && formik.errors.text
                ? 'border-red-500 ring-1 ring-red-200'
                : 'border-slate-200 focus:border-indigo-500 focus:bg-white'
            }`}
          />
          {formik.touched.text && formik.errors.text && (
            <p className="mt-1 text-xs text-red-600 font-medium">{formik.errors.text}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className="inline-flex items-center space-x-2 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50"
        >
          <BiSend />
          <span>{formik.isSubmitting ? 'Submitting...' : 'Post Comment'}</span>
        </button>
      </form>
    </div>
  );
};

export default AddComment;
