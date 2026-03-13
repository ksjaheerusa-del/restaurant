import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

const menuItems = {
  tacos: [
    {
      name: 'Birria Tacos',
      description: 'Slow-braised beef in rich consomé, served with rice and beans',
      price: '$14',
      image: 'https://images.unsplash.com/photo-1585803518902-58a3ef005b51?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHwyfHxiaXJyaWElMjB0YWNvcyUyMHBsYXRlJTIwYXV0aGVudGljfGVufDB8fHx8MTc3MzM3NjA4M3ww&ixlib=rb-4.1.0&q=85',
      badge: 'Signature',
    },
    {
      name: 'Nopales Tacos',
      description: 'Grilled cactus with fresh pico de gallo, vegetarian favorite',
      price: '$12',
      image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop',
      badge: 'Vegetarian',
    },
    {
      name: 'Pulled Pork Tacos',
      description: 'Slow-roasted carnitas with cilantro and onion',
      price: '$13',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
    },
  ],
  entrees: [
    {
      name: 'Creamy Chicken Enchiladas',
      description: 'Smothered in house-made salsa verde, served with rice',
      price: '$13',
      image: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=400&h=300&fit=crop',
      badge: 'Popular',
    },
    {
      name: 'Pollo Asado',
      description: 'Citrus-marinated grilled chicken with fresh vegetables',
      price: '$15',
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop',
    },
    {
      name: 'Steak Fajitas',
      description: 'Sizzling with peppers and onions, served tableside',
      price: '$18',
      image: 'https://images.unsplash.com/photo-1606168159202-1f3fca458c18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHw0fHxtZXhpY2FuJTIwZm9vZCUyMGVuY2hpbGFkYXMlMjBmYWppdGFzJTIwZWxvdGUlMjB0YWNvcyUyMHNwcmVhZHxlbnwwfHx8fDE3NzMzNzYwOTV8MA&ixlib=rb-4.1.0&q=85',
      badge: 'Chef\'s Pick',
    },
    {
      name: 'Avocado Rice Bowl',
      description: 'Fresh and healthy, loaded with vegetables',
      price: '$11',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      badge: 'Vegetarian',
    },
    {
      name: 'Taco Salad',
      description: 'Crispy tortilla bowl filled with fresh greens and toppings',
      price: '$10',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    },
  ],
  sides: [
    {
      name: 'Chips and Salsa',
      description: 'Fresh tortilla chips with house-made salsa trio',
      price: '$6',
      image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&h=300&fit=crop',
    },
    {
      name: 'Elote Mexican Street Corn',
      description: 'Grilled with cotija cheese and lime crema',
      price: '$7',
      image: 'https://images.unsplash.com/photo-1613585812482-b6649a2ca171?crop=entropy&cs=srgb&fm=jpg&ixid=M3w8NjA1Mjh8MHwxfHNlYXJjaHwyfHxmZXN0aXZlJTIwbWV4aWNhbiUyMG1hcmdhcml0YSUyMGNvY2t0YWlsfGVufDB8fHx8MTc3MzM3NjA4NHww&ixlib=rb-4.1.0&q=85',
      badge: 'Must Try',
    },
  ],
  desserts: [
    {
      name: 'Paleta Mexicana',
      description: 'Traditional frozen fruit popsicle with a tequila twist',
      price: '$8',
      image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop',
      badge: '21+',
    },
  ],
};

const MenuCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="menu-card bg-catrina-paper border border-catrina-card p-0 overflow-hidden group"
    data-testid={`menu-item-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {item.badge && (
        <span className="absolute top-4 left-4 bg-catrina-orange text-catrina-bg px-3 py-1 text-xs font-bold tracking-wider">
          {item.badge}
        </span>
      )}
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-accent text-catrina-cream text-lg">{item.name}</h3>
        <span className="font-display text-catrina-gold text-xl">{item.price}</span>
      </div>
      <p className="text-catrina-muted text-sm leading-relaxed">{item.description}</p>
    </div>
  </motion.div>
);

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState('tacos');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="menu"
      data-testid="menu-section"
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
            SABORES AUTÉNTICOS
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-catrina-cream tracking-wider">
            OUR MENU
          </h2>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent mb-12">
            {['tacos', 'entrees', 'sides', 'desserts'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                data-testid={`menu-tab-${tab}`}
                className="px-6 py-3 font-accent uppercase tracking-widest text-sm data-[state=active]:bg-catrina-orange data-[state=active]:text-catrina-bg data-[state=inactive]:bg-catrina-card data-[state=inactive]:text-catrina-cream hover:bg-catrina-orange/20 transition-colors border-0"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(menuItems).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, index) => (
                  <MenuCard key={item.name} item={item} index={index} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* View Full Menu Button */}
        <div className="text-center mt-12">
          <a
            href="#order"
            data-testid="view-full-menu-btn"
            className="btn-secondary inline-block"
          >
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
