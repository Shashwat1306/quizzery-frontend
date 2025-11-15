import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  const [role, setRole] = useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('role') : null);

  useEffect(() => {
    const sync = () => {
      setToken(localStorage.getItem('token'));
      setRole(localStorage.getItem('role'));
    };

    // Listen for storage events (other tabs) and focus events (same tab updates)
    window.addEventListener('storage', sync);
    window.addEventListener('focus', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('focus', sync);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">Q</div>
              <span className="font-semibold text-lg tracking-wide">Quizzery</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4 ml-6">
              {token && <Link to="/all-quizzes" className="hover:underline hover:text-white/90">All Quizzes</Link>}
              {token && role === "admin" && <Link to="/add-quiz" className="hover:underline hover:text-white/90">Add Quiz</Link>}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {!token && (
              <Link to="/register" className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">Register</Link>
            )}
            {!token && (
              <Link to="/login" className="text-sm bg-white/10 px-3 py-1 rounded hover:bg-white/20">Login</Link>
            )}

            {token && (
              <>
                <span className="text-sm px-2 py-1 bg-white/20 rounded capitalize">{role}</span>
                <Button onClick={handleLogout} className="bg-white text-purple-700 hover:bg-white/90 h-8 px-3">Log Out</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
