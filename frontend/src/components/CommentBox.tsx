import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { commentValidationSchema } from '../utils/validations';
import { BiSolidCommentDots, BiX, BiSend, BiErrorCircle } from 'react-icons/bi';
import { API_BASE_URL } from '../config/api';

interface CommentBoxProps {
  onAddComment: (article: any) => void;
  setArticleInfo?: (info: any) => void;
}

const CommentBox = ({ onAddComment, setArticleInfo }: CommentBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { name: articleName } = useParams<{ name: string }>();

  const toggleDialog = () => {
    setIsOpen(!isOpen);
    setServerError(null);
  };

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
        if (setArticleInfo) {
          setArticleInfo(updatedArticle);
        }

        resetForm();
        setIsOpen(false);
      } catch (err: any) {
        setServerError(err.message || 'Failed to submit comment');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={toggleDialog}
        type="button"
        className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 border border-slate-200 transition-all duration-200"
        title="Add a comment"
      >
        <BiSolidCommentDots className="text-sm text-indigo-500" />
        <span>Comment</span>
      </button>

      {/* Modal Dialog Backdrop */}
      {isOpen && (
        <div
          onClick={toggleDialog}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 transform transition-all scale-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <BiSolidCommentDots className="text-indigo-600 text-xl" />
                <span>Join the Discussion</span>
              </h3>
              <button
                onClick={toggleDialog}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <BiX className="text-xl" />
              </button>
            </div>

            {/* Error Banner */}
            {serverError && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium flex items-center space-x-2">
                <BiErrorCircle className="text-base flex-shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Formik Form */}
            <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="e.g. Alex"
                  className={`w-full text-sm px-3 py-2 rounded-xl border bg-slate-50 outline-none transition-all ${
                    formik.touched.username && formik.errors.username
                      ? 'border-red-500 ring-1 ring-red-200'
                      : 'border-slate-200 focus:border-indigo-500 focus:bg-white'
                  }`}
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{formik.errors.username}</p>
                )}
              </div>

              {/* Comment Text Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Comment Message
                </label>
                <textarea
                  name="text"
                  rows={4}
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Write your insightful thoughts or feedback..."
                  className={`w-full text-sm px-3 py-2 rounded-xl border bg-slate-50 outline-none transition-all resize-none ${
                    formik.touched.text && formik.errors.text
                      ? 'border-red-500 ring-1 ring-red-200'
                      : 'border-slate-200 focus:border-indigo-500 focus:bg-white'
                  }`}
                />
                {formik.touched.text && formik.errors.text && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{formik.errors.text}</p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={toggleDialog}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formik.isSubmitting || !formik.isValid}
                  className="inline-flex items-center space-x-1.5 px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  <BiSend />
                  <span>{formik.isSubmitting ? 'Posting...' : 'Post Comment'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentBox;