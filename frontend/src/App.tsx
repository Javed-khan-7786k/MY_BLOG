import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';
import Article from './pages/article';
import ArticleAdd from './components/Articleadd';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/article-list" element={<Article />} />
            <Route path="/article/:name" element={<ArticlePage />} />
            <Route path="/Post-Articles" element={<ArticleAdd />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} My Blog.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
