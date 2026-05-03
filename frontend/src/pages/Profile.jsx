import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Save, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Camera
} from 'lucide-react';

const Profile = () => {
  const { user, updateProfileData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        password: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;
      
      await updateProfileData(updateData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-heading font-bold text-agri-dark mb-2">Farmer Profile</h1>
            <p className="text-agri-green/80 font-sans">Manage your personal information and account security.</p>
          </div>
          <div className="flex items-center gap-3 bg-agri-cream px-6 py-3 rounded-2xl border border-agri-light/20">
            <Award className="text-agri-leaf w-6 h-6" />
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest leading-none mb-1">Status</p>
              <p className="text-agri-green font-bold text-sm">Verified Premium Farmer</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Avatar & Overview */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-agri-light/10 text-center relative overflow-hidden">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 bg-agri-dark rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-heading font-bold border-4 border-agri-cream shadow-xl">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-1 right-1 bg-agri-leaf text-white p-2.5 rounded-2xl shadow-lg border-2 border-white hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-2xl font-heading font-bold text-agri-dark mb-1">{user?.name}</h3>
              <p className="text-sm text-gray-400 font-sans mb-8">{user?.email}</p>
              
              <div className="pt-8 border-t border-gray-50 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Member Since</span>
                  <span className="font-bold text-agri-dark">April 2026</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Listings</span>
                  <span className="font-bold text-agri-dark">12 Active</span>
                </div>
              </div>
              
              {/* Decoration */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-agri-leaf/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="bg-agri-dark text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden">
              <ShieldCheck className="text-agri-leaf w-10 h-10 mb-6" />
              <h4 className="text-xl font-heading font-bold mb-4">Security Tip</h4>
              <p className="text-sm text-agri-light/60 font-sans leading-relaxed">
                Use a strong password and keep your phone number updated to receive critical sales alerts and weather warnings.
              </p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Right Column: Edit Form */}
          <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 md:p-14 shadow-xl border border-agri-light/10">
            <h2 className="text-2xl font-heading font-bold text-agri-dark mb-10">Personal Details</h2>
            
            {success && (
              <div className="mb-8 p-4 bg-agri-leaf/10 border border-agri-leaf/20 text-agri-leaf rounded-2xl flex items-center gap-3 animate-bounce">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                Profile updated successfully!
              </div>
            )}

            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-sans flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-14 pr-6 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5" />
                    <input 
                      type="email" 
                      disabled
                      value={formData.email}
                      className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 text-gray-400 rounded-2xl cursor-not-allowed font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-14 pr-6 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Current Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
                    <input 
                      type="text" 
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-14 pr-6 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">New Password (Leave blank to keep same)</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
                    <input 
                      type="password" 
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-14 pr-6 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto px-12 py-5 bg-agri-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-agri-green transition-all shadow-xl shadow-agri-dark/10 group relative overflow-hidden active:scale-95"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Save Profile Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
