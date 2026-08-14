import { NavLink, Link } from 'react-router-dom';
import { BiBookOpen, BiHomeAlt, BiInfoCircle, BiPlusCircle, BiGridAlt } from 'react-icons/bi';

const NavBar = () => {
  const navElements = [
    { name: 'Home', path: '/', icon: BiHomeAlt },
    { name: 'Articles', path: '/article-list', icon: BiGridAlt },
    { name: 'About', path: '/about', icon: BiInfoCircle },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="h-full w-full bg-white rounded-[10px] flex items-center justify-center">
                <BiBookOpen className="text-xl text-indigo-600 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                My Blog
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-1">
                Articles & Personal Insights
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
            {navElements.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-indigo-600 shadow-xs border border-slate-200/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`
                  }
                >
                  <Icon className="text-base" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Post Article Action Button */}
          <div className="flex items-center space-x-3">
            <Link
              to="/Post-Articles"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-400 shadow-md shadow-indigo-500/20 active:scale-95 transition-all duration-200"
            >
              <BiPlusCircle className="text-base" />
              <span>Write Post</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Nav Bar Strip */}
      <div className="md:hidden flex justify-around items-center py-2.5 px-4 bg-slate-50 border-t border-slate-200 text-xs font-medium text-slate-600">
        {navElements.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-3.5 py-1 rounded-md transition-colors ${
                isActive ? 'bg-indigo-100 text-indigo-700 font-bold' : 'hover:bg-slate-200/60'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default NavBar;
