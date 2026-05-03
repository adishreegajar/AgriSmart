import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import AddListing from './pages/AddListing';
import EditListing from './pages/EditListing';
import MyListings from './pages/MyListings';
import Weather from './pages/Weather';
import Schemes from './pages/Schemes';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import CropPrediction from './pages/CropPrediction';
import HelpCenter from './pages/HelpCenter';
import FarmersGuide from './pages/FarmersGuide';
import Pricing from './pages/Pricing';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/add-listing" element={<AddListing />} />
      <Route path="/edit-listing/:id" element={<EditListing />} />
      <Route path="/my-listings" element={<MyListings />} />
      <Route path="/weather-insights" element={<Weather />} />
      <Route path="/government-schemes" element={<Schemes />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/crop-prediction" element={<CropPrediction />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/guide" element={<FarmersGuide />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <ScrollToTop />
          <Layout>
            <MainRoutes />
          </Layout>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
