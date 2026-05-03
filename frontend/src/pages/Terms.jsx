import { Shield, FileText, ScrollText, AlertCircle } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using the AgriSmart platform, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services."
    },
    {
      title: "2. Farmer Code of Conduct",
      content: "Farmers using the platform are expected to provide accurate information regarding crop quality, quantity, and soil health. Misrepresentation of produce may lead to account suspension."
    },
    {
      title: "3. Buyer Obligations",
      content: "Buyers must honor confirmed orders and market price agreements. AgriSmart reserves the right to mediate disputes but is not liable for defaulted payments outside our escrow system."
    },
    {
      title: "4. Intellectual Property",
      content: "All AI models, data analytics, and UI designs are the intellectual property of AgriSmart Technologies Pvt Ltd. No scraping or copying of market data is permitted."
    },
    {
      title: "5. Limitation of Liability",
      content: "While our weather and crop predictions are highly accurate, they are estimates based on available data. AgriSmart is not liable for crop losses or financial decisions made based on platform insights."
    }
  ];

  return (
    <div className="min-h-screen bg-agri-cream/20 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-xl border border-agri-light/10 overflow-hidden relative">
          <div className="bg-agri-dark text-white p-12 md:p-16 relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-agri-leaf px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 inline-block">Legal</span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 flex items-center gap-4">
                <FileText className="w-10 h-10 text-agri-leaf" /> Terms of Service
              </h1>
              <p className="text-agri-light opacity-60 font-sans">Last updated: April 2026</p>
            </div>
            <ScrollText className="absolute top-1/2 -right-10 w-64 h-64 text-white/5 -translate-y-1/2 rotate-12 pointer-events-none" />
          </div>

          <div className="p-10 md:p-16 space-y-12">
            <div className="p-6 bg-agri-cream/30 rounded-3xl border border-agri-leaf/10 flex items-start gap-4">
              <Shield className="text-agri-leaf shrink-0 w-6 h-6 mt-1" />
              <p className="text-sm font-sans text-agri-dark leading-relaxed italic">
                Our mission is to protect both farmers and buyers while digitizing Indian agriculture. These terms ensure a fair, transparent marketplace for everyone.
              </p>
            </div>

            <div className="space-y-10">
              {sections.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-2xl font-heading font-bold text-agri-dark mb-4">{section.title}</h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 text-agri-leaf font-bold">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">Questions about these terms?</span>
              </div>
              <button className="bg-agri-dark text-white px-8 py-3 rounded-xl font-bold hover:bg-agri-leaf transition-all shadow-xl">
                Contact Legal Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
