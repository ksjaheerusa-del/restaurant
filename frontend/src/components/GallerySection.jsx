import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1653084019129-1f2303bb5bc0?w=600&h=400&fit=crop',
    alt: 'Restaurant Interior',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1585803518902-58a3ef005b51?w=400&h=300&fit=crop',
    alt: 'Birria Tacos',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1606168159202-1f3fca458c18?w=400&h=300&fit=crop',
    alt: 'Steak Fajitas',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1759265231461-75abc2f1edc1?w=400&h=400&fit=crop',
    alt: 'Festive Decor',
    span: 'col-span-1 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1613585812482-b6649a2ca171?w=400&h=300&fit=crop',
    alt: 'Elote',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1529044731917-db2e35c4b7a2?w=400&h=300&fit=crop',
    alt: 'La Catrina Art',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&h=400&fit=crop',
    alt: 'Margaritas',
    span: 'col-span-2 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
    alt: 'Tacos',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&h=400&fit=crop',
    alt: 'Fresh Ingredients',
    span: 'col-span-1 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=400&h=300&fit=crop',
    alt: 'Mexican Spices',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop',
    alt: 'Nachos',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=400&h=300&fit=crop',
    alt: 'Guacamole',
    span: 'col-span-1 row-span-1',
  },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="py-24 md:py-32 bg-catrina-bg"
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
            GALERÍA
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-catrina-cream tracking-wider">
            A FEAST FOR THE EYES
          </h2>
        </motion.div>

        {/* Bento Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              data-testid={`gallery-image-${index}`}
              className={`relative overflow-hidden group cursor-pointer ${image.span}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-catrina-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-accent text-catrina-cream tracking-wider text-lg">
                  {image.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="instagram-link"
            className="inline-flex items-center gap-2 text-catrina-orange hover:text-catrina-gold transition-colors font-accent tracking-wider"
          >
            Follow us @CatrinasTacos
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
