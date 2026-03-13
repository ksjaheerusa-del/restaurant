import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Maria G.',
    rating: 5,
    text: 'The birria tacos are absolutely incredible! Best Mexican food in the KC area. The atmosphere is so festive and welcoming.',
    date: 'November 2025',
  },
  {
    name: 'James T.',
    rating: 5,
    text: 'Amazing margarita flights and the steak fajitas were perfectly seasoned. Our server was fantastic. Will definitely be back!',
    date: 'October 2025',
  },
  {
    name: 'Sofia R.',
    rating: 5,
    text: 'Love the vegetarian options! The nopales tacos and elote are must-tries. Beautiful Day of the Dead decor everywhere.',
    date: 'December 2025',
  },
];

const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    viewport={{ once: true }}
    className="bg-catrina-paper p-8 border border-catrina-card hover:border-catrina-orange/30 transition-colors"
    data-testid={`review-card-${index}`}
  >
    <div className="flex items-center gap-1 mb-4">
      {[...Array(review.rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-catrina-gold text-catrina-gold" />
      ))}
    </div>
    <div className="relative">
      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-catrina-orange/20" />
      <p className="text-catrina-cream leading-relaxed pl-6 italic">
        "{review.text}"
      </p>
    </div>
    <div className="mt-6 pt-6 border-t border-catrina-card flex justify-between items-center">
      <span className="font-accent text-catrina-gold">{review.name}</span>
      <span className="text-catrina-muted text-sm">{review.date}</span>
    </div>
  </motion.div>
);

const ReviewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="reviews"
      data-testid="reviews-section"
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
            TESTIMONIOS
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-catrina-cream tracking-wider mb-6">
            WHAT THEY SAY
          </h2>
          
          {/* Rating Badge */}
          <div className="inline-flex items-center gap-4 bg-catrina-bg px-8 py-4 border border-catrina-card">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < 4 ? 'fill-catrina-gold text-catrina-gold' : 'fill-catrina-gold/50 text-catrina-gold'
                  }`}
                />
              ))}
            </div>
            <div className="text-left">
              <p className="font-display text-catrina-gold text-2xl">4.5</p>
              <p className="text-catrina-muted text-sm">757 Reviews</p>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.google.com/maps/place/Catrina's+Tacos+%26+Tequilas"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="leave-review-btn"
            className="text-catrina-orange hover:text-catrina-gold transition-colors font-accent tracking-wider"
          >
            Leave us a review on Google →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
