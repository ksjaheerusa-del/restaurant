import "@/index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import DrinksSection from "./components/DrinksSection";
import ReviewsSection from "./components/ReviewsSection";
import WaitlistSection from "./components/WaitlistSection";
import GallerySection from "./components/GallerySection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-catrina-bg">
        {/* Grain overlay */}
        <div className="grain-overlay" />
        
        <Navigation />
        
        <main>
          <HeroSection />
          <AboutSection />
          <MenuSection />
          <DrinksSection />
          <ReviewsSection />
          <WaitlistSection />
          <GallerySection />
          <ContactSection />
        </main>
        
        <Footer />
        <ChatWidget />
        <Toaster position="top-right" richColors />
      </div>
    </BrowserRouter>
  );
}

export default App;
