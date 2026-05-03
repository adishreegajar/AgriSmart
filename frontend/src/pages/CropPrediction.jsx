import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Zap, 
  MapPin, 
  Thermometer, 
  Droplets, 
  Sprout, 
  Search, 
  AlertCircle,
  CheckCircle2,
  Wind,
  Navigation,
  Loader2,
  RefreshCcw,
  ArrowRight
} from 'lucide-react';
import { fetchWeatherData, fetchRecommendation } from '../services/api';

const CropPrediction = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    city: searchParams.get('city') || '',
    soilType: 'Alluvial',
    season: 'Kharif',
    temp: '',
    humidity: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [fetchingWeather, setFetchingWeather] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Auto-fetch weather if city is provided from dashboard
  useEffect(() => {
    if (searchParams.get('city')) {
      handleFetchWeather();
    }
  }, []);

  const handleSaveReport = () => {
    if (!prediction) return;
    
    const reportContent = `
AGRISMART CROP PREDICTION REPORT
-------------------------------
Location: ${formData.city}
Soil Type: ${formData.soilType}
Season: ${formData.season}
Conditions: ${formData.temp}°C, ${formData.humidity}% Humidity
-------------------------------
RECOMMENDED CROP: ${prediction.crop}
Confidence: ${prediction.confidence}
Scientific Rationale: ${prediction.reason}
Care Instructions: ${prediction.care}
-------------------------------
Generated on: ${new Date().toLocaleString()}
    `;

    const element = document.createElement("a");
    const file = new Blob([reportContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `AgriSmart_Report_${prediction.crop}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleNextSteps = () => {
    if (!prediction) return;
    // Navigate to marketplace with the recommended crop as search query
    navigate(`/marketplace?search=${prediction.crop}`);
  };

  const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Desert', 'Mountain', 'Sandy', 'Loamy'];
  const seasons = ['Kharif', 'Rabi', 'Zaid'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleFetchWeather = async () => {
    if (!formData.city) {
      setError('Please enter a city to fetch weather data.');
      return;
    }

    setFetchingWeather(true);
    setError('');
    try {
      const data = await fetchWeatherData(formData.city);
      setFormData(prev => ({
        ...prev,
        temp: data.temperature.toString(),
        humidity: data.humidity.toString()
      }));
    } catch (err) {
      setError('Could not fetch weather for this city. Please enter manually.');
    } finally {
      setFetchingWeather(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.temp || !formData.humidity) {
      setError('Temperature and Humidity are required for prediction.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await fetchRecommendation(formData);
      setPrediction(result);
      // Smooth scroll to result
      setTimeout(() => {
        document.getElementById('prediction-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError('Failed to generate prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-agri-cream/20 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-agri-leaf/10 text-agri-leaf px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Zap className="w-4 h-4" /> AI-Powered Agriculture
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-agri-dark mb-4">Crop Prediction Engine</h1>
          <p className="text-agri-green/80 font-sans leading-relaxed">
            Our advanced algorithm analyzes your local climate, soil profile, and current season 
            to recommend the most profitable and sustainable crops for your farm.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl border border-agri-light/10 relative overflow-hidden">
            <h2 className="text-2xl font-heading font-bold text-agri-dark mb-8 flex items-center gap-3">
              <Navigation className="text-agri-leaf w-6 h-6" /> Farm Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* City Input with Fetch */}
              <div className="relative group">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Location / City</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="city"
                    placeholder="e.g. Nashik, Ludhiana"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full pl-6 pr-32 py-4 bg-agri-cream/30 rounded-2xl border border-agri-light/10 focus:border-agri-leaf outline-none transition-all font-sans font-bold"
                  />
                  <button 
                    type="button"
                    onClick={handleFetchWeather}
                    disabled={fetchingWeather}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-agri-dark text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-agri-leaf transition-all flex items-center gap-2"
                  >
                    {fetchingWeather ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCcw className="w-3 h-3" />}
                    {fetchingWeather ? 'Fetching...' : 'Get Weather'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Soil Type */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Soil Type</label>
                  <select 
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-agri-cream/30 rounded-2xl border border-agri-light/10 focus:border-agri-leaf outline-none transition-all font-sans font-bold appearance-none cursor-pointer"
                  >
                    {soilTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Season */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Season</label>
                  <select 
                    name="season"
                    value={formData.season}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-agri-cream/30 rounded-2xl border border-agri-light/10 focus:border-agri-leaf outline-none transition-all font-sans font-bold appearance-none cursor-pointer"
                  >
                    {seasons.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Temp */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Temperature (°C)</label>
                  <div className="relative">
                    <Thermometer className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-agri-green/40" />
                    <input 
                      type="number" 
                      name="temp"
                      placeholder="e.g. 28"
                      value={formData.temp}
                      onChange={handleChange}
                      className="w-full pl-12 pr-6 py-4 bg-agri-cream/30 rounded-2xl border border-agri-light/10 focus:border-agri-leaf outline-none transition-all font-sans font-bold"
                    />
                  </div>
                </div>

                {/* Humidity */}
                <div className="group">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Humidity (%)</label>
                  <div className="relative">
                    <Droplets className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-agri-green/40" />
                    <input 
                      type="number" 
                      name="humidity"
                      placeholder="e.g. 60"
                      value={formData.humidity}
                      onChange={handleChange}
                      className="w-full pl-12 pr-6 py-4 bg-agri-cream/30 rounded-2xl border border-agri-light/10 focus:border-agri-leaf outline-none transition-all font-sans font-bold"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-50 p-4 rounded-xl animate-shake">
                  <AlertCircle className="w-4 h-4" /> {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-agri-dark text-white rounded-2xl font-heading font-bold uppercase tracking-widest hover:bg-agri-leaf hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-agri-dark/10 flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6" />}
                {loading ? 'Analyzing Data...' : 'Get AI Prediction'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-agri-light/10">
              <div className="flex items-center gap-4 p-4 bg-agri-cream/20 rounded-2xl border border-agri-leaf/10">
                <div className="p-2 bg-agri-leaf/10 rounded-lg">
                  <Sprout className="w-5 h-5 text-agri-leaf" />
                </div>
                <p className="text-[10px] text-agri-green/60 font-sans leading-relaxed">
                  Tip: Soil quality assessments from government labs provide better accuracy. 
                  Check <span className="text-agri-leaf font-bold">Government Schemes</span> for soil health card details.
                </p>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="relative">
            {!prediction ? (
              <div className="h-full min-h-[500px] border-2 border-dashed border-agri-light/30 rounded-[3rem] flex flex-col items-center justify-center text-center p-12">
                <div className="w-20 h-20 bg-agri-cream rounded-full flex items-center justify-center mb-6">
                  <Search className="text-agri-light w-10 h-10" />
                </div>
                <h3 className="text-xl font-heading font-bold text-agri-dark mb-4">Awaiting Analysis</h3>
                <p className="text-gray-400 font-sans text-sm max-w-xs">
                  Fill in your farm details and click predict to see our AI recommendations.
                </p>
              </div>
            ) : (
              <div id="prediction-result" className="bg-agri-dark text-white p-10 rounded-[3rem] shadow-2xl h-full flex flex-col justify-between animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <span className="bg-agri-leaf text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">Prediction Outcome</span>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-agri-light opacity-50 mb-1">Confidence Score</p>
                      <p className="text-3xl font-heading font-bold text-agri-leaf">{prediction.confidence}</p>
                    </div>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-xs uppercase font-bold text-agri-light opacity-50 mb-4 tracking-widest">Recommended Crop</h3>
                    <div className="flex items-end gap-4 mb-6">
                      <h2 className="text-6xl font-heading font-bold">{prediction.crop}</h2>
                      <div className="bg-white/10 p-2 rounded-xl mb-2">
                        <CheckCircle2 className="w-6 h-6 text-agri-leaf" />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
                        <h4 className="text-[10px] uppercase font-bold text-agri-leaf mb-2 tracking-widest">Scientific Rationale</h4>
                        <p className="text-agri-light font-sans leading-relaxed text-sm italic">
                          "{prediction.reason}"
                        </p>
                      </div>

                      <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
                        <h4 className="text-[10px] uppercase font-bold text-agri-leaf mb-2 tracking-widest">Care Instructions</h4>
                        <p className="text-agri-light font-sans leading-relaxed text-sm">
                          {prediction.care}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                  <button 
                    onClick={handleSaveReport}
                    className={`py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${isSaved ? 'bg-agri-leaf text-white' : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    {isSaved ? 'Report Saved!' : 'Save Report'}
                  </button>
                  <button 
                    onClick={handleNextSteps}
                    className="py-4 bg-agri-leaf hover:bg-agri-green rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    Next Steps <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Decorative Background for result */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-agri-leaf/20 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropPrediction;
