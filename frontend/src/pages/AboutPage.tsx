import type { FC } from 'react';
import { BiBookHeart, BiBulb, BiSmile, BiCheckCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const AboutPage: FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
              <BiBookHeart className="text-2xl text-white" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-100">About My Blog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            About My Blog
          </h1>
          <p className="mt-4 text-sm sm:text-base text-purple-100 leading-relaxed max-w-2xl">
            Learn more about the vision, story, and purpose behind My Blog platform.
          </p>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center space-x-3 text-slate-900 font-extrabold text-xl border-b border-slate-100 pb-4">
            <BiSmile className="text-indigo-600 text-2xl" />
            <span>Welcome to My Blog</span>
          </div>

          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Welcome to <strong>My Blog</strong>! This platform was created as a space to share thoughts, technical insights, creative stories, and interactive discussions. Whether you are interested in reading detailed articles or writing your own posts, this blog provides a seamless, beautiful experience.
            </p>
            <p>
              Our goal is to build an engaging reading environment with full interactive support for comments, upvotes, downvotes, and community contributions.
            </p>
          </div>

          {/* Highlights */}
          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <BiBulb className="text-indigo-600 text-lg" />
              <span>Key Features of My Blog</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                <div className="flex items-center space-x-1.5 font-bold text-indigo-700">
                  <BiCheckCircle className="text-base" />
                  <span>Curated Content</span>
                </div>
                <p className="text-slate-600">Discover articles with clean typography and intuitive reading layouts.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                <div className="flex items-center space-x-1.5 font-bold text-purple-700">
                  <BiCheckCircle className="text-base" />
                  <span>Interactive Upvotes</span>
                </div>
                <p className="text-slate-600">Upvote and downvote articles to highlight top community posts.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                <div className="flex items-center space-x-1.5 font-bold text-pink-700">
                  <BiCheckCircle className="text-base" />
                  <span>Validated Posting</span>
                </div>
                <p className="text-slate-600">Publish posts and comments backed by Formik, Yup, and Joi validations.</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">Ready to post your own article?</h4>
              <p className="text-xs text-slate-500 mt-0.5">Share your ideas with the community now.</p>
            </div>
            <Link
              to="/Post-Articles"
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex-shrink-0"
            >
              Write an Article
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;