import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-24 md:py-32 bg-catrina-bg"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1707379223329-95917534b8ee?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHw0fHxsYSUyMGNhdHJpbmElMjBkaWElMjBkZSUyMGxvcyUyMG11ZXJ0b3MlMjBhcnRpc3RpYyUyMG1ha2V1cCUyMHBvcnRyYWl0fGVufDB8fHx8MTc3MzM3NjA5NHww&ixlib=rb-4.1.0&q=85"
                alt="La Catrina Art"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 border-4 border-catrina-orange/20 pointer-events-none" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-catrina-orange/10 -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-accent text-catrina-orange tracking-[0.3em] text-sm mb-4">
              OUR STORY
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-catrina-cream tracking-wider mb-6">
              BIENVENIDOS
            </h2>
            <div className="space-y-6 text-catrina-muted leading-relaxed">
              <p>
                Welcome to Catrina's Tacos & Tequilas, where every meal is a celebration 
                of life, flavor, and Mexican tradition. Nestled in the heart of Independence, 
                Missouri, we bring the vibrant spirit of authentic Mexican cuisine to your table.
              </p>
              <p>
                From our signature birria tacos dripping with rich consomé to our house-made 
                creamy chicken enchiladas, every dish tells a story of family recipes passed 
                down through generations. Our menu features fresh chips and salsa, sizzling 
                fajitas, and flavorful vegetarian options like our beloved nopales tacos.
              </p>
              <p>
                Pair your meal with one of our famous margarita flights or explore our 
                extensive tequila selection featuring over 50 premium varieties. Whether 
                you're here for a quick lunch or a festive celebration, you'll always 
                feel at home at Catrina's.
              </p>
            </div>
            
            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-catrina-card">
              <div>
                <p className="font-accent text-catrina-gold text-lg">$10-$20</p>
                <p className="text-catrina-muted text-sm">Per Person</p>
              </div>
              <div>
                <p className="font-accent text-catrina-gold text-lg">4.5 Stars</p>
                <p className="text-catrina-muted text-sm">757 Reviews</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
