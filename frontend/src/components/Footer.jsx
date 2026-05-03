import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Globe, Share2, User } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-agri-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-agri-leaf p-2 rounded-lg">
                <Leaf className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight text-white">
                Agri<span className="text-agri-leaf">Smart</span>
              </span>
            </Link>
            <p className="text-agri-light text-sm leading-relaxed font-sans max-w-xs">
              Empowering small-scale farmers across India with AI-driven insights and direct market access. Farm smarter, grow better.
            </p>
            <div className="flex gap-4">
              {[Globe, Mail, Share2, User].map((Icon, idx) => (
                <button key={idx} className="p-2.5 bg-white/5 rounded-full hover:bg-agri-leaf hover:scale-110 transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-8">Platform</h4>
            <ul className="space-y-4">
              {['Marketplace', 'Weather Insights', 'Government Schemes', 'Crop Prediction'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-agri-light text-sm hover:text-white hover:translate-x-1 transition-all inline-block font-sans">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-8">Resources</h4>
            <ul className="space-y-4">
              {[
                { name: 'Help Center', path: '/help' },
                { name: 'Farmers Guide', path: '/guide' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-agri-light text-sm hover:text-white hover:translate-x-1 transition-all inline-block font-sans">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-agri-leaf shrink-0 mt-1" />
                <span className="text-agri-light text-sm font-sans">Sector 17, Chandigarh, Punjab, India - 160017</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-agri-leaf shrink-0" />
                <span className="text-agri-light text-sm font-sans">+91 1800-456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-agri-leaf shrink-0" />
                <span className="text-agri-light text-sm font-sans">support@agrismart.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-agri-light font-sans tracking-wide">
            &copy; {currentYear} AgriSmart Technologies Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] uppercase font-bold tracking-widest text-agri-light opacity-50">Scientific Precision</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-agri-light opacity-50">Organic Trust</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-agri-light opacity-50">Farmer First</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
