import { Check, Zap, Building, Users, Star } from 'lucide-react';

const Pricing = () => {
  const tiers = [
    {
      name: "Farmer Free",
      price: "₹0",
      target: "For Individual Farmers",
      features: [
        "Unlimited Crop Listings",
        "Live Weather Insights",
        "Basic Crop Prediction",
        "Scheme Access",
        "General Marketplace Chat"
      ],
      cta: "Join as Farmer",
      featured: false,
      icon: Users
    },
    {
      name: "Smart Buyer",
      price: "₹999",
      period: "/month",
      target: "For Traders & Corporates",
      features: [
        "Bulk Buying Access",
        "Advanced Demand Trends",
        "Sourcing Analytics",
        "Verified Seller Contacts",
        "Priority Support",
        "Logistics Integration"
      ],
      cta: "Become a Buyer",
      featured: true,
      icon: Star
    },
    {
      name: "Agri Enterprise",
      price: "Custom",
      target: "For Industry Leaders",
      features: [
        "API Data Access",
        "Supply Chain Management",
        "Custom Sustainability Reports",
        "Regional Trend API",
        "Dedicated Account Manager"
      ],
      cta: "Contact Sales",
      featured: false,
      icon: Building
    }
  ];

  return (
    <div className="min-h-screen bg-agri-cream/20 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-agri-leaf/10 text-agri-leaf px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-agri-leaf/10">
            <Zap className="w-4 h-4" /> Scalable Agriculture
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-agri-dark mb-6">Simple Pricing for Everyone</h1>
          <p className="text-agri-green/80 font-sans leading-relaxed">
            Free forever for farmers. Premium intelligence and direct sourcing power for buyers and agri-enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative bg-white rounded-[3rem] p-10 border transition-all duration-500 hover:shadow-2xl ${tier.featured ? 'border-agri-leaf ring-4 ring-agri-leaf/5 shadow-xl scale-105 z-10' : 'border-agri-light/10 shadow-sm'}`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-agri-leaf text-white px-6 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${tier.featured ? 'bg-agri-leaf text-white' : 'bg-agri-cream text-agri-green'}`}>
                  <tier.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-agri-dark mb-2">{tier.name}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8">{tier.target}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-heading font-bold text-agri-dark">{tier.price}</span>
                  {tier.period && <span className="text-gray-400 font-sans">{tier.period}</span>}
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {tier.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <div className={`p-1 rounded-full ${tier.featured ? 'bg-agri-leaf text-white' : 'bg-agri-cream text-agri-leaf'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-sm text-gray-500 font-sans">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95 ${tier.featured ? 'bg-agri-leaf text-white hover:bg-agri-green shadow-agri-leaf/20' : 'bg-white text-agri-dark border border-agri-light/20 hover:bg-agri-cream shadow-agri-dark/5'}`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-4xl mx-auto text-center p-12 bg-agri-dark rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-heading font-bold mb-6">Need a custom solution for your region?</h2>
            <p className="text-agri-light opacity-70 mb-10 font-sans">
              We work with NGOs, cooperatives, and government bodies to digitize agricultural ecosystems at scale.
            </p>
            <button className="bg-agri-leaf text-white px-10 py-4 rounded-2xl font-bold hover:bg-agri-green transition-all shadow-lg flex items-center gap-2 mx-auto">
              Schedule a Demo
            </button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-agri-leaf/10 rounded-full blur-[80px]" />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
