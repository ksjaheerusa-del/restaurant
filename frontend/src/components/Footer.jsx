import { Instagram, Facebook, Music2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="order"
      data-testid="footer-section"
      className="bg-catrina-bg border-t border-catrina-card"
    >
      {/* Order Online Banner */}
      <div className="bg-catrina-orange py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="font-accent text-catrina-bg tracking-wider mb-2">
            READY TO ORDER?
          </p>
          <h3 className="font-display text-3xl md:text-4xl text-catrina-bg tracking-wider mb-4">
            ORDER ONLINE NOW
          </h3>
          <a
            href="https://order.catrinastacos.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="footer-order-btn"
            className="inline-block bg-catrina-bg text-catrina-cream font-bold uppercase tracking-widest px-8 py-4 hover:bg-catrina-paper transition-colors"
          >
            Start Your Order
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {/* Brand */}
            <div>
              <h4 className="font-display text-3xl text-catrina-cream tracking-wider mb-4">
                CATRINA'S
              </h4>
              <p className="text-catrina-muted leading-relaxed">
                Authentic Mexican cuisine celebrating life, flavor, and tradition 
                in Independence, Missouri.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-accent text-catrina-gold tracking-wider mb-4">
                QUICK LINKS
              </h5>
              <div className="space-y-2">
                <a href="#menu" className="block text-catrina-muted hover:text-catrina-orange transition-colors">
                  Menu
                </a>
                <a href="#waitlist" className="block text-catrina-muted hover:text-catrina-orange transition-colors">
                  Reservations
                </a>
                <a href="#contact" className="block text-catrina-muted hover:text-catrina-orange transition-colors">
                  Contact
                </a>
                <a href="#gallery" className="block text-catrina-muted hover:text-catrina-orange transition-colors">
                  Gallery
                </a>
              </div>
            </div>

            {/* Social */}
            <div>
              <h5 className="font-accent text-catrina-gold tracking-wider mb-4">
                FOLLOW US
              </h5>
              <div className="flex justify-center md:justify-start gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="social-instagram"
                  className="p-3 bg-catrina-card text-catrina-cream hover:bg-catrina-orange hover:text-catrina-bg transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="social-facebook"
                  className="p-3 bg-catrina-card text-catrina-cream hover:bg-catrina-orange hover:text-catrina-bg transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="social-tiktok"
                  className="p-3 bg-catrina-card text-catrina-cream hover:bg-catrina-orange hover:text-catrina-bg transition-colors"
                >
                  <Music2 className="w-5 h-5" />
                </a>
              </div>
              <p className="text-catrina-muted text-sm mt-4">
                @CatrinasTacos
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-catrina-card flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-catrina-muted text-sm">
              © {currentYear} Catrina's Tacos & Tequilas. All rights reserved.
            </p>
            <p className="text-catrina-muted text-sm">
              19801 E Valley View Pkwy, Independence, MO 64057
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
