import { useState, useEffect } from 'react';
import { fetchSchemesData } from '../services/api';
import { 
  PlusCircle, 
  ChevronRight, 
  Search, 
  Filter, 
  MapPin, 
  BarChart3,
  CheckCircle2,
  Calendar,
  Loader2,
  FileText
} from 'lucide-react';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const data = await fetchSchemesData();
        setSchemes(data);
      } catch (error) {
        console.error('Error fetching schemes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSchemes();
  }, []);

  const filteredSchemes = schemes.filter(scheme => 
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-agri-cream/20">
        <Loader2 className="w-12 h-12 text-agri-leaf animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-heading font-bold text-agri-dark mb-4">Government Schemes</h1>
        <p className="text-agri-green/80 max-w-2xl font-sans">
          Central and state-level agricultural schemes and financial support portals for Indian farmers. Direct application links and eligibility verification.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search scheme name, category, or eligibility..." 
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-agri-green focus:outline-none transition-all shadow-sm font-sans"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-4 bg-agri-dark text-white rounded-xl font-bold hover:bg-agri-green transition-all shadow-lg active:scale-95">
          <Filter className="w-5 h-5 text-agri-leaf" />
          Filter Categories
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredSchemes.map((scheme) => (
          <div 
            key={scheme.id}
            className="group bg-white rounded-[2.5rem] p-8 md:p-10 border border-agri-light/10 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <span className="bg-agri-cream text-agri-green text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-agri-light/20">
                  {scheme.category}
                </span>
                <div className="bg-agri-leaf/10 p-3 rounded-2xl">
                  <FileText className="text-agri-leaf w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-agri-dark mb-4 leading-tight group-hover:text-agri-green transition-colors">
                {scheme.name}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-sans mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                {scheme.benefits}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 pt-6 border-t border-gray-50">
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="text-agri-leaf w-5 h-5 flex-shrink-0" />
                  <div>
                    <h5 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Eligibility</h5>
                    <p className="text-sm font-sans text-agri-dark leading-tight">{scheme.eligibility}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <Calendar className="text-agri-leaf w-5 h-5 flex-shrink-0" />
                  <div>
                    <h5 className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">Apply Before</h5>
                    <p className="text-sm font-sans text-agri-dark leading-tight">{scheme.deadline}</p>
                  </div>
                </div>
              </div>
            </div>

            <a 
              href={scheme.actionUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 bg-agri-cream text-agri-green rounded-2xl font-bold flex items-center justify-center gap-2 group-hover:bg-agri-dark group-hover:text-white transition-all shadow-sm active:scale-95 text-sm md:text-base"
            >
              Official Application Portal
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Background Shape Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-agri-leaf opacity-5 rounded-full blur-[50px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSchemes.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-100">
          <div className="w-20 h-20 bg-agri-cream rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-agri-leaf opacity-20" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-agri-dark mb-2">No matching schemes found</h3>
          <p className="text-gray-500 font-sans">Try adjusting your search or category filters.</p>
        </div>
      )}

      {/* Stats Board */}
      <div className="mt-20 p-12 bg-agri-dark text-white rounded-[3.5rem] relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 text-center">
          <div>
            <p className="text-4xl font-heading font-bold text-agri-leaf mb-2">₹12,400+ Cr</p>
            <p className="text-xs uppercase tracking-widest opacity-60">Allocated Budget 2026</p>
          </div>
          <div>
            <p className="text-4xl font-heading font-bold text-agri-leaf mb-2">10.2M</p>
            <p className="text-xs uppercase tracking-widest opacity-60">Farmers Benefited</p>
          </div>
          <div>
            <p className="text-4xl font-heading font-bold text-agri-leaf mb-2">150+</p>
            <p className="text-xs uppercase tracking-widest opacity-60">Verified Schemes</p>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-agri-leaf/10 -skew-y-3 pointer-events-none" />
      </div>
    </div>
  );
};

export default Schemes;
