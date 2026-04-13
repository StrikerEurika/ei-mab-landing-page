import React, { useState } from 'react';
import {
  Menu,
  X,
  Home,
  DollarSign,
  Key,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useLanguage } from '../contexts/LanguageContext';
import type { Language } from '../i18n';

// Utility for cleaner tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Language Switcher Component
const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { language, switchLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'kh', label: 'KH' }
  ];

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
        aria-label="Switch language"
      >
        <Languages size={18} />
        <span className="text-sm font-medium">{languages.find(l => l.code === language)?.label}</span>
        <ChevronDown size={14} className={cn('transition-transform', isOpen && 'rotate-180')} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-slate-200 py-1 min-w-[100px]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  switchLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors',
                  language === lang.code ? 'bg-slate-100 font-semibold' : ''
                )}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Components ---

const Button = ({
  children,
  variant = 'primary',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' | 'white' }) => {
  const variants = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800',
    outline: 'border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900',
    ghost: 'hover:bg-slate-100 text-slate-600',
    white: 'bg-white text-slate-900 hover:bg-slate-50 shadow-sm'
  };

  return (
    <button
      className={cn(
        'px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = true }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={cn('mb-12', centered && 'text-center')}>
    {subtitle && <h3 className="text-2xl md:text-3xl font-serif text-slate-900 mb-2">{subtitle}</h3>}
    <h2 className="text-xl md:text-2xl font-medium text-slate-600">{title}</h2>
  </div>
);

const PropertyCard = ({
  image,
  title,
  price,
  beds,
  baths,
  sqft,
  location,
  featured = false
}: {
  image: string,
  title: string,
  price: string,
  beds?: string,
  baths?: string,
  sqft?: string,
  location?: string,
  featured?: boolean
}) => (
  <div className="group cursor-pointer flex-shrink-0 w-full md:w-[300px] snap-start">
    <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {featured && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
          FEATURED
        </div>
      )}
    </div>
    <div className="space-y-2">
      <h4 className="font-serif text-lg font-medium text-slate-900 group-hover:text-slate-600 transition-colors">{title}</h4>
      {location && <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={14} /> {location}</p>}
      <div className="flex items-center gap-4 text-sm text-slate-500 pt-2">
        {beds && <span className="flex items-center gap-1"><Bed size={14} /> {beds}</span>}
        {baths && <span className="flex items-center gap-1"><Bath size={14} /> {baths}</span>}
        {sqft && <span className="flex items-center gap-1"><Maximize size={14} /> {sqft}</span>}
      </div>
      <p className="text-lg font-semibold text-slate-900 pt-1">{price}</p>
    </div>
  </div>
);

const ArticleCard = ({ image, title, excerpt }: { image: string, title: string, excerpt: string }) => (
  <div className="group cursor-pointer flex-shrink-0 w-full md:w-[280px] snap-start">
    <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <h4 className="font-serif text-lg font-medium text-slate-900 mb-2 group-hover:text-slate-600 transition-colors">{title}</h4>
    <p className="text-sm text-slate-500 line-clamp-2 mb-3">{excerpt}</p>
    <span className="text-sm font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 group-hover:decoration-slate-900 transition-all">
      Read More
    </span>
  </div>
);

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => (
  <div className="border-b border-slate-200 last:border-0">
    <button
      className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
      onClick={onClick}
    >
      <span className={cn("font-medium transition-colors", isOpen ? "text-slate-900" : "text-slate-600")}>{question}</span>
      {isOpen ? <ChevronUp size={20} className="text-slate-900" /> : <ChevronDown size={20} className="text-slate-400" />}
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 }
          }}
          transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <div className="pb-6 text-slate-500 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// --- Main Page Component ---

export default function LandingPage() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const faqs = [
    {
      q: t.faq.q1,
      a: t.faq.a1
    },
    {
      q: t.faq.q2,
      a: t.faq.a2
    },
    {
      q: t.faq.q3,
      a: t.faq.a3
    },
    {
      q: t.faq.q4,
      a: t.faq.a4
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-200">
      {/* Update document head */}
      <React.Fragment>
        <title>DreamHouse | Find Your Perfect Home</title>
        <meta name="description" content="Find your dream home with DreamHouse. Expert guides to buying, selling, and renting properties." />
      </React.Fragment>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Home size={18} className="text-white" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">DreamHouse</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { key: 'home', id: 'home' },
                { key: 'about', id: 'about' },
                { key: 'properties', id: 'properties' },
                { key: 'news', id: 'news' },
                { key: 'contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="white" className="shadow-md hover:shadow-lg transition-shadow">
                {t.nav.getStarted}
              </Button>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col">
                {[
                  { key: 'home', id: 'home' },
                  { key: 'about', id: 'about' },
                  { key: 'properties', id: 'properties' },
                  { key: 'news', id: 'news' },
                  { key: 'contact', id: 'contact' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-lg font-medium text-slate-600 hover:text-slate-900"
                  >
                    {t.nav[item.key as keyof typeof t.nav]}
                  </button>
                ))}
                <Button className="w-full mt-4">{t.nav.getStarted}</Button>
                <div className="flex justify-center pt-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-22b8c152ba2c?q=80&w=2070&auto=format&fit=crop"
            alt="Modern House"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="flex flex-col items-center text-center text-white mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 leading-tight"
            >
              {t.hero.title}<br />
              <span className="italic font-light">{t.hero.subtitle}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mb-8"
            >
              {t.hero.description}
            </motion.p>

            {/* Floating Property Card (Hero Decoration) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl max-w-xs text-left"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Home size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">DuneHaven Residences</h4>
                  <p className="text-xs text-white/70">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
                </div>
              </div>
              <button className="w-full mt-2 bg-white text-slate-900 text-xs font-bold py-2 rounded-lg hover:bg-white/90 transition-colors">
                Learn More
              </button>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-full p-2 shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex-1 w-full md:w-auto px-6 py-3 border-b md:border-b-0 md:border-r border-slate-100">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.hero.rentBuy}</label>
              <div className="flex items-center justify-between cursor-pointer">
                <span className="font-medium text-slate-900">{t.hero.rent}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </div>
            </div>
            <div className="flex-1 w-full md:w-auto px-6 py-3 border-b md:border-b-0 md:border-r border-slate-100">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.hero.type}</label>
              <div className="flex items-center justify-between cursor-pointer">
                <span className="font-medium text-slate-900">{t.hero.house}</span>
                <ChevronDown size={16} className="text-slate-400" />
              </div>
            </div>
            <div className="flex-[2] w-full md:w-auto px-6 py-3">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.hero.location}</label>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-slate-400" />
                <span className="font-medium text-slate-900">Malang, Indonesia</span>
              </div>
            </div>
            <Button className="w-full md:w-auto rounded-full px-8 bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
              {t.hero.findProperty}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t.services.title}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: t.services.buyTitle,
                desc: t.services.buyDesc
              },
              {
                icon: DollarSign,
                title: t.services.sellTitle,
                desc: t.services.sellDesc
              },
              {
                icon: Key,
                title: t.services.rentTitle,
                desc: t.services.rentDesc
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 group bg-white"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-900 transition-colors duration-300">
                  <service.icon size={28} className="text-slate-900 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-4">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6 text-sm">
                  {service.desc}
                </p>
                <button className="text-sm font-bold text-slate-900 flex items-center gap-2 group-hover:gap-3 transition-all">
                  {t.services.learnMore} <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties (Move-in Ready) */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.featured.subtitle}
            title={t.featured.title}
          />

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                num: "01",
                title: t.featured.futuristic,
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
                desc: t.featured.description
              },
              {
                num: "02",
                title: t.featured.minimalist,
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
                desc: t.featured.description
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl mb-6 aspect-[16/10]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex gap-6">
                  <span className="text-4xl font-serif text-slate-200 font-bold pt-1">{item.num}</span>
                  <div>
                    <h3 className="text-2xl font-serif font-medium mb-3">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Options (Carousel) */}
      <section id="properties" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.properties.subtitle}
            title={t.properties.title}
          />

          <div className="relative">
            {/* Carousel Container */}
            <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {[
                { title: "DuneHaven Residences", price: "$550,000", beds: "3 Beds", baths: "2 Bath", sqft: "1200m2", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop" },
                { title: "Family-Friendly Villas", price: "$840,000", beds: "4 Beds", baths: "3 Bath", sqft: "2000m2", img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop" },
                { title: "Oceanfront Condominiums", price: "$655,000", beds: "2 Beds", baths: "2 Bath", sqft: "900m2", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" },
                { title: "Stonehaven Realty", price: "$200,000", beds: "1 Bed", baths: "1 Bath", sqft: "500m2", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop" },
                { title: "Modern Loft", price: "$450,000", beds: "2 Beds", baths: "1 Bath", sqft: "800m2", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" },
              ].map((prop, idx) => (
                <PropertyCard key={idx} {...prop} image={prop.img} featured={idx === 0} />
              ))}
            </div>

            {/* Navigation Arrows (Visual only for this demo, functionality implied by scroll) */}
            <div className="hidden md:flex justify-end gap-2 mt-4">
              <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <ArrowRight size={20} className="rotate-180" />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Insights & Innovations */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.articles.subtitle}
            title={t.articles.title}
          />

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { title: "The Art of Kitchen Arrangement", excerpt: "Planning for proper reach, especially for users with different heights and needs...", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop" },
              { title: "Your Couch Can Now Make Coffee?", excerpt: "Some designers have showcased futuristic couch concepts with integrated...", img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop" },
              { title: "First-Time Guide: Everything You Need to Know", excerpt: "Creates a sense of empowerment by suggesting access to all necessary knowledge...", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" },
              { title: "Guide to Seattle's First-Time Buyer Hubs", excerpt: "Move beyond the expensive downtown scene! This guide unveils Seattle's hidden...", img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop" },
            ].map((article, idx) => (
              <ArticleCard key={idx} {...article} image={article.img} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="relative h-[500px] rounded-3xl overflow-hidden hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop"
                alt="House Exterior"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-medium mb-8">{t.faq.title}</h2>
              <div className="space-y-0">
                {faqs.map((faq, idx) => (
                  <FAQItem
                    key={idx}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openFaqIndex === idx}
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.testimonials.subtitle}
            title={t.testimonials.title}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Miller",
                role: "Austin",
                text: t.testimonials.t1Text,
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
              },
              {
                name: "Sarah Smith",
                role: "Buyer",
                text: t.testimonials.t2Text,
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
              },
              {
                name: "David Chen",
                role: "Investor",
                text: t.testimonials.t3Text,
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative"
              >
                <div className="text-4xl text-slate-200 font-serif absolute top-6 left-6">"</div>
                <p className="text-slate-600 mb-8 relative z-10 pt-4">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop"
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">{t.cta.title}</h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <Button variant="white" className="text-lg px-10 py-4 h-auto shadow-xl hover:shadow-2xl transition-all">
            {t.cta.getStarted}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6 text-white">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Home size={18} className="text-slate-900" />
                </div>
                <span className="font-serif text-xl font-bold tracking-tight">DreamHouse</span>
              </div>
              <p className="max-w-sm mb-6">
                {t.footer.description}
              </p>
              <div className="flex gap-4">
                {/* Facebook */}
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                {/* Twitter/X */}
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">{t.footer.quickLinks}</h4>
              <ul className="space-y-4">
                {[t.footer.home, t.footer.aboutUs, t.footer.properties, t.footer.news, t.footer.contact].map(link => (
                  <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">{t.footer.contact}</h4>
              <ul className="space-y-4">
                <li>{t.footer.email}</li>
                <li>{t.footer.phone}</li>
                <li>{t.footer.address.split('\n').map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>{t.footer.rights}</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
