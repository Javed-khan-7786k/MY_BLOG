import { Link } from 'react-router-dom';

interface ArticleItem {
  name: string;
  title?: string;
  content?: string;
}

interface ArticleListProps {
  articless: ArticleItem[];
}

const ArticleList = ({ articless }: ArticleListProps) => (
  <article className="group flex my-2.5 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
    <div className="w-full px-2.5">
      {articless?.map((article, key) => (
        <Link
          className="article-list-item block py-2 hover:text-indigo-600 font-medium"
          key={key}
          to={`/article/${article.name}`}
        >
          <h2 className="text-base font-bold">{article.title || article.name}</h2>
          <p className="text-xs text-slate-500 line-clamp-2">
            {typeof article.content === 'string' ? article.content.substring(0, 150) : ''}
          </p>
        </Link>
      ))}
    </div>
  </article>
);

export default ArticleList;
