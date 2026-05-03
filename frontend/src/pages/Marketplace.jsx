import { useState, useEffect } from 'react';
import { fetchCrops } from '../services/api';
import { 
  Search, 
  MapPin, 
  Phone, 
  User, 
  Package, 
  Filter, 
  ChevronRight, 
  Loader2, 
  TrendingUp, 
  ArrowUpRight,
  Tag,
  DollarSign,
  Calendar,
  MessageSquare,
  Map as MapIcon,
  LayoutGrid
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MarketMap from '../components/MarketMap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Marketplace = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [revealedContacts, setRevealedContacts] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        setLoading(true);
        // Pass filter params as an object
        const params = {};
        if (searchTerm) params.cropName = searchTerm;
        if (locationFilter) params.location = locationFilter;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        
        const data = await fetchCrops(params);
        setCrops(data);
      } catch (error) {
        console.error('Error fetching marketplace data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketplace();
  }, [searchTerm, locationFilter, minPrice, maxPrice]);

  const toggleContactReveal = (id) => {
    setRevealedContacts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleStartChat = async (farmerId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      const { data } = await axios.post('http://localhost:5000/api/chat/conversations', 
        { recipientId: farmerId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate(`/chat/${data._id}`);
    } catch (err) {
      console.error('Error starting chat');
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Vegetables': return '🥬';
      case 'Fruits': return '🍎';
      case 'Cereals': return '🌾';
      case 'Rice': return '🍚';
      case 'Oilseeds': return '🌻';
      case 'Cash Crops': return '🚜';
      default: return '📦';
    }
  };

  if (loading && crops.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-agri-cream/20">
        <Loader2 className="w-12 h-12 text-agri-leaf animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-20">
      {/* Header & Hero Area */}
      <div className="mb-12">
        <h1 className="text-5xl font-heading font-bold text-white mb-4 tracking-tight">
          Marketplace <span className="text-agri-leaf">Direct</span>
        </h1>
        <p className="text-agri-light/90 max-w-2xl font-sans text-lg">
          Connecting verified farmers directly with premium buyers. No middlemen. Real prices. Real impact.
        </p>
      </div>

      {/* Advanced Filter Section */}
      <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-agri-light/10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Name Search */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Crop Name</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search Wheat, Rice..." 
                className="w-full pl-12 pr-4 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-agri-leaf w-5 h-5" />
              <input 
                type="text" 
                placeholder="Region, State, City..." 
                className="w-full pl-12 pr-4 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Price Filtering */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Min Price (₹)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-agri-leaf w-4 h-4" />
              <input 
                type="number" 
                placeholder="Min 100" 
                className="w-full pl-10 pr-4 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Max Price (₹)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-agri-leaf w-4 h-4" />
              <input 
                type="number" 
                placeholder="Max 50,000" 
                className="w-full pl-10 pr-4 py-3.5 md:py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans text-sm md:text-base"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center md:justify-end mt-8">
          <div className="bg-agri-cream/50 p-1 rounded-2xl flex gap-1 border border-agri-light/10 w-full md:w-auto">
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${viewMode === 'grid' ? 'bg-white text-agri-dark shadow-sm' : 'text-gray-400 hover:text-agri-dark'}`}
            >
              <LayoutGrid className="w-4 h-4" /> Grid
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${viewMode === 'map' ? 'bg-white text-agri-dark shadow-sm' : 'text-gray-400 hover:text-agri-dark'}`}
            >
              <MapIcon className="w-4 h-4" /> Map
            </button>
          </div>
        </div>
      </div>

      {/* Conditional Rendering: Grid or Map */}
      {viewMode === 'map' ? (
        <div className="h-[500px] md:h-[600px] mb-20 animate-in fade-in zoom-in duration-500">
          <MarketMap crops={crops} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {crops.map((crop) => (
          <div 
            key={crop._id}
            className="group bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 border border-agri-light/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              {/* Category & Date */}
              <div className="flex justify-between items-center mb-8">
                <span className="bg-agri-cream text-agri-green text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-agri-light/20">
                  {crop.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(crop.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
              </div>

              {/* Placeholder for future images, premium placeholder for now */}
              <div className="w-full h-40 bg-agri-cream/30 rounded-[2.5rem] mb-6 flex items-center justify-center relative overflow-hidden group/img">
                <span className="text-6xl group-hover:scale-125 transition-transform duration-700">
                  {getCategoryIcon(crop.category)}
                </span>
                <div className="absolute inset-0 bg-agri-leaf opacity-0 group-hover:opacity-5 transition-opacity" />
              </div>

              <h3 className="text-3xl font-heading font-bold text-agri-dark group-hover:text-agri-green transition-colors mb-2">
                {crop.cropName}
              </h3>

              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-agri-leaf animate-pulse" />
                <span className="text-xs font-bold text-agri-green uppercase tracking-[0.2em]">{crop.quantity} Available</span>
              </div>

              {/* Farmer Profile Snippet (revealed on click) */}
              <div className={`mt-4 p-4 rounded-3xl border transition-all duration-500 overflow-hidden ${revealedContacts[crop._id] ? 'bg-agri-dark text-white border-transparent h-auto opacity-100 mb-6' : 'bg-transparent border-gray-100 h-0 opacity-0 pointer-events-none'}`}>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-agri-leaf flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-widest ml-1">{crop.farmerName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-agri-leaf flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-sans opacity-70">{crop.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-agri-leaf flex items-center justify-center animate-bounce">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg font-bold font-mono tracking-tighter">{crop.phoneNumber}</span>
                    </div>
                    <button 
                      onClick={() => handleStartChat(crop.farmer)}
                      className="w-full py-3 bg-agri-leaf hover:bg-agri-green text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 mt-2"
                    >
                      <MessageSquare className="w-4 h-4" /> Message Farmer
                    </button>
                 </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-50">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Direct Price</span>
                <span className="text-3xl font-heading font-bold text-agri-dark">₹{crop.price}</span>
              </div>
              <button 
                onClick={() => toggleContactReveal(crop._id)}
                className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 ${revealedContacts[crop._id] ? 'bg-gray-100 text-agri-dark hover:bg-gray-200' : 'bg-agri-dark text-white hover:bg-agri-green shadow-xl shadow-agri-dark/10'}`}
              >
                {revealedContacts[crop._id] ? 'Dismiss' : (
                  <>Connect <ArrowUpRight className="w-5 h-5 ml-1" /></>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Empty State */}
      {crops.length === 0 && !loading && (
        <div className="text-center py-24 bg-white rounded-[4rem] border border-dashed border-agri-light/20 mt-12">
          <div className="w-24 h-24 bg-agri-cream rounded-full flex items-center justify-center mx-auto mb-8">
            <Search className="w-10 h-10 text-agri-leaf opacity-20" />
          </div>
          <h3 className="text-3xl font-heading font-bold text-agri-dark mb-4">No crops found</h3>
          <p className="text-gray-500 font-sans text-lg mb-8">Try adjusting your filters or location to see more listings.</p>
          <button 
            onClick={() => {setSearchTerm(''); setLocationFilter(''); setMinPrice(''); setMaxPrice('');}}
            className="text-agri-leaf font-bold hover:underline underline-offset-8"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
