import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  id: string;
  key?: string;
}

export default function FAQItem({ question, answer, id }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="border border-stone-200 rounded-xl bg-white transition-colors duration-200 overflow-hidden"
      id={`faq-item-${id}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 sm:p-5 text-left font-display text-base sm:text-lg text-gray-900 font-semibold select-none focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="pr-4">{question}</span>
        <span className={`flex-shrink-0 text-brand-blue-600 bg-brand-blue-50 p-1.5 rounded-full transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>
      
      {isOpen && (
        <div className="border-t border-stone-100 p-4 sm:p-5 bg-stone-50/50">
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}
