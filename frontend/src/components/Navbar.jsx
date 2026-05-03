import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, User, LogOut, Bell, MessageSquare } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { fetchNotifications, markNotificationRead } from '../services/api';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial fetch
    if (user) {
      loadNotifications();
    }

    // Polling for real-time feel (every 1 minute)
    const interval = setInterval(() => {
      if (user) loadNotifications();
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [user]);

  const loadNotifications = async () => {
    try {
      const data = await fetchNotifications();
      setNotifications(data);
    } catch (err) {
      console.error('Failed to load notifications');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error('Failed to mark read');
    }
  };

  const baseLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Marketplace', path: '/marketplace' },
  ];

  const authLinks = user ? [
    { name: 'My Listings', path: '/my-listings' },
    { name: 'Messages', path: '/chat' },
    { name: 'Profile', path: '/profile' },
  ] : [];

  const footerLinks = [
    { name: 'Weather', path: '/weather-insights' },
    { name: 'Schemes', path: '/government-schemes' },
    { name: 'Contact', path: '/contact' },
  ];

  const navLinks = [...baseLinks, ...authLinks, ...footerLinks];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-xl shadow-lg border-b border-agri-light/10' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-agri-green p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-agri-green/20 shadow-lg">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <span className={`text-2xl font-heading font-bold tracking-tight transition-colors ${scrolled ? 'text-agri-dark' : 'text-white'}`}>
            Agri<span className="text-agri-leaf">Smart</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-bold transition-all hover:text-agri-leaf relative ${location.pathname === link.path ? 'text-agri-green' : 'text-gray-500'}`}
            >
              {link.name}
              {location.pathname === link.path && (
                <div 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-agri-leaf rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2 text-agri-dark font-sans font-medium text-sm border-r border-gray-200 pr-4 hover:text-agri-leaf transition-colors">
                <div className="w-8 h-8 rounded-full bg-agri-cream flex flex-col items-center justify-center">
                  <User className="w-4 h-4 text-agri-green" />
                </div>
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-500 hover:text-agri-leaf hover:bg-agri-leaf/10 rounded-full transition-all relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-agri-light/10 overflow-hidden z-[200] animate-in fade-in zoom-in duration-200">
                    <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                      <h4 className="font-heading font-bold text-agri-dark">Recent Alerts</h4>
                      <span className="text-[10px] font-bold text-agri-leaf uppercase tracking-widest">{unreadCount} New</span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <p className="text-gray-400 text-sm font-sans italic">No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map(n => (
                          <div 
                            key={n._id} 
                            onClick={() => handleMarkRead(n._id)}
                            className={`p-4 border-b border-gray-50 hover:bg-agri-cream/30 transition-colors cursor-pointer relative ${!n.isRead ? 'bg-agri-leaf/5' : ''}`}
                          >
                            {!n.isRead && <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-agri-leaf rounded-full" />}
                            <p className="text-xs font-bold text-agri-dark mb-1">{n.title}</p>
                            <p className="text-[11px] text-gray-500 leading-tight">{n.message}</p>
                            <p className="text-[9px] text-gray-400 mt-2 font-bold uppercase">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <Link 
                      to="/dashboard" 
                      onClick={() => setShowNotifications(false)}
                      className="block p-3 text-center text-xs font-bold text-agri-leaf hover:bg-agri-leaf hover:text-white transition-all border-t border-gray-50"
                    >
                      View All in Dashboard
                    </Link>
                  </div>
                )}
              </div>

              <button 
                onClick={handleLogout}
                className="text-sm font-bold text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-agri-dark hover:text-agri-leaf transition-colors">
                Login
              </Link>
              <Link to="/signup" className="btn-accent px-6 py-2.5 text-sm flex items-center gap-2 shadow-sm">
                <User className="w-4 h-4" /> Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-agri-dark hover:bg-agri-cream rounded-lg transition-colors"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-agri-light/10 overflow-hidden">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-heading font-bold ${location.pathname === link.path ? 'text-agri-green' : 'text-agri-dark'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
              {user ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 px-2 py-1 text-agri-dark">
                      <div className="w-10 h-10 rounded-full bg-agri-cream flex items-center justify-center border border-agri-leaf/10">
                        <User className="w-5 h-5 text-agri-green" />
                      </div>
                      <div>
                        <p className="font-bold font-sans text-sm leading-tight">{user.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 uppercase font-bold tracking-widest">{user.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <Link 
                        to="/chat" 
                        onClick={() => setIsOpen(false)}
                        className="p-3 bg-agri-cream/50 rounded-xl text-agri-leaf relative"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </Link>
                      <Link 
                        to="/dashboard" 
                        onClick={() => setIsOpen(false)}
                        className="p-3 bg-agri-cream/50 rounded-xl text-agri-leaf relative"
                      >
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                        )}
                      </Link>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-center py-4 font-bold bg-white text-red-500 border border-red-50/50 rounded-2xl flex justify-center items-center gap-2 shadow-sm transition-all active:scale-95"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-3 font-bold text-agri-dark border border-agri-light/20 rounded-xl"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-3 font-bold bg-agri-dark text-white rounded-xl shadow-lg"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
