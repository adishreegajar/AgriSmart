import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchMyCrops, deleteCrop, markCropAsSold } from '../services/api';
import { 
  Package, 
  Trash2, 
  Edit3,
  Plus, 
  MapPin, 
  Tag, 
  ArrowUpRight, 
  Loader2,
  AlertCircle,
  Clock
} from 'lucide-react';

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMyCropsList = async () => {
    try {
      const data = await fetchMyCrops();
      setCrops(data);
    } catch (err) {
      setError('Failed to fetch your listings.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCropsList();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this listing?')) {
      try {
        await deleteCrop(id);
        setCrops(crops.filter(crop => crop._id !== id));
      } catch (err) {
        alert('Failed to delete listing.');
      }
    }
  };

  const handleMarkAsSold = async (id) => {
    try {
      // Optimistic UI update for immediate feedback
      setCrops(crops.map(crop => 
        crop._id === id ? { ...crop, status: 'Sold' } : crop
      ));
      
      // Perform backend update
      await markCropAsSold(id);
    } catch (err) {
      console.error('API Error marking crop as sold:', err);
      alert('Failed to mark the crop as sold on the server. Please try again.');
      // Revert if failed
      fetchMyCropsList();
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-listing/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-agri-cream/20">
        <Loader2 className="w-12 h-12 text-agri-leaf animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold text-agri-dark mb-2">My Active Listings</h1>
          <p className="text-agri-green/80 font-sans">Manage your crops currently visible in the marketplace.</p>
        </div>
        <Link 
          to="/add-listing"
          className="bg-agri-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-agri-green transition-all shadow-xl shadow-agri-dark/10 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Add New Crop
        </Link>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      {crops.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-agri-light/30">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-agri-cream rounded-full mb-6 text-agri-leaf opacity-30">
            <Package className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-agri-dark mb-2">No active listings</h3>
          <p className="text-gray-500 font-sans mb-8">You haven't added any crops to the marketplace yet.</p>
          <Link 
            to="/add-listing"
            className="text-agri-leaf font-bold hover:underline underline-offset-8 flex items-center justify-center gap-2"
          >
            Create your first listing <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {crops.map((crop) => (
            <div 
              key={crop._id}
              className="bg-white rounded-3xl p-8 border border-agri-light/10 shadow-lg hover:shadow-2xl transition-all duration-500 group relative"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <span className="bg-agri-cream text-agri-green text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-agri-light/20">
                    {crop.category}
                  </span>
                  {crop.status === 'Sold' && (
                    <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-red-500/20">
                      Sold
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(crop._id)}
                    disabled={crop.status === 'Sold'}
                    className={`p-2 rounded-xl transition-all ${crop.status === 'Sold' ? 'text-gray-100 cursor-not-allowed' : 'text-gray-300 hover:text-agri-leaf hover:bg-agri-leaf/10'}`}
                    title={crop.status === 'Sold' ? "Cannot edit sold listing" : "Edit Listing"}
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(crop._id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-heading font-bold text-agri-dark mb-4 group-hover:text-agri-green transition-colors">
                {crop.cropName}
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Package className="w-4 h-4 text-agri-leaf" />
                  <span className="font-bold text-agri-dark">{crop.quantity}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-agri-leaf" />
                  <span>{crop.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Clock className="w-4 h-4 text-agri-leaf" />
                  <span>Listed on {new Date(crop.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Price</span>
                  <span className="text-3xl font-heading font-bold text-agri-dark">₹{crop.price}</span>
                </div>
                {crop.status !== 'Sold' && (
                  <button 
                    onClick={() => handleMarkAsSold(crop._id)}
                    className="bg-agri-dark text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-agri-green transition-all shadow-md shadow-agri-dark/10 active:scale-95"
                  >
                    Mark as Sold
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
