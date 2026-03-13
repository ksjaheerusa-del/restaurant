import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, Users, Phone, User, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const WaitlistSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    party_size: '',
    date: '',
    time: '',
    special_requests: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        party_size: parseInt(formData.party_size, 10),
      };
      
      await axios.post(`${API}/waitlist`, submitData);
      
      toast.success('You\'re on the list!', {
        description: `See you on ${formData.date} at ${formData.time}, ${formData.name}!`,
      });
      
      setFormData({
        name: '',
        phone: '',
        party_size: '',
        date: '',
        time: '',
        special_requests: '',
      });
    } catch (error) {
      console.error('Waitlist error:', error);
      toast.error('Something went wrong', {
        description: 'Please try again or call us at (816) 534-9203',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="waitlist"
      data-testid="waitlist-section"
      className="py-24 md:py-32 bg-catrina-bg relative"
      ref={ref}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 border border-catrina-orange rounded-full" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-catrina-gold rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-accent text-catrina-orange tracking-[0.3em] text-sm mb-4">
            RESERVACIONES
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-catrina-cream tracking-wider mb-4">
            JOIN THE WAITLIST
          </h2>
          <p className="text-catrina-muted max-w-xl mx-auto">
            Skip the wait. Get in line before you arrive and we'll have your table ready.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          data-testid="waitlist-form"
          className="bg-catrina-paper p-8 md:p-12 border border-catrina-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="relative">
              <label className="block text-catrina-muted text-sm mb-2 font-accent tracking-wider">
                NAME
              </label>
              <div className="relative">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-catrina-muted" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="waitlist-name-input"
                  placeholder="Your name"
                  className="w-full bg-transparent border-b-2 border-catrina-card text-catrina-cream focus:border-catrina-orange focus:outline-none pl-8 py-3 placeholder:text-catrina-muted/50 transition-colors"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="relative">
              <label className="block text-catrina-muted text-sm mb-2 font-accent tracking-wider">
                PHONE
              </label>
              <div className="relative">
                <Phone className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-catrina-muted" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  data-testid="waitlist-phone-input"
                  placeholder="(816) 555-1234"
                  className="w-full bg-transparent border-b-2 border-catrina-card text-catrina-cream focus:border-catrina-orange focus:outline-none pl-8 py-3 placeholder:text-catrina-muted/50 transition-colors"
                />
              </div>
            </div>

            {/* Party Size */}
            <div className="relative">
              <label className="block text-catrina-muted text-sm mb-2 font-accent tracking-wider">
                PARTY SIZE
              </label>
              <div className="relative">
                <Users className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-catrina-muted" />
                <select
                  name="party_size"
                  value={formData.party_size}
                  onChange={handleChange}
                  required
                  data-testid="waitlist-party-size-select"
                  className="w-full bg-transparent border-b-2 border-catrina-card text-catrina-cream focus:border-catrina-orange focus:outline-none pl-8 py-3 appearance-none cursor-pointer transition-colors"
                >
                  <option value="" className="bg-catrina-paper">Select party size</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num} className="bg-catrina-paper">
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                  <option value="9" className="bg-catrina-paper">9+ (Large Party)</option>
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <label className="block text-catrina-muted text-sm mb-2 font-accent tracking-wider">
                DATE
              </label>
              <div className="relative">
                <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-catrina-muted" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  data-testid="waitlist-date-input"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-transparent border-b-2 border-catrina-card text-catrina-cream focus:border-catrina-orange focus:outline-none pl-8 py-3 transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Time */}
            <div className="relative md:col-span-2">
              <label className="block text-catrina-muted text-sm mb-2 font-accent tracking-wider">
                PREFERRED TIME
              </label>
              <div className="relative">
                <Clock className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-catrina-muted" />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  data-testid="waitlist-time-select"
                  className="w-full bg-transparent border-b-2 border-catrina-card text-catrina-cream focus:border-catrina-orange focus:outline-none pl-8 py-3 appearance-none cursor-pointer transition-colors"
                >
                  <option value="" className="bg-catrina-paper">Select time</option>
                  {['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'].map((time) => (
                    <option key={time} value={time} className="bg-catrina-paper">{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div className="relative md:col-span-2">
              <label className="block text-catrina-muted text-sm mb-2 font-accent tracking-wider">
                SPECIAL REQUESTS (OPTIONAL)
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-0 top-3 w-5 h-5 text-catrina-muted" />
                <textarea
                  name="special_requests"
                  value={formData.special_requests}
                  onChange={handleChange}
                  data-testid="waitlist-requests-input"
                  placeholder="Birthday celebration, dietary restrictions, etc."
                  rows={3}
                  className="w-full bg-transparent border-b-2 border-catrina-card text-catrina-cream focus:border-catrina-orange focus:outline-none pl-8 py-3 placeholder:text-catrina-muted/50 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              data-testid="waitlist-submit-btn"
              className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </div>
        </motion.form>

        {/* Info Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-catrina-muted text-sm mt-6"
        >
          We'll text you when your table is ready. For immediate seating or large parties, 
          please call <a href="tel:+18165349203" className="text-catrina-orange hover:text-catrina-gold transition-colors">(816) 534-9203</a>
        </motion.p>
      </div>
    </section>
  );
};

export default WaitlistSection;
