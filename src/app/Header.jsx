import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import { ArrowLeft, Sparkles } from 'lucide-react';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="bg-white shadow-sm border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <Link to="/" className="text-lg font-semibold text-slate-900 no-underline flex items-center gap-2">
        <Sparkles size={20} />
        PostGenie
      </Link>
      {!isLandingPage && (
        <button
          onClick={handleBack}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      )}
    </div>
  );
}

export default Header;
