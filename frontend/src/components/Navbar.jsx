import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, User, LogOut, PlusSquare } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Socially
        </Link>

        {user ? (
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-purple-600"><Home size={24} /></Link>
            <Link to={`/profile/${user.username}`} className="hover:text-purple-600"><User size={24} /></Link>
            <button onClick={handleLogout} className="hover:text-red-500" title="Logout"><LogOut size={24} /></button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-purple-600">Login</Link>
            <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
