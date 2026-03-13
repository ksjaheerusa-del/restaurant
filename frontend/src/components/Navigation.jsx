import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#drinks', label: 'Drinks' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#waitlist', label: 'Reservations' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href) => {
    setIsMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      data-testid="main-navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-md bg-catrina-bg/90 border-b border-catrina-card'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            data-testid="nav-logo"
            className="font-display text-2xl md:text-3xl text-catrina-cream tracking-widest hover:text-catrina-orange transition-colors"
          >
            CATRINA'S
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className="text-catrina-cream uppercase tracking-widest text-sm font-bold hover:text-catrina-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Order Button - Desktop */}
          <a
            href="#order"
            data-testid="nav-order-btn"
            className="hidden lg:block btn-primary text-sm"
          >
            Order Now
          </a>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 text-catrina-cream hover:text-catrina-orange transition-colors"
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-catrina-bg border-t border-catrina-card"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                  className="text-catrina-cream uppercase tracking-widest text-base font-bold hover:text-catrina-orange transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#order"
                data-testid="mobile-order-btn"
                className="btn-primary text-center mt-4"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
