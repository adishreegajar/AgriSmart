import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  User, 
  Lock, 
  ArrowRight, 
  Leaf, 
  MapPin, 
  ShieldCheck 
} from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState('Farmer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-agri-cream/20 pt-20 px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-agri-light/10">
        
        {/* Left Side - Image/Branding */}
        <div className="hidden md:block relative bg-agri-dark text-white p-12">
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 mb-12">
              <div className="bg-agri-green p-2 rounded-xl">
                <Leaf className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight text-white">
                Agri<span className="text-agri-leaf">Smart</span>
              </span>
            </Link>
            <h2 className="text-4xl font-heading font-bold mb-6 leading-tight">
              Empowering Indian Farmers through <span className="text-agri-leaf">AI Intelligence</span>.
            </h2>
            <div className="space-y-6 mt-12">
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-white/10 rounded-lg"><MapPin className="text-agri-leaf w-5 h-5" /></div>
                <p className="text-sm text-agri-light opacity-70">Hyper-local mandi prices and weather alerts.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck className="text-agri-leaf w-5 h-5" /></div>
                <p className="text-sm text-agri-light opacity-70">Secure B2B marketplace for direct selling.</p>
              </div>
            </div>
          </div>
          {/* Background Decorative Element */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-agri-leaf opacity-20 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        {/* Right Side - Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-agri-dark mb-2">Welcome Back</h1>
            <p className="text-gray-500 font-sans">Login to manage your farm and sales.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-sans flex items-center gap-2">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div className="flex p-1 bg-agri-cream rounded-2xl mb-8">
            <button 
              onClick={() => setRole('Farmer')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${role === 'Farmer' ? 'bg-white text-agri-green shadow-md' : 'text-gray-500'}`}
            >
              Farmer
            </button>
            <button 
              onClick={() => setRole('Buyer')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${role === 'Buyer' ? 'bg-white text-agri-dark shadow-md' : 'text-gray-500'}`}
            >
              Buyer / Retailer
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 font-sans">Email Address</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 font-sans">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded text-agri-green focus:ring-agri-green" />
                <span className="text-sm text-gray-500 font-sans">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-agri-leaf hover:underline">Forgot password?</a>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-agri-dark text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-agri-green transition-all shadow-xl shadow-agri-dark/10 group"
            >
              {isLoading ? 'Verifying...' : 'Login to Dashboard'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <footer className="mt-12 text-center">
            <p className="text-sm text-gray-500 font-sans">
              Don't have an account? {' '}
              <Link to="/signup" className="text-agri-leaf font-bold hover:underline">Create Account</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
