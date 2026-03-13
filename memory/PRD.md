# Catrina's Tacos & Tequilas - Website PRD

## Original Problem Statement
Build a fully functional, modern restaurant website for Catrina's Tacos & Tequilas — a casual Mexican eatery located at 19801 E Valley View Pkwy, Independence, MO 64057. Features include Hero section, About, Menu with filters, Drinks section, Reviews, Waitlist form, Gallery, Contact with Google Map, and AI Chat Assistant.

## Architecture
- **Frontend**: React with Tailwind CSS, Framer Motion animations, Shadcn UI components
- **Backend**: FastAPI with Python
- **Database**: MongoDB (waitlist entries, chat history)
- **AI Integration**: OpenAI GPT-5.2 via Emergent LLM key

## User Personas
1. **Local Diners**: Families and couples in Independence, MO looking for authentic Mexican food
2. **Event Planners**: Groups seeking festive dining experiences
3. **Online Orderers**: Customers who want to order ahead or join waitlist

## Core Requirements (Static)
- [x] Hero section with Order Online + Join Waitlist CTAs
- [x] About section with restaurant story
- [x] Menu section with category filters (Tacos, Entrées, Sides, Desserts)
- [x] Drinks/Tequila section highlighting margarita flights
- [x] Reviews section (4.5 stars, 757 reviews)
- [x] Waitlist form (functional, stores in database)
- [x] Gallery section (12 images in Bento grid)
- [x] Contact section with address, phone, hours, Google Map
- [x] AI Chat Assistant (GPT-5.2 powered)
- [x] Fixed navigation with smooth scroll
- [x] Mobile responsive design
- [x] SEO meta tags

## What's Been Implemented (Jan 13, 2026)

### Backend Endpoints
- `POST /api/waitlist` - Create waitlist entry
- `GET /api/waitlist` - List waitlist entries  
- `POST /api/chat` - AI chatbot conversations (with session persistence)

### Frontend Components
- Navigation (desktop + mobile)
- HeroSection with animated CTAs
- AboutSection with La Catrina imagery
- MenuSection with tabbed categories
- DrinksSection with Happy Hour banner
- ReviewsSection with star ratings
- WaitlistSection with form validation
- GallerySection with Bento grid
- ContactSection with Google Map
- ChatWidget (floating AI assistant)
- Footer with social links and Order Online banner

### Design System
- Theme: "Noche de Fiesta" (Dark Luxury)
- Colors: Deep brown (#120F0D), Orange (#FF6B00), Gold (#FFB703), Cream (#F4F1DE)
- Typography: Sancreek (display), Rye (accent), DM Sans (body)
- Animations: Framer Motion scroll reveals, hover effects

## Prioritized Backlog

### P0 (Critical) - DONE
- [x] All core sections implemented
- [x] Waitlist form functional
- [x] AI chatbot working
- [x] Mobile responsive

### P1 (High Priority)
- [ ] Admin dashboard for waitlist management
- [ ] Integration with actual online ordering system
- [ ] Email/SMS notifications for waitlist confirmations

### P2 (Medium Priority)
- [ ] User accounts for repeat customers
- [ ] Loyalty program integration
- [ ] Event booking for large parties
- [ ] Live wait time estimates

## Next Tasks
1. Connect "Order Online" button to actual ordering platform (e.g., Toast, DoorDash)
2. Add email notification on waitlist submission
3. Build admin panel to view/manage waitlist entries
4. Add analytics tracking for conversion optimization
