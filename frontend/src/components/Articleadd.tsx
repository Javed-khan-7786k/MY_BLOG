import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { articleValidationSchema } from '../utils/validations';
import { API_BASE_URL } from '../config/api';
import { BiCheckCircle, BiErrorCircle, BiPen, BiUser, BiBook, BiAlignLeft, BiSend } from 'react-icons/bi';

const ArticleAdd = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
      author: '',
      content: '',
    },
    validationSchema: articleValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setServerError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/Article/Add/blogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || (data.errors ? data.errors[0]?.message : 'Failed to publish article'));
        }

        setShowSuccessModal(true);
        resetForm();
      } catch (err: any) {
        setServerError(err.message || 'An error occurred while creating the article');
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Auto-generate article identifier slug from title if name field hasn't been manually edited
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (!formik.touched.name || !formik.values.name) {
      const generatedSlug = e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      formik.setFieldValue('name', generatedSlug, true);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/article-list');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-indigo-50/30 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Header Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 mb-3 border border-indigo-200/60">
            <BiPen className="text-sm" />
            <span>Content Studio</span>
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Publish New Article
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
            Fill out the Formik-validated fields below to share your story with the developer community.
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start space-x-3 shadow-xs">
            <BiErrorCircle className="text-xl flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Publication Failed</p>
              <p>{serverError}</p>
            </div>
          </div>
        )}

        {/* Main Formik Form Container */}
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-xl p-6 sm:p-8 space-y-6"
        >
          {/* Article Title */}
          <div>
            <label htmlFor="title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <BiBook className="text-base text-indigo-600" />
              <span>Article Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={handleTitleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. Master Clean Architecture in Express & Node"
              className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50/50 transition-all outline-none ${
                formik.touched.title && formik.errors.title
                  ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                  : formik.touched.title && !formik.errors.title
                  ? 'border-emerald-500 ring-1 ring-emerald-100'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white'
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center space-x-1">
                <BiErrorCircle className="text-sm" />
                <span>{formik.errors.title}</span>
              </p>
            )}
          </div>

          {/* Article Identifier Name (Slug) */}
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <BiPen className="text-base text-indigo-600" />
                <span>URL Slug / Unique Identifier</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal normal-case">Unique article handle</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. learn-express-mongoose"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50/50 transition-all outline-none font-mono text-xs ${
                  formik.touched.name && formik.errors.name
                    ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                    : formik.touched.name && !formik.errors.name
                    ? 'border-emerald-500 ring-1 ring-emerald-100'
                    : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white'
                }`}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center space-x-1">
                <BiErrorCircle className="text-sm" />
                <span>{formik.errors.name}</span>
              </p>
            )}
          </div>

          {/* Author Name */}
          <div>
            <label htmlFor="author" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
              <BiUser className="text-base text-indigo-600" />
              <span>Author Name</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="e.g. Jane Doe"
              className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50/50 transition-all outline-none ${
                formik.touched.author && formik.errors.author
                  ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                  : formik.touched.author && !formik.errors.author
                  ? 'border-emerald-500 ring-1 ring-emerald-100'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white'
              }`}
            />
            {formik.touched.author && formik.errors.author && (
              <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center space-x-1">
                <BiErrorCircle className="text-sm" />
                <span>{formik.errors.author}</span>
              </p>
            )}
          </div>

          {/* Article Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="content" className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                <BiAlignLeft className="text-base text-indigo-600" />
                <span>Article Body Content</span>
              </label>
              <span className="text-[11px] font-medium text-slate-400">
                {formik.values.content.length} characters
              </span>
            </div>
            <textarea
              id="content"
              name="content"
              rows={8}
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Write your comprehensive article post content here..."
              className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-50/50 transition-all outline-none resize-y ${
                formik.touched.content && formik.errors.content
                  ? 'border-red-500 ring-2 ring-red-100 bg-red-50/20'
                  : formik.touched.content && !formik.errors.content
                  ? 'border-emerald-500 ring-1 ring-emerald-100'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white'
              }`}
            />
            {formik.touched.content && formik.errors.content && (
              <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center space-x-1">
                <BiErrorCircle className="text-sm" />
                <span>{formik.errors.content}</span>
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => formik.resetForm()}
              disabled={formik.isSubmitting}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 rounded-xl transition-colors disabled:opacity-50"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
              className="inline-flex items-center space-x-2 px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 rounded-xl shadow-md shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {formik.isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <BiSend className="text-base" />
                  <span>Publish Article</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full shadow-2xl text-center border border-slate-100">
            <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-inner">
              <BiCheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Article Published!</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Your blog article has been successfully validated and stored in the database.
            </p>
            <button
              onClick={handleModalClose}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
            >
              Go to Article List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleAdd;