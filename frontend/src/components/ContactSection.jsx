import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const hours = [
  { day: 'Sunday', hours: '11 AM - 9 PM' },
  { day: 'Monday', hours: '11 AM - 9 PM' },
  { day: 'Tuesday', hours: '11 AM - 9 PM' },
  { day: 'Wednesday', hours: '11 AM - 9 PM' },
  { day: 'Thursday', hours: '11 AM - 10 PM' },
  { day: 'Friday', hours: '11 AM - 11 PM' },
  { day: 'Saturday', hours: '11 AM - 11 PM' },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-24 md:py-32 bg-catrina-paper"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-accent text-catrina-orange tracking-[0.3em] text-sm mb-4">
            VISÍTANOS
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-catrina-cream tracking-wider">
            FIND US
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="map-container relative h-[400px] lg:h-full min-h-[400px] overflow-hidden border border-catrina-card"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3097.867!2d-94.3578!3d39.0911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0fb8e0bf1b7d5%3A0x1234567890!2s19801%20E%20Valley%20View%20Pkwy%2C%20Independence%2C%20MO%2064057!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Catrina's Tacos & Tequilas Location"
              data-testid="google-map"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Address */}
            <div className="bg-catrina-bg p-8 border border-catrina-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-catrina-orange/10">
                  <MapPin className="w-6 h-6 text-catrina-orange" />
                </div>
                <div>
                  <h3 className="font-accent text-catrina-cream text-lg mb-2">Address</h3>
                  <p className="text-catrina-muted leading-relaxed">
                    19801 E Valley View Pkwy<br />
                    Independence, MO 64057
                  </p>
                  <a
                    href="https://maps.google.com/?q=19801+E+Valley+View+Pkwy+Independence+MO+64057"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="get-directions-link"
                    className="inline-block mt-3 text-catrina-orange hover:text-catrina-gold transition-colors text-sm font-accent tracking-wider"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-catrina-bg p-8 border border-catrina-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-catrina-orange/10">
                  <Phone className="w-6 h-6 text-catrina-orange" />
                </div>
                <div>
                  <h3 className="font-accent text-catrina-cream text-lg mb-2">Phone</h3>
                  <a
                    href="tel:+18165349203"
                    data-testid="phone-link"
                    className="text-catrina-gold text-2xl font-display hover:text-catrina-orange transition-colors"
                  >
                    (816) 534-9203
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-catrina-bg p-8 border border-catrina-card">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-catrina-orange/10">
                  <Clock className="w-6 h-6 text-catrina-orange" />
                </div>
                <div className="flex-1">
                  <h3 className="font-accent text-catrina-cream text-lg mb-4">Hours</h3>
                  <div className="space-y-2">
                    {hours.map((item) => (
                      <div
                        key={item.day}
                        className={`flex justify-between py-2 border-b border-catrina-card last:border-0 ${
                          item.day === today ? 'text-catrina-gold' : 'text-catrina-muted'
                        }`}
                        data-testid={`hours-${item.day.toLowerCase()}`}
                      >
                        <span className={item.day === today ? 'font-bold' : ''}>
                          {item.day} {item.day === today && '(Today)'}
                        </span>
                        <span>{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
