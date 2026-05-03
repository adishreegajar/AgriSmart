import { 
  ArrowRight, 
  TrendingUp, 
  CloudSun, 
  Users, 
  ShieldCheck, 
  Zap,
  BarChart3,
  MapPin,
  CheckCircle2,
  Leaf
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const stats = [
    { label: 'Farmers Connected', value: '10,000+', icon: Users },
    { label: 'Forecast Accuracy', value: '95%', icon: CloudSun },
    { label: 'Profit Improvement', value: '30%', icon: TrendingUp },
  ];

  const problems = [
    { title: 'Limited Market Access', desc: 'Farmers struggle to find buyers beyond local mandis.' },
    { title: 'Unstable Pricing', desc: 'Price fluctuations lead to unpredictable farm income.' },
    { title: 'Weather Uncertainty', desc: 'Sudden climate shifts can destroy months of hard work.' },
    { title: 'Information Gap', desc: 'Lack of real-time data on crop demand and government schemes.' },
  ];

  const solutions = [
    { 
      title: 'AI Crop Prediction', 
      desc: 'Advanced algorithms to forecast the best crops for your soil and season.',
      icon: Zap
    },
    { 
      title: 'Live Weather Monitoring', 
      desc: 'Hyper-local weather alerts and agricultural recommendations.',
      icon: CloudSun
    },
    { 
      title: 'Farmer Marketplace', 
      desc: 'Direct B2B connection to sell your produce at the best market rates.',
      icon: MapPin
    },
  ];

  return (
    <div className="overflow-x-hidden pt-16">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-agri-cream/30">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 animate-slide-up">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-agri-leaf/10 text-agri-leaf px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 animate-fade-in">
                <Leaf className="w-3.5 h-3.5" /> AI-Powered Agriculture
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-agri-dark mb-6 leading-tight">
              Smart Agriculture for Better <span className="text-agri-leaf italic">Farmer</span> Decisions
            </h1>
            <p className="text-lg text-agri-green/80 mb-10 max-w-xl font-sans leading-relaxed">
              AI-powered platform helping farmers access market prices, weather intelligence, crop demand forecasting, and direct selling opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="btn-solid bg-agri-dark text-white rounded-xl shadow-2xl flex items-center gap-2 group">
                Explore Platform <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/marketplace" className="px-8 py-3.5 rounded-xl font-bold bg-white text-agri-dark border border-agri-light/20 hover:bg-agri-cream transition-all">
                View Live Prices
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-agri-light/20">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 hover:-translate-y-1 transition-transform">
                  <p className="text-3xl font-heading font-bold text-agri-dark">{stat.value}</p>
                  <p className="text-xs font-sans text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-700 aspect-square md:aspect-video lg:aspect-auto h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop" 
                alt="AgriSmart Field" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-agri-dark/40 to-transparent" />
            </div>
            {/* Animated Decorative Element */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-agri-leaf opacity-20 blur-[120px] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-agri-dark mb-6">Real-World Farming Challenges</h2>
            <p className="text-agri-green/80 font-sans">Indian small-scale farmers face systemic barriers that we are here to break down.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problems.map((prob, idx) => (
              <div 
                key={idx}
                className="p-8 bg-agri-cream/30 rounded-[2rem] border border-agri-light/5 hover:border-agri-leaf/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-agri-leaf mb-6 shadow-sm">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-agri-dark mb-4">{prob.title}</h3>
                <p className="text-sm text-gray-500 font-sans leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 bg-agri-dark text-white rounded-[4rem] mx-4 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <span className="text-agri-leaf font-bold uppercase tracking-widest text-xs mb-4 block">Our Solutions</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">AI-Driven Impact for Higher Farm Yields</h2>
            </div>
            <Link to="/signup" className="group flex items-center gap-4 text-agri-leaf border-b-2 border-agri-leaf pb-2 font-bold mb-4">
              Get Started Now <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {solutions.map((sol, idx) => (
              <div 
                key={idx}
                className="group p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all duration-500"
              >
                <div className="bg-agri-leaf p-4 rounded-2xl w-fit mb-8 group-hover:rotate-6 transition-transform">
                  <sol.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{sol.title}</h3>
                <p className="text-agri-light font-sans text-sm leading-relaxed mb-8 opacity-80">{sol.desc}</p>
                <Link to="/signup" className="flex items-center gap-2 text-agri-leaf font-bold uppercase tracking-wider text-xs hover:gap-4 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-agri-leaf/10 blur-[150px] -skew-x-12 translate-x-1/2 pointer-events-none" />
      </section>

      {/* How It Works Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-square">
                  <img src="https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=400&h=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Farmer App Use" />
                </div>
                <div className="bg-agri-leaf p-8 rounded-[2rem] text-white">
                  <h4 className="text-3xl font-heading font-bold mb-2">95%</h4>
                  <p className="text-xs uppercase tracking-tighter opacity-80">Farmer Satisfaction Index</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-agri-green p-8 rounded-[2rem] text-white">
                  <h4 className="text-3xl font-heading font-bold mb-2">30%</h4>
                  <p className="text-xs uppercase tracking-tighter opacity-80">Average Profit Increase</p>
                </div>
                <div className="rounded-[2rem] overflow-hidden shadow-xl aspect-square">
                  <img src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=400&h=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Farmer Marketplace" />
                </div>
              </div>
            </div>
            {/* Background Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-agri-cream/50 -z-10 rounded-[3rem] rotate-3" />
          </div>
          <div>
            <span className="text-agri-leaf font-bold uppercase tracking-widest text-xs mb-4 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-agri-dark mb-12 leading-tight">Digital Empowerment in 3 Simple Steps</h2>
            <div className="space-y-10">
              {[
                { step: '01', title: 'Register & Land Profiling', desc: 'Farmers and buyers sign up. Farmers enter their location and crop details for tailored AI analysis.' },
                { step: '02', title: 'AI Intelligence Integration', desc: 'Platform analyzes hyper-local weather, soil health, and market trends to provide real-time recommendations.' },
                { step: '03', title: 'Connect & Prosper', desc: 'Experience direct selling in the marketplace, understand government schemes, and optimize your harvest.' },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="flex gap-6 translate-all"
                >
                  <div className="text-4xl font-heading font-bold text-agri-light/30 transition-all group-hover:text-agri-leaf">
                    {item.step}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-xl font-heading font-bold text-agri-dark mb-2">{item.title}</h4>
                    <p className="text-gray-500 font-sans text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-agri-cream/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto p-12 bg-white rounded-[3rem] shadow-2xl relative">
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-agri-leaf p-5 rounded-3xl shadow-xl">
              <Users className="text-white w-10 h-10" />
            </div>
            <p className="text-2xl md:text-3xl font-heading font-bold text-agri-dark mt-10 mb-10 italic leading-relaxed">
              "AgriSmart helped us sell directly and understand market trends before harvest. We saw a 30% increase in our profits this season."
            </p>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-agri-cream flex items-center justify-center border-2 border-agri-leaf mb-4 font-bold text-agri-green">
                RS
              </div>
              <h5 className="font-heading font-bold text-xl text-agri-dark">Rajesh Singh</h5>
              <p className="text-xs uppercase tracking-widest text-agri-leaf font-bold">Ludhiana, Punjab Farmer</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
