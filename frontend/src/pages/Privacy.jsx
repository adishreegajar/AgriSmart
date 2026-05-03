import { ShieldCheck, Eye, Lock, Globe, Database } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      title: "Data Collection",
      icon: Database,
      content: "We collect information provided during registration (Name, Phone, Location) and agricultural data (Soil health, Crop types) to provide personalized insights."
    },
    {
      title: "How We Use Your Data",
      icon: Globe,
      content: "Your data is used to generate weather alerts, crop predictions, and to facilitate marketplace connections. Aggregated, anonymized data may be used for regional agricultural trend reports."
    },
    {
      title: "Sharing Information",
      icon: Eye,
      content: "We never sell your personal data to third-party advertisers. Farmer information is shared with buyers only when a transaction or inquiry is initiated by you."
    },
    {
      title: "Security Measures",
      icon: Lock,
      content: "We use enterprise-grade encryption and secure database protocols to ensure that your farm records and sensitive profile details are always protected."
    }
  ];

  return (
    <div className="min-h-screen bg-agri-cream/20 pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="w-20 h-20 bg-agri-leaf rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl rotate-3">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-agri-dark mb-6">Our Privacy Policy</h1>
          <p className="text-agri-green/80 font-sans leading-relaxed max-w-2xl mx-auto">
            At AgriSmart, we believe your personal data and farm records belong to you. We are committed to transparency and security in how we handle your information.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-agri-light/10 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-12 h-12 bg-agri-cream rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <section.icon className="w-6 h-6 text-agri-leaf" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-agri-dark mb-4">{section.title}</h3>
              <p className="text-gray-500 font-sans text-sm leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto p-12 bg-white rounded-[3rem] border border-agri-light/10 shadow-lg text-center">
          <h2 className="text-2xl font-heading font-bold text-agri-dark mb-4">Your Rights</h2>
          <p className="text-sm text-gray-500 font-sans leading-relaxed mb-8">
            You have the right to access, correct, or delete your personal information at any time. You can manage your data settings directly from your Profile page or contact us for assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-agri-dark text-white rounded-xl font-bold shadow-xl hover:bg-agri-leaf transition-all">
              Request Data Download
            </button>
            <button className="px-8 py-3 bg-white text-agri-dark border border-agri-light/20 rounded-xl font-bold hover:bg-agri-cream transition-all">
              Contact Privacy Officer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
