import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { fetchDashboardData, fetchWeatherData, fetchCropPrices, fetchRecommendation } from '../services/api';
import { 
  TrendingUp, 
  Cloud, 
  Droplets, 
  Wind, 
  Thermometer, 
  ArrowUpRight, 
  Zap,
  Loader2
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardContent = async () => {
      try {
        const city = user?.location?.split(',')[0] || 'Pune';
        const results = await Promise.allSettled([
          fetchDashboardData(),
          fetchWeatherData(city),
          fetchCropPrices(),
        ]);
        
        const dashRes = results[0].status === 'fulfilled' ? results[0].value : null;
        const weatherRes = results[1].status === 'fulfilled' ? results[1].value : null;
        const priceRes = results[2].status === 'fulfilled' ? results[2].value : [];

        if (results[0].status === 'rejected') console.error('Dashboard Error:', results[0].reason);
        if (results[1].status === 'rejected') console.error('Weather Error:', results[1].reason);
        if (results[2].status === 'rejected') console.error('Price Error:', results[2].reason);

        // Merge dashboard data with fetched prices and dynamic AI recs
        // Fallback to dashRes default cropPrices if price api fails
        setDashboardData({
          ...(dashRes || {}),
          cropPrices: (priceRes && priceRes.length > 0) ? priceRes.slice(0, 6) : (dashRes?.cropPrices || []),
          aiRecommendation: dashRes?.aiRecommendation
        });
        
        if (weatherRes) setWeatherData(weatherRes);
      } catch (error) {
        console.error('Error in dashboard initialization:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardContent();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-agri-cream/20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-agri-leaf animate-spin mx-auto mb-4" />
          <p className="text-agri-dark font-heading font-bold text-xl uppercase tracking-widest">Hydrating Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20 md:pt-24 pb-12">
      <div className="mb-8 md:mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-agri-dark mb-2">Farmer Dashboard</h1>
        <p className="text-sm md:text-base text-agri-green/80 font-sans">Welcome back{user?.name ? `, ${user.name}` : ''}. Here's what's happening on your farm today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Weather Widget */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-agri-light/20 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm text-gray-500 font-sans mb-1">Local Weather</p>
              <h3 className="text-2xl font-heading font-bold text-agri-dark">{weatherData?.location || 'Ludhiana, Punjab'}</h3>
            </div>
            <div className="bg-agri-cream p-3 rounded-full">
              <Cloud className="text-agri-leaf w-6 h-6" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-agri-cream flex items-center justify-center rounded-lg">
                <Thermometer className="w-5 h-5 text-agri-green" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Temp</p>
                <p className="font-bold text-agri-dark">{weatherData?.temperature}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-agri-cream flex items-center justify-center rounded-lg">
                <Droplets className="w-5 h-5 text-agri-green" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Humidity</p>
                <p className="font-bold text-agri-dark">{weatherData?.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-agri-cream flex items-center justify-center rounded-lg">
                <Wind className="w-5 h-5 text-agri-green" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Wind</p>
                <p className="font-bold text-agri-dark">{weatherData?.windSpeed}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-agri-cream flex items-center justify-center rounded-lg">
                <Zap className="w-5 h-5 text-agri-green" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Soil Moisture</p>
                <p className="font-bold text-agri-dark">{weatherData?.soilMoisture || '34%'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Suggestions Card */}
        <div className="lg:col-span-2 bg-agri-dark p-6 md:p-8 rounded-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-agri-leaf px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 inline-block">AI Decision Support</span>
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">Recommendation for {dashboardData?.aiRecommendation?.crop || 'Mustard'}</h3>
            <p className="text-sm md:text-base text-agri-light max-w-lg mb-6 leading-relaxed">
              {dashboardData?.aiRecommendation?.reason || 'Based on local trends, we recommend preparing for harvest.'} Confidence: <span className="text-agri-leaf font-bold">{dashboardData?.aiRecommendation?.confidence}</span>
            </p>
            <Link 
              to={`/crop-prediction?city=${user?.location?.split(',')[0] || 'Pune'}`}
              className="w-full md:w-auto bg-white text-agri-dark px-6 py-3 rounded-lg font-bold hover:bg-agri-leaf hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              Generate Detailed Plan <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          {/* Decorative SVG Pattern */}
          <div className="absolute top-0 right-0 w-64 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.5" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Crop Prices */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-agri-light/20 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xl font-heading font-bold text-agri-dark">Market Price Forecast</h3>
            <button className="text-agri-leaf text-sm font-bold hover:underline font-sans uppercase tracking-widest">Regional Mandis</button>
          </div>
          <div className="divide-y divide-gray-50">
            {dashboardData?.cropPrices?.map((crop, idx) => (
              <div key={idx} className="p-5 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-agri-cream rounded-lg flex items-center justify-center">
                    <span className="text-agri-green font-bold">{crop.name[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-agri-dark">{crop.name}</h4>
                    <p className="text-xs text-gray-400 font-sans">Market Trend: {crop.trend.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-agri-dark">{crop.price}</p>
                  <p className={`text-xs font-bold ${crop.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    Active Price Hub
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Summary & Trends */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-agri-light/20">
            <h3 className="text-xl font-heading font-bold text-agri-dark mb-6">Farmer Sales Hub</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-sans">Total Earnings</span>
                <span className="text-xl font-bold text-agri-green">{dashboardData?.salesSummary?.totalEarnings || '₹0'}</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-agri-leaf h-full rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${Math.min(
                      (parseInt((dashboardData?.salesSummary?.totalEarnings || '0').replace(/[^0-9]/g, '')) / 50000) * 100, 
                      100
                    )}%` 
                  }}
                ></div>
              </div>
              <Link 
                to="/my-listings"
                className="flex justify-between items-center pt-2 group cursor-pointer"
              >
                <span className="text-gray-500 font-sans group-hover:text-agri-leaf transition-colors">Active Listings</span>
                <span className="font-bold text-agri-dark bg-agri-cream px-2 py-0.5 rounded-lg group-hover:bg-agri-leaf group-hover:text-white transition-all">
                  {dashboardData?.salesSummary?.activeListings} items
                </span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-agri-light/20">
            <h3 className="text-xl font-heading font-bold text-agri-dark mb-6">Area Demand Velocity</h3>
            <div className="h-32 flex items-end justify-between gap-2 px-2">
              {dashboardData?.demandTrend?.map((trend, idx) => (
                <div key={idx} className="group relative flex-1">
                  <div 
                    style={{ height: `${trend.demand}%` }}
                    className="bg-agri-light group-hover:bg-agri-leaf rounded-t-sm transition-all duration-300"
                  />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400 font-bold uppercase">
                    {trend.month}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-center text-gray-400 font-sans italic">Regional demand trend for {user?.location || 'Your Region'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
