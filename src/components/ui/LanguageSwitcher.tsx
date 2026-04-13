import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import type { Language } from '../../i18n';
import { cn } from '../../lib/utils';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
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
}
