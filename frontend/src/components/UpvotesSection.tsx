import { BiLike, BiDislike } from 'react-icons/bi';
import CommentBox from './CommentBox';
import { API_BASE_URL } from '../config/api';

interface UpvotesSectionProps {
  articleName: string;
  upvotes: number;
  setArticleInfo: (info: any) => void;
  ArticleInfo: any;
  onAddComment: (article: any) => void;
}

export const UpvotesSection = ({
  articleName,
  setArticleInfo,
  ArticleInfo,
  onAddComment,
}: UpvotesSectionProps) => {
  const upvoteArticle = async () => {
    try {
      const result = await fetch(`${API_BASE_URL}/api/articles/${articleName}/upvote`, {
        method: 'POST',
      });
      const body = await result.json();
      setArticleInfo(body);
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const downvoteArticle = async () => {
    try {
      const result = await fetch(`${API_BASE_URL}/api/articles/${articleName}/downvote`, {
        method: 'POST',
      });
      const body = await result.json();
      setArticleInfo(body);
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Upvote Button */}
      <button
        type="button"
        onClick={upvoteArticle}
        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-emerald-600 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 active:scale-95 transition-all duration-200"
        title="Upvote article"
      >
        <BiLike className="text-sm text-emerald-600" />
        <span>{ArticleInfo?.upvotes || 0}</span>
      </button>

      {/* Downvote Button */}
      <button
        type="button"
        onClick={downvoteArticle}
        className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 active:scale-95 transition-all duration-200"
        title="Downvote article"
      >
        <BiDislike className="text-sm text-slate-400 hover:text-red-500" />
      </button>

      {/* Comment Trigger Modal */}
      <CommentBox onAddComment={onAddComment} setArticleInfo={setArticleInfo} />
    </div>
  );
};
