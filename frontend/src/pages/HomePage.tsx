import { Link } from 'react-router-dom';
import { BiBookOpen, BiRocket, BiCodeAlt, BiRightArrowAlt, BiChat, BiBrain, BiLaptop } from 'react-icons/bi';

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Main Welcome Hero Card */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-100/60 to-transparent rounded-bl-full -z-0 pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100">
              <BiRocket className="text-sm" />
              <span>Welcome to My Blog</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Hello, welcome to my blog!
            </h1>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p className="indent-8">
                Welcome to my personal corner on the web! Here, I publish articles, personal notes, tutorials, and reflections on technology and creative ideas. Whether you are browsing for insightful reads, discovering new software perspectives, or seeking technical inspiration, you will find engaging content here.
              </p>
              <p>
                Feel free to explore our collection of articles, join the discussion by leaving comments, upvote your favorite posts, or even contribute your own articles to the community!
              </p>
            </div>

            {/* Action CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/article-list"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-400 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
              >
                <BiBookOpen className="text-base" />
                <span>Explore All Articles</span>
                <BiRightArrowAlt className="text-lg" />
              </Link>

              <Link
                to="/Post-Articles"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3 rounded-2xl text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 active:scale-95 transition-all"
              >
                <BiCodeAlt className="text-base text-indigo-600" />
                <span>Post an Article</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <BiLaptop className="text-xl" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Rich Articles</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore engaging articles covering web development, technology trends, and engineering solutions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <BiBrain className="text-xl" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Interactive Discussions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Express your opinions by upvoting articles, downvoting, and posting thoughts in the comment section.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
              <BiChat className="text-xl" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Community Publishing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Easily post new articles using validated forms to share your stories with readers.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;