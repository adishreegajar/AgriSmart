import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { addCrop } from '../services/api';
import { 
  Leaf, 
  ArrowLeft, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Package,
  MapPin,
  Phone,
  Tag,
  DollarSign,
  ChevronRight
} from 'lucide-react';

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    price: '',
    category: 'Cereals',
    location: '',
    phoneNumber: '',
    farmerName: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        location: user.location || '',
        phoneNumber: user.phone || '',
        farmerName: user.name || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Ensure price is a number
      const payload = {
        ...formData,
        price: Number(formData.price)
      };

      await addCrop(payload);
      setSuccess(true);
      setTimeout(() => navigate('/my-listings'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to add listing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-agri-cream/20 pt-20 px-4">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-agri-light/10">
          <div className="w-20 h-20 bg-agri-leaf/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-agri-leaf" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-agri-dark mb-4">Listing Created!</h2>
          <p className="text-gray-500 font-sans mb-8">Your crop is now live on the AgriSmart Marketplace. Redirecting to your listings...</p>
          <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-agri-leaf h-full animate-progress" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-agri-cream/20 pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-agri-leaf font-bold mb-8 hover:translate-x-1 transition-transform group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Listings
        </button>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-agri-light/10 grid grid-cols-1 lg:grid-cols-5">
          {/* Left Side Info */}
          <div className="lg:col-span-2 bg-agri-dark text-white p-12 relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-agri-leaf px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">Farmer Hub</span>
              <h1 className="text-4xl font-heading font-bold mb-6 leading-tight">Create New <span className="text-agri-leaf">Listing</span></h1>
              <p className="text-agri-light/70 font-sans mb-12">Reach thousands of premium buyers directly. Fill in the details to list your produce.</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="p-2 bg-agri-leaf/20 rounded-lg text-agri-leaf"><Tag className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-sm">Transparent Pricing</h4>
                    <p className="text-xs text-agri-light/50">Market-aligned pricing for faster sales.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 opacity-50">
                  <div className="p-2 bg-white/10 rounded-lg text-gray-400"><Upload className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-bold text-sm">Media Coming Soon</h4>
                    <p className="text-xs text-agri-light/50">Image uploads will be enabled in the next update.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-agri-leaf/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
          </div>

          {/* Right Side Form */}
          <div className="lg:col-span-3 p-10 md:p-16">
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-sans flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Crop Name</label>
                  <div className="relative">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-agri-leaf" />
                    <input 
                      type="text"
                      name="cropName"
                      required
                      value={formData.cropName}
                      onChange={handleChange}
                      placeholder="e.g. Basmati Rice"
                      className="w-full pl-12 pr-4 py-4 bg-agri-cream border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-agri-leaf" />
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full pl-12 pr-10 py-4 bg-agri-cream border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans appearance-none font-bold text-agri-dark"
                    >
                      {['Cereals', 'Rice', 'Oilseeds', 'Cash Crops', 'Vegetables', 'Fruits', 'Other'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Quantity</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-agri-leaf font-bold">Q</div>
                    <input 
                      type="text"
                      name="quantity"
                      required
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g. 50 Quintals"
                      className="w-full pl-12 pr-4 py-4 bg-agri-cream border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Price (₹)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-agri-leaf" />
                    <input 
                      type="number"
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. 2400"
                      className="w-full pl-12 pr-4 py-4 bg-agri-cream border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-agri-leaf" />
                    <input 
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Ludhiana, Punjab"
                      className="w-full pl-12 pr-4 py-4 bg-agri-cream border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Contact Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-agri-leaf" />
                    <input 
                      type="tel"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+91 99887 76655"
                      className="w-full pl-12 pr-4 py-4 bg-agri-cream border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans text-sm"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-agri-dark text-white rounded-[2rem] font-bold flex items-center justify-center gap-3 hover:bg-agri-green transition-all shadow-xl shadow-agri-dark/10 group overflow-hidden relative active:scale-95"
              >
                <div className={`absolute inset-0 bg-agri-green transition-transform duration-500 ${isLoading ? 'translate-x-0' : '-translate-x-full'}`} />
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? 'Publishing Listing...' : 'Publish to Marketplace'}
                  {!isLoading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
