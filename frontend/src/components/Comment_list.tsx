import { useState } from 'react';
import { useFormik } from 'formik';
import { commentValidationSchema } from '../utils/validations';
import { BiTrash, BiEditAlt, BiCheck, BiX, BiUserCircle, BiMessageSquareDetail } from 'react-icons/bi';

interface Comment {
  username: string;
  text: string;
  createdAt?: string;
}

interface CommentslistProps {
  comments: Comment[];
  onDeleteComment: (comment: Comment) => void;
  onEditComment: (index: number, updatedUsername: string, updatedText: string) => Promise<void>;
}

// Inline Comment Edit Formik Component
const InlineCommentEditForm = ({
  comment,
  index,
  onSave,
  onCancel,
}: {
  comment: Comment;
  index: number;
  onSave: (index: number, username: string, text: string) => Promise<void>;
  onCancel: () => void;
}) => {
  const formik = useFormik({
    initialValues: {
      username: comment.username || '',
      text: comment.text || '',
    },
    validationSchema: commentValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await onSave(index, values.username.trim(), values.text.trim());
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-3 bg-indigo-50/40 p-4 rounded-xl border border-indigo-200">
      <div className="flex items-center space-x-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
        <BiEditAlt className="text-base" />
        <span>Editing Comment</span>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full text-xs font-medium text-slate-800 bg-white border rounded-lg px-3 py-1.5 outline-none transition-all ${
            formik.touched.username && formik.errors.username
              ? 'border-red-500 ring-1 ring-red-200'
              : 'border-slate-300 focus:border-indigo-500'
          }`}
        />
        {formik.touched.username && formik.errors.username && (
          <p className="mt-1 text-[11px] text-red-600 font-medium">{formik.errors.username}</p>
        )}
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Comment Text</label>
        <textarea
          name="text"
          rows={3}
          value={formik.values.text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full text-xs text-slate-700 bg-white border rounded-lg px-3 py-1.5 outline-none resize-none transition-all ${
            formik.touched.text && formik.errors.text
              ? 'border-red-500 ring-1 ring-red-200'
              : 'border-slate-300 focus:border-indigo-500'
          }`}
        />
        {formik.touched.text && formik.errors.text && (
          <p className="mt-1 text-[11px] text-red-600 font-medium">{formik.errors.text}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200/80 rounded-lg transition-colors"
        >
          <BiX />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className="inline-flex items-center space-x-1 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs active:scale-95 transition-all disabled:opacity-50"
        >
          <BiCheck />
          <span>{formik.isSubmitting ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </form>
  );
};

export default function Commentslist({ comments, onDeleteComment, onEditComment }: CommentslistProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleDelete = (comment: Comment) => {
    if (window.confirm(`Are you sure you want to delete this comment by ${comment.username}?`)) {
      onDeleteComment(comment);
    }
  };

  return (
    <div className="w-full mt-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <BiMessageSquareDetail className="text-indigo-600" />
          <span>Community Discussion</span>
          <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full ml-2">
            {comments?.length || 0}
          </span>
        </h3>
      </div>

      {/* Empty State */}
      {(!comments || comments.length === 0) && (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          <BiUserCircle className="text-4xl text-slate-300 mx-auto mb-2" />
          <p className="text-xs font-medium">No comments yet. Be the first to start the conversation!</p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-3.5">
        {comments?.map((comment, index) => {
          const isCurrentEditing = editingIndex === index;

          return (
            <div
              key={index}
              className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:shadow-md transition-all duration-200"
            >
              {isCurrentEditing ? (
                <InlineCommentEditForm
                  comment={comment}
                  index={index}
                  onSave={async (idx, uname, txt) => {
                    await onEditComment(idx, uname, txt);
                    setEditingIndex(null);
                  }}
                  onCancel={() => setEditingIndex(null)}
                />
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2.5">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-extrabold text-xs uppercase shadow-xs">
                        {comment.username?.charAt(0) || '?'}
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-800">{comment.username || 'Anonymous'}</h5>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Recent comment'}
                        </span>
                      </div>
                    </div>

                    {/* Action Triggers */}
                    <div className="flex items-center space-x-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setEditingIndex(index)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors text-xs font-medium"
                        title="Edit Comment"
                      >
                        <BiEditAlt className="text-base" />
                      </button>
                      <button
                        onClick={() => handleDelete(comment)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors text-xs font-medium"
                        title="Delete Comment"
                      >
                        <BiTrash className="text-base" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pl-10.5 whitespace-pre-wrap">
                    {comment.text}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}