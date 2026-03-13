import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Wine, GlassWater } from 'lucide-react';

const drinks = [
  {
    name: 'Tropical Fruit Margarita',
    description: 'House special with fresh mango, passion fruit, and premium tequila',
    price: '$12',
    icon: GlassWater,
  },
  {
    name: 'Margarita Flights',
    description: 'Sample four of our signature margaritas - Classic, Spicy Jalapeño, Mango Habanero, and Tamarind',
    price: '$18',
    icon: Wine,
    featured: true,
  },
  {
    name: 'Premium Tequila Selection',
    description: 'Over 50 varieties of añejo, reposado, and blanco tequilas from top Mexican distilleries',
    price: 'Starting $10',
    icon: Wine,
  },
  {
    name: 'Paleta Cocktail',
    description: 'Traditional Mexican frozen fruit popsicle dipped in your choice of spirit',
    price: '$8',
    icon: GlassWater,
  },
];

const DrinksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="drinks"
      data-testid="drinks-section"
      className="py-24 md:py-32 bg-catrina-bg relative overflow-hidden"
      ref={ref}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1756521973408-0574c6d0fbed?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwzfHxmZXN0aXZlJTIwbWV4aWNhbiUyMG1hcmdhcml0YSUyMGNvY2t0YWlsfGVufDB8fHx8MTc3MzM3NjA4NHww&ixlib=rb-4.1.0&q=85')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-catrina-bg via-catrina-bg/95 to-catrina-bg" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-accent text-catrina-orange tracking-[0.3em] text-sm mb-4">
            SALUD
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-catrina-cream tracking-wider mb-4">
            DRINKS & TEQUILA
          </h2>
          <p className="text-catrina-muted max-w-2xl mx-auto">
            Raise your spirits with our handcrafted cocktails and extensive tequila collection. 
            Every sip is a celebration.
          </p>
        </motion.div>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {drinks.map((drink, index) => (
            <motion.div
              key={drink.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              data-testid={`drink-item-${drink.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`p-8 border transition-all duration-300 hover:border-catrina-orange/40 ${
                drink.featured
                  ? 'bg-gradient-to-br from-catrina-card to-catrina-paper border-catrina-orange/30 col-span-1 md:col-span-2'
                  : 'bg-catrina-paper border-catrina-card'
              }`}
            >
              <div className={`flex items-start gap-6 ${drink.featured ? 'flex-col md:flex-row md:items-center' : ''}`}>
                <div className={`p-4 bg-catrina-orange/10 ${drink.featured ? 'self-start' : ''}`}>
                  <drink.icon className="w-8 h-8 text-catrina-orange" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-accent text-catrina-cream text-xl">{drink.name}</h3>
                    {drink.featured && (
                      <span className="bg-catrina-gold text-catrina-bg px-3 py-1 text-xs font-bold tracking-wider">
                        BESTSELLER
                      </span>
                    )}
                  </div>
                  <p className="text-catrina-muted mb-4 leading-relaxed">{drink.description}</p>
                  <span className="font-display text-catrina-gold text-2xl">{drink.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Happy Hour Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 p-8 bg-catrina-orange/10 border border-catrina-orange/30 text-center"
        >
          <p className="font-accent text-catrina-gold text-lg tracking-wider mb-2">
            HAPPY HOUR
          </p>
          <p className="font-display text-catrina-cream text-3xl tracking-wider mb-2">
            $5 MARGARITAS
          </p>
          <p className="text-catrina-muted">
            Monday - Friday, 3PM - 6PM
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default DrinksSection;
