import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card } from '../components/card';
import { API_BASE_URL } from '../config/api';
import { BiSearch, BiGridAlt, BiPlusCircle, BiErrorCircle, BiX } from 'react-icons/bi';

interface ArticleItem {
  _id: string;
  name: string;
  title: string;
  author: string;
  content?: string;
  Blog?: string;
}

const Article = () => {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetch(`${API_BASE_URL}/api/blogs`);


    console.log("Status:", result.status);
    console.log("Content-Type:", result.headers.get("content-type"));

  const text = await result.text();

  console.log("Raw API Response:", text);


      
      if (!result.ok) {
        throw new Error('Failed to fetch articles from server');
      }
      const body = await result.json();
      setArticles(body);
    } catch (err: any) {
      setError(err.message || 'Error loading articles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromUI = (deletedId: string) => {
    setArticles((prev) => prev.filter((item) => item._id !== deletedId));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchParams({});
  };

  const filteredArticles = articles.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;

    const titleMatch = item.title?.toLowerCase().includes(q);
    const authorMatch = item.author?.toLowerCase().includes(q);
    const nameMatch = item.name?.toLowerCase().includes(q);
    const contentMatch = (item.content || item.Blog || '')?.toLowerCase().includes(q);

    return titleMatch || authorMatch || nameMatch || contentMatch;
  });

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
              <BiGridAlt className="text-indigo-600" />
              <span>All Articles</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {searchQuery ? (
                <span>
                  Showing results for <strong className="text-indigo-600">"{searchQuery}"</strong> ({filteredArticles.length} found)
                </span>
              ) : (
                'Browse published articles and developer insights'
              )}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="relative flex-1 sm:w-72">
              <BiSearch className="absolute left-3.5 top-3 text-slate-400 text-base" />
              <input
                type="text"
                placeholder="Search title, author, content..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full text-xs pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2.5 top-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/60 transition-colors"
                  title="Clear search"
                >
                  <BiX className="text-base" />
                </button>
              )}
            </div>

            <Link
              to="/Post-Articles"
              className="inline-flex items-center space-x-1 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm active:scale-95 transition-all flex-shrink-0"
            >
              <BiPlusCircle className="text-base" />
              <span className="hidden sm:inline">New Post</span>
            </Link>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center space-x-2">
            <BiErrorCircle className="text-lg flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-12 bg-slate-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredArticles.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
            <BiGridAlt className="text-4xl text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Articles Found</h3>
            <p className="text-xs max-w-sm mx-auto">
              {searchQuery
                ? `No articles match "${searchQuery}". Try a different keyword.`
                : 'Be the first creator to write and publish an article!'}
            </p>
            {searchQuery ? (
              <button
                onClick={clearSearch}
                className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              >
                Clear Search Filter
              </button>
            ) : (
              <Link
                to="/Post-Articles"
                className="inline-block px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              >
                Write First Article
              </Link>
            )}
          </div>
        )}

        {/* Article Grid Cards */}
        {!isLoading && filteredArticles.length > 0 && (
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card
                key={article._id || article.name}
                article={{
                  ...article,
                  content: article.content || article.Blog || '',
                }}
                onArticleDeleted={handleRemoveFromUI}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
