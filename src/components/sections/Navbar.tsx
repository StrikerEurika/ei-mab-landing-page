import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import Button from '../ui/Button';
import LanguageSwitcher from '../ui/LanguageSwitcher';

interface NavbarProps {
  onScrollToSection: (id: string) => void;
}

export default function Navbar({ onScrollToSection }: NavbarProps) {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home' as const, id: 'home' },
    // { key: 'about' as const, id: 'about' },
    // { key: 'properties' as const, id: 'properties' },
    // { key: 'news' as const, id: 'news' },
    { key: 'contact' as const, id: 'contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-15 h-15 rounded-lg flex items-center justify-center">
              <img src="/house-icon.png" alt="" />
            </div>
            <span className="font-sans text-xl font-bold tracking-tight">{t.nav.title}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onScrollToSection(item.id)}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {t.nav[item.key]}
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
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => onScrollToSection(item.id)}
                    className="text-left text-lg font-medium text-slate-600 hover:text-slate-900"
                  >
                    {t.nav[item.key]}
                  </button>
                ))}
                <Button className="w-full mt-4">{t.nav.getStarted}</Button>
                <div className="flex justify-center pt-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </AnimatePresence>
    </nav>
  );
}
