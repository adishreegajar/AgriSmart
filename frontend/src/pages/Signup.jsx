import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Leaf,
  Users,
  TrendingUp,
  CloudSun,
  Phone,
  MapPin
} from 'lucide-react';

const Signup = () => {
  const [role, setRole] = useState('Farmer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await signup({ ...formData, role });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-agri-cream/20 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-agri-light/10">
        
        {/* Left Column - Promotion Section */}
        <div className="lg:col-span-2 bg-agri-dark text-white p-12 relative overflow-hidden hidden lg:flex flex-col">
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 mb-16">
              <div className="bg-agri-green p-2 rounded-xl text-white">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight text-white">
                Agri<span className="text-agri-leaf">Smart</span>
              </span>
            </Link>
            
            <h2 className="text-4xl font-heading font-bold mb-8 leading-tight">
              Start Your Digital <span className="text-agri-leaf italic underline underline-offset-8">Farming</span> Journey.
            </h2>
            
            <div className="space-y-10 mt-12">
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-agri-leaf transition-colors duration-500">
                  <TrendingUp className="text-agri-leaf group-hover:text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg mb-1">Market Insight</h4>
                  <p className="text-sm text-agri-light opacity-60 leading-relaxed">Real-time demand forecasting and competitive pricing data.</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-agri-leaf transition-colors duration-500">
                  <CloudSun className="text-agri-leaf group-hover:text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg mb-1">Weather Guard</h4>
                  <p className="text-sm text-agri-light opacity-60 leading-relaxed">Hyper-local climate alerts and crop-specific protection advice.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-agri-leaf transition-colors duration-500">
                  <Users className="text-agri-leaf group-hover:text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg mb-1">Direct Networking</h4>
                  <p className="text-sm text-agri-light opacity-60 leading-relaxed">B2B platform connecting 10k+ farmers with premium buyers.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-auto relative z-10 pt-12 border-t border-white/10">
            <p className="text-agri-leaf font-bold text-3xl font-heading mb-1">10,000+</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-agri-light opacity-40">Farmers Already Onboarded</p>
          </div>
          
          {/* Decorative SVG */}
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <circle cx="90" cy="10" r="40" />
            </svg>
          </div>
        </div>

        {/* Right Column - Form Section */}
        <div className="lg:col-span-3 p-10 md:p-20">
          <div className="mb-12">
            <h1 className="text-4xl font-heading font-bold text-agri-dark mb-3">Create Your Account</h1>
            <p className="text-gray-500 font-sans">Join the AgriSmart revolution. Choose your role below.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-sans flex items-center gap-2">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              {error}
            </div>
          )}

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <button 
              onClick={() => setRole('Farmer')}
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 text-center ${role === 'Farmer' ? 'border-agri-leaf bg-agri-cream/30 shadow-lg' : 'border-agri-light/10 hover:border-agri-light hover:bg-agri-cream/10'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${role === 'Farmer' ? 'bg-agri-leaf text-white' : 'bg-agri-cream text-agri-leaf'}`}>
                <Leaf />
              </div>
              <span className="font-heading font-bold text-lg">Farmer</span>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Sell Produce</p>
            </button>
            <button 
              onClick={() => setRole('Buyer')}
              type="button"
              className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 text-center ${role === 'Buyer' ? 'border-agri-leaf bg-agri-cream/30 shadow-lg' : 'border-agri-light/10 hover:border-agri-light hover:bg-agri-cream/10'}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${role === 'Buyer' ? 'bg-agri-leaf text-white' : 'bg-agri-cream text-agri-leaf'}`}>
                <Users />
              </div>
              <span className="font-heading font-bold text-lg">Buyer / Retailer</span>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Bulk Procurement</p>
            </button>
          </div>

          <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                  placeholder="Rajesh Singh"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
                <input 
                  type="email" 
                  className="w-full pl-12 pr-4 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                  placeholder="rajesh@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
                <input 
                  type="tel" 
                  className="w-full pl-12 pr-4 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                  placeholder="+91 99887 76655"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Location (City, State)</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                  placeholder="Ludhiana, Punjab"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
                <input 
                  type="password" 
                  className="w-full pl-12 pr-4 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-6">
              <div className="flex items-start gap-3 mb-8">
                <input type="checkbox" id="terms" className="w-5 h-5 rounded text-agri-leaf mt-1" required />
                <label htmlFor="terms" className="text-sm text-gray-500 font-sans">
                  I agree to the AgriSmart <a href="#" className="text-agri-leaf font-bold">Terms of Use</a>.
                </label>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-agri-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-agri-green transition-all shadow-xl shadow-agri-dark/10 group overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-agri-green transition-transform duration-500 ${isLoading ? 'translate-x-0' : '-translate-x-full'}`} />
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? 'Creating Account...' : 'Get Started Now'}
                  {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </span>
              </button>
            </div>
          </form>

          <footer className="mt-12 text-center">
            <p className="text-sm text-gray-500 font-sans">
              Already have an account? {' '}
              <Link to="/login" className="text-agri-leaf font-bold hover:underline">Log In</Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Signup;
