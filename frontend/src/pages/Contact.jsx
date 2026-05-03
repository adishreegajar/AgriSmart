import { useState } from 'react';
import { submitContactMessage } from '../services/api';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Globe, 
  Share2,
  AlertCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-20">
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl font-heading font-bold text-agri-dark mb-4">Get in Touch</h1>
        <p className="text-agri-green/80 font-sans">Have questions about our platform or need agricultural assistance? Our team is here to help you grow.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-agri-dark text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <h2 className="text-3xl font-heading font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-agri-leaf flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-agri-light opacity-50 font-bold mb-1">Call Us</p>
                  <p className="text-lg font-bold">+91 1800 456 7890</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-agri-leaf flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-agri-light opacity-50 font-bold mb-1">Email Us</p>
                  <p className="text-lg font-bold">support@agrismart.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-agri-leaf flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-agri-light opacity-50 font-bold mb-1">Our Office</p>
                  <p className="text-lg font-bold">12, Green Park Avenue, <br />Ludhiana, Punjab - 141001</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-16 flex gap-4 relative z-10">
              {[Globe, Share2, Mail, MessageSquare].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-agri-leaf transition-colors group">
                  <Icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>

            {/* Decorative Shape */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-agri-leaf opacity-10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="bg-agri-cream/30 p-10 rounded-[3rem] border border-agri-light/5">
            <h3 className="text-xl font-heading font-bold text-agri-dark mb-4">Farmer Support 24/7</h3>
            <p className="text-sm text-gray-500 font-sans leading-relaxed mb-6">Our dedicated helpdesk is specifically trained to assist with marketplace transactions and technical platform usage.</p>
            <div className="flex items-center gap-3 text-agri-green font-bold">
              <MessageSquare className="w-5 h-5" />
              <span>Start Live Chat</span>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:col-span-7 bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border border-agri-light/10">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-20 h-20 bg-agri-leaf/10 rounded-full flex items-center justify-center text-agri-leaf mb-6">
                <Send className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-agri-dark mb-4">Message Sent!</h2>
              <p className="text-gray-500 max-w-sm mb-8 font-sans">Thank you for reaching out. We've received your inquiry and our team will get back to you within 24 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-agri-leaf font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-heading font-bold text-agri-dark mb-10">Send us a Message</h2>
              
              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-sans flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 font-sans">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Rajesh Singh"
                      className="w-full px-6 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 font-sans">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="rajesh@example.com"
                      className="w-full px-6 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 font-sans">Subject</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Inquiry about selling crops"
                    className="w-full px-6 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 font-sans">Your Message</label>
                  <textarea 
                    rows="6"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="How can we help you?"
                    className="w-full px-6 py-4 bg-agri-cream/50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-agri-green/20 focus:border-agri-green/30 outline-none transition-all font-sans resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-agri-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-agri-green transition-all shadow-xl shadow-agri-dark/10 group overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="mt-20 h-96 bg-agri-cream rounded-[3rem] overflow-hidden relative border border-agri-light/10">
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-8">
          <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl max-w-sm">
            <MapPin className="text-agri-green w-10 h-10 mx-auto mb-4" />
            <h4 className="font-heading font-bold text-xl text-agri-dark mb-2">Our Presence</h4>
            <p className="text-sm text-gray-500 font-sans">We have physical centers across Punjab, Haryana, and Rajasthan. Visit us for on-ground assistance.</p>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop" 
          alt="Map Background" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>
    </div>
  );
};

export default Contact;
