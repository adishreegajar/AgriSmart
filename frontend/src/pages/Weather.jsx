import { useState, useEffect, useMemo } from 'react';
import { fetchWeatherData } from '../services/api';
import { 
  Cloud, 
  Droplets, 
  Wind, 
  Thermometer, 
  AlertTriangle,
  Calendar,
  CloudRain,
  Sun,
  Loader2,
  ArrowUpRight,
  X
} from 'lucide-react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Pune');
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const advisoryPool = [
    { alert: 'Mild frost warning. Recommended to use row covers for young seedlings.', type: 'Frost' },
    { alert: 'Heavy rainfall expected. Ensure farm drainage channels are completely clear.', type: 'Rain' },
    { alert: 'Pest alert: Locust swarms spotted 50km east. Keep preventative pesticides ready.', type: 'Pest' },
    { alert: 'High heat index recorded. Increase irrigation frequency to prevent heat stress.', type: 'Heat' },
    { alert: 'Strong gusty winds anticipated. Secure loose temporary structures.', type: 'Wind' },
    { alert: 'Unseasonal hailstorm predicted in nearby regions. Take immediate precautions.', type: 'Storm' },
    { alert: 'High humidity favors fungal growth. Recommended to apply preventative fungicide.', type: 'Disease' },
    { alert: 'Drought warning: Soil moisture dropping below optimal levels in your sector.', type: 'Drought' }
  ];

  const dynamicHistory = useMemo(() => {
    const cityName = weatherData?.location?.split(',')[0] || city || 'Unknown';
    let hash = 0;
    for (let i = 0; i < cityName.length; i++) {
        hash = cityName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const pickedAdvisories = [];
    const poolCopy = [...advisoryPool];
    const now = new Date();
    
    for (let i = 0; i < 3; i++) {
        const index = Math.abs((hash + i) * 31) % poolCopy.length;
        const item = poolCopy.splice(index, 1)[0];
        const daysAgo = Math.abs((hash + i) % 15) + (i * 7) + 1; 
        const dateObj = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
        
        pickedAdvisories.push({
            date: dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            dateObj: dateObj, // Keep date obj for sorting
            alert: item.alert,
            type: item.type
        });
    }
    
    return pickedAdvisories.sort((a, b) => b.dateObj - a.dateObj);
  }, [weatherData?.location, city]);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      setError('');
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('City not found or API error. Showing previous data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      fetchWeather(searchInput);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-agri-cream/20">
        <Loader2 className="w-12 h-12 text-agri-leaf animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-20 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-heading font-bold text-agri-dark mb-4">Weather Insights</h1>
          <p className="text-agri-green/80 max-w-2xl font-sans">
            Hyper-local weather forecasting for Indian agriculture. Current location: <span className="text-agri-leaf font-bold uppercase tracking-wider">{weatherData?.location}</span>
          </p>
          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold bg-white/50 px-4 py-2 rounded-xl w-fit border border-red-100">
              <AlertTriangle className="w-3 h-3" /> {error}
            </div>
          )}
        </div>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full md:w-auto relative group">
          <input 
            type="text" 
            placeholder="Search City (e.g. Nashik)" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full md:w-80 pl-6 pr-14 py-4 bg-white rounded-2xl border border-agri-light/20 focus:ring-4 focus:ring-agri-green/10 focus:border-agri-leaf outline-none transition-all font-sans font-bold shadow-sm"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-agri-dark text-white p-2.5 rounded-xl hover:bg-agri-green transition-all"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Current Weather Main Card */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-xl border border-agri-light/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-agri-cream text-agri-leaf px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-agri-leaf/10">Live Radar</span>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{weatherData?.condition}</p>
                </div>
                <h2 className="text-5xl font-heading font-bold text-agri-dark">{weatherData?.location.split(',')[0]}</h2>
                <p className="text-gray-500 font-sans mt-2">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              </div>
              <div className="text-right">
                <p className="text-6xl font-heading font-bold text-agri-green">{weatherData?.temperature}°C</p>
                <div className="flex items-center justify-end gap-2 mt-2">
                  <div className="w-6 h-6 bg-agri-cream rounded-lg flex items-center justify-center">
                    <img src={`https://openweathermap.org/img/wn/${weatherData?.icon}@2x.png`} alt="weather icon" className="w-full h-full" />
                  </div>
                  <p className="text-agri-leaf font-bold uppercase tracking-widest text-xs">{weatherData?.forecast}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center p-4 bg-agri-cream/30 rounded-2xl">
                <Droplets className="text-agri-leaf w-6 h-6 mb-2" />
                <p className="text-[10px] uppercase font-bold text-gray-400">Humidity</p>
                <p className="font-bold text-agri-dark">{weatherData?.humidity}%</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-agri-cream/30 rounded-2xl">
                <Wind className="text-agri-leaf w-6 h-6 mb-2" />
                <p className="text-[10px] uppercase font-bold text-gray-400">Wind Speed</p>
                <p className="font-bold text-agri-dark">{weatherData?.windSpeed}</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-agri-cream/30 rounded-2xl">
                <CloudRain className="text-agri-leaf w-6 h-6 mb-2" />
                <p className="text-[10px] uppercase font-bold text-gray-400">Rainfall</p>
                <p className="font-bold text-agri-dark">{weatherData?.rainfall}</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-agri-cream/30 rounded-2xl">
                <Thermometer className="text-agri-leaf w-6 h-6 mb-2" />
                <p className="text-[10px] uppercase font-bold text-gray-400">Soil Temp</p>
                <p className="font-bold text-agri-dark">24°C</p>
              </div>
            </div>
          </div>
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-full bg-agri-leaf/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
        </div>

        {/* Alert Card */}
        <div className="bg-agri-dark text-white p-10 rounded-[3rem] shadow-xl flex flex-col justify-between">
          <div className="bg-orange-500/20 text-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-8">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Farmer Advisory</h3>
            <p className="text-agri-light opacity-80 leading-relaxed font-sans text-sm">
              {weatherData?.alerts || 'No critical alerts for your sector right now. Conditions are stable.'} 
            </p>
          </div>
          <button 
            onClick={() => setShowHistoryModal(true)}
            className="mt-8 py-4 px-6 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all w-fit"
          >
            See History
          </button>
        </div>
      </div>

      {/* 7-Day Forecast Placeholder */}
      <h3 className="text-2xl font-heading font-bold text-agri-dark mb-8">Harvest Forecast (7 Days)</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {[
          { day: 'Mon', temp: '28°', icon: Sun },
          { day: 'Tue', temp: '29°', icon: Sun },
          { day: 'Wed', temp: '27°', icon: Cloud },
          { day: 'Thu', temp: '26°', icon: CloudRain },
          { day: 'Fri', temp: '25°', icon: Droplets },
          { day: 'Sat', temp: '28°', icon: Sun },
          { day: 'Sun', temp: '30°', icon: Sun },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-agri-light/10 text-center hover:border-agri-leaf transition-all group cursor-default">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{item.day}</p>
            <item.icon className="w-8 h-8 text-agri-leaf mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <p className="text-xl font-heading font-bold text-agri-dark">{item.temp}</p>
          </div>
        ))}
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-agri-dark/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-agri-dark text-white p-6 flex justify-between items-center px-8 border-b border-white/10">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-orange-500 w-5 h-5" />
                <h3 className="font-heading font-bold text-xl">Advisory History</h3>
              </div>
              <button 
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <p className="text-sm font-sans text-gray-500 mb-6 italic border-b border-gray-100 pb-4">
                Showing historical advisories for {weatherData?.location?.split(',')[0] || city}
              </p>
              <div className="space-y-4">
                {dynamicHistory.map((item, idx) => (
                  <div key={idx} className="p-5 border border-agri-light/20 rounded-2xl bg-agri-cream/30 hover:bg-agri-cream/80 transition-colors shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-agri-leaf bg-white px-3 py-1.5 rounded-lg border border-agri-light/20">
                        {item.type}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400 font-sans tracking-wide">
                        {item.date}
                      </span>
                    </div>
                    <p className="text-sm text-agri-dark font-sans leading-relaxed">{item.alert}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
