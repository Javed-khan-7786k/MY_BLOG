import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { UpvotesSection } from '../components/UpvotesSection';
import Commentslist from '../components/Comment_list';
import { Card } from '../components/card';
import { API_BASE_URL } from '../config/api';
import { BiArrowBack, BiUser, BiBookOpen, BiTimeFive } from 'react-icons/bi';

interface ArticleInfo {
  upvotes: number;
  comments: any[];
}

const fetchArticleMetadata = async (articleName: string | undefined) => {
  try {
    const result = await fetch(`${API_BASE_URL}/api/articles/${articleName}`);
    if (!result.ok) return { upvotes: 0, comments: [] };
    return await result.json();
  } catch {
    return { upvotes: 0, comments: [] };
  }
};

const ArticlePage = () => {
  const { name } = useParams<{ name: string }>();
  const [allBlogs, setAllBlogs] = useState<any[]>([]);
  const [articleInfo, setArticleInfo] = useState<ArticleInfo>({ upvotes: 0, comments: [] });
  const [isLoading, setIsLoading] = useState(true);

  const article = allBlogs.find((item) => item.name === name);
  const otherArticles = allBlogs.filter((item) => item.name !== name);

  const fetchBlogs = async () => {
    try {
      const result = await fetch(`${API_BASE_URL}/api/blogs`);
      if (result.ok) {
        const body = await result.json();
        setAllBlogs(body);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      if (name) {
        setIsLoading(true);
        await fetchBlogs();
        const info = await fetchArticleMetadata(name);
        if (isMounted) {
          setArticleInfo(info);
          setIsLoading(false);
        }
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [name]);

  const addComment = (updatedArticle: any) => {
    setArticleInfo(updatedArticle);
  };

  const handleDeleteComment = async (commentToDelete: any) => {
    if (!name) return;
    try {
      const articleName = name;
      const username = encodeURIComponent(commentToDelete.username);
      const msg = encodeURIComponent(commentToDelete.text);

      const response = await fetch(
        `${API_BASE_URL}/api/articles/${articleName}/Delete/${username}/${msg}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.article) {
          setArticleInfo(data.article);
        } else {
          setArticleInfo((prev) => ({
            ...prev,
            comments: prev.comments.filter(
              (c) => !(c.username === commentToDelete.username && c.text === commentToDelete.text)
            ),
          }));
        }
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = async (index: number, updatedUsername: string, updatedText: string) => {
    if (!name || !updatedText.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/articles/${name}/edit-comment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentIndex: index,
          username: updatedUsername.trim(),
          text: updatedText.trim(),
        }),
      });

      if (response.ok) {
        const updatedArticle = await response.json();
        setArticleInfo(updatedArticle);
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!article) {
    return <NotFoundPage />;
  }

  // Calculate estimated reading time
  const wordCount = article.content ? article.content.trim().split(/\s+/).length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          to="/article-list"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
        >
          <BiArrowBack className="text-base" />
          <span>Back to Articles</span>
        </Link>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm mb-8 space-y-6">
          {/* Header Metadata */}
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 font-mono">
                {article.name}
              </span>
              <span className="inline-flex items-center space-x-1 text-xs text-slate-400 font-medium">
                <BiTimeFive className="text-sm" />
                <span>{readingTimeMinutes} min read</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center space-x-2">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {article.author?.charAt(0) || <BiUser />}
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-800">{article.author}</span>
                  <span className="text-[10px] text-slate-400 font-medium">Author & Creator</span>
                </div>
              </div>

              {/* Interactive Upvotes & Comments Trigger */}
              <UpvotesSection
                articleName={article.name}
                upvotes={articleInfo.upvotes}
                setArticleInfo={setArticleInfo}
                ArticleInfo={articleInfo}
                onAddComment={addComment}
              />
            </div>
          </div>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
            {article.content}
          </div>
        </article>

        {/* Integrated Comments Section */}
        <Commentslist
          comments={articleInfo.comments}
          onDeleteComment={handleDeleteComment}
          onEditComment={handleEditComment}
        />

        {/* More Articles Section */}
        {otherArticles.length > 0 && (
          <div className="mt-14 space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
              <BiBookOpen className="text-indigo-600" />
              <span>More Articles You Might Like</span>
            </h3>
            <div className="space-y-4">
              {otherArticles.slice(0, 3).map((item, key) => (
                <Card article={item} key={key} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;