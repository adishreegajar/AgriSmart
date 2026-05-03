import { BookOpen, Sprout, CloudRain, Droplets, Target, ShieldCheck, ArrowRight } from 'lucide-react';

const FarmersGuide = () => {
  const guides = [
    {
      title: "Crop Rotation Guide",
      desc: "Learn why rotating crops like legumes and cereals can restore soil nitrogen naturally.",
      icon: Sprout,
      color: "text-green-500",
      bg: "bg-green-50"
    },
    {
      title: "Efficient Irrigation",
      desc: "Drip vs Sprinkler: Choose the right irrigation method for your soil type and crop.",
      icon: Droplets,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "Price Strategy",
      desc: "How to use market data to price your produce competitively in the B2B marketplace.",
      icon: Target,
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    {
      title: "Organic Certification",
      desc: "Step-by-step process to get your farm certified and increase your crop value.",
      icon: ShieldCheck,
      color: "text-purple-500",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-agri-cream/20 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-agri-dark text-white p-12 md:p-16 mb-20 relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <span className="bg-agri-leaf px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">Knowledge Base</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Modern Farming Guide</h1>
            <p className="text-agri-light opacity-80 max-w-xl font-sans leading-relaxed mb-10">
              Master the art of high-yield agriculture with our expert-curated guides. From soil health to market dynamics, we've got you covered.
            </p>
            <button className="bg-white text-agri-dark px-8 py-3.5 rounded-xl font-bold hover:bg-agri-leaf hover:text-white transition-all flex items-center gap-2 group">
              Start Learning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <BookOpen className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 -rotate-12 pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-agri-light/10 shadow-sm hover:shadow-xl transition-all flex items-start gap-8 group">
              <div className={`${guide.bg} p-6 rounded-2xl shrink-0 group-hover:rotate-6 transition-transform`}>
                <guide.icon className={`w-8 h-8 ${guide.color}`} />
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-agri-dark mb-4">{guide.title}</h3>
                <p className="text-gray-500 font-sans text-sm leading-relaxed mb-6">
                  {guide.desc}
                </p>
                <button className="flex items-center gap-2 text-agri-leaf font-bold text-xs uppercase tracking-widest hover:gap-4 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Card */}
        <div className="max-w-6xl mx-auto mt-20 bg-white p-12 rounded-[3rem] border border-agri-light/10 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold text-agri-dark mb-6">Seasonal Planning: Preparing for Kharif</h2>
            <p className="text-gray-500 font-sans leading-relaxed mb-8">
              Proper planning before the monsoon can increase your yield by up to 20%. Our checklist covers seed selection, soil testing, and drainage preparation.
            </p>
            <div className="flex items-center gap-4 p-4 bg-agri-cream/30 rounded-2xl border border-agri-leaf/10 mb-8">
              <CloudRain className="text-agri-leaf w-6 h-6" />
              <p className="text-xs font-bold text-agri-green">Weather-based irrigation timing is crucial this week.</p>
            </div>
            <button className="btn-solid bg-agri-dark text-white px-8 py-3.5 rounded-xl font-bold shadow-xl">
              Get the Checklist
            </button>
          </div>
          <div className="rounded-[2rem] overflow-hidden aspect-video shadow-2xl">
            <img src="https://images.unsplash.com/photo-1592982537447-6f2a6aef739e?q=80&w=1200&auto=format&fit=crop" alt="Farming planning" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmersGuide;
