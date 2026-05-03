import { HelpCircle, MessageCircle, Phone, Mail, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { 
      q: "How do I sell my crops on AgriSmart?", 
      a: "To sell your crops, navigate to the Marketplace and click 'Add Listing'. Fill in the details about your crop, quantity, and price. Buyers will then be able to see your listing and contact you directly." 
    },
    { 
      q: "Is the weather data accurate for my specific village?", 
      a: "Yes, we use hyper-local weather data based on the city/region you provide. Our forecasting models are specifically tuned for agricultural needs, providing 95% accuracy for short-term forecasts." 
    },
    { 
      q: "How does the Crop Prediction engine work?", 
      a: "Our AI engine analyzes your soil type, climate data (temperature and humidity), and current market demand to recommend crops that have the highest probability of a successful harvest and good market price." 
    },
    { 
      q: "Are the government schemes updated in real-time?", 
      a: "We pull data from official government portals and agricultural departments daily to ensure you have the most up-to-date information on subsidies, grants, and support programs." 
    }
  ];

  return (
    <div className="min-h-screen bg-agri-cream/20 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-agri-dark mb-6">How can we help you today?</h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or issues..." 
              className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl shadow-xl border border-agri-light/10 outline-none focus:ring-4 focus:ring-agri-leaf/10 transition-all font-sans"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
          {[
            { icon: MessageCircle, title: "Chat with Support", desc: "Average response time: 2 hours", color: "bg-blue-50 text-blue-500" },
            { icon: Mail, title: "Email Us", desc: "support@agrismart.in", color: "bg-orange-50 text-orange-500" },
            { icon: Phone, title: "Call Helpline", desc: "1800-456-7890 (Toll Free)", color: "bg-green-50 text-green-500" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-agri-light/10 shadow-sm hover:shadow-xl transition-all text-center group">
              <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-bold text-agri-dark mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 font-sans">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-agri-light/10">
          <h2 className="text-3xl font-heading font-bold text-agri-dark mb-10 flex items-center gap-3">
            <HelpCircle className="text-agri-leaf" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-6 flex justify-between items-center text-left hover:text-agri-leaf transition-colors focus:outline-none"
                >
                  <span className="font-bold text-agri-dark font-sans pr-8">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="shrink-0" /> : <ChevronDown className="shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="pb-6 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-gray-500 font-sans text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
