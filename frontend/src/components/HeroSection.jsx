import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToMenu = () => {
    const element = document.querySelector('#menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1529044731917-db2e35c4b7a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxsYSUyMGNhdHJpbmElMjBkaWElMjBkZSUyMGxvcyUyMG11ZXJ0b3MlMjBhcnRpc3RpYyUyMG1ha2V1cCUyMHBvcnRyYWl0fGVufDB8fHx8MTc3MzM3NjA5NHww&ixlib=rb-4.1.0&q=85')`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-catrina-bg/40 via-catrina-bg/60 to-catrina-bg" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-accent text-catrina-orange text-lg md:text-xl tracking-[0.3em] mb-4"
        >
          INDEPENDENCE, MO
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-catrina-cream tracking-widest mb-6"
        >
          CATRINA'S
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-accent text-2xl sm:text-3xl md:text-4xl text-catrina-gold tracking-[0.2em] mb-8"
        >
          TACOS & TEQUILAS
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-body text-catrina-muted text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Authentic Mexican cuisine celebrating life, flavor, and tradition. 
          Tacos to die for, spirits high, and memories eternal.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#order"
            data-testid="hero-order-btn"
            className="btn-primary text-lg px-10 py-4 animate-pulse-glow"
          >
            Order Online
          </a>
          <a
            href="#waitlist"
            data-testid="hero-waitlist-btn"
            className="btn-secondary text-lg px-10 py-4"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#waitlist')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Join Waitlist
          </a>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToMenu}
        data-testid="hero-scroll-indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-catrina-cream/60 hover:text-catrina-orange transition-colors animate-float"
      >
        <ChevronDown size={40} />
      </motion.button>
    </section>
  );
};

export default HeroSection;
