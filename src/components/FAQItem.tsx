import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
      className="border border-brand-beige-200 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:shadow-md"
      id={`faq-item-${id}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-5 text-left font-display text-lg text-gray-800 font-medium select-none focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <span className="ml-4 flex-shrink-0 text-brand-blue-500 bg-brand-blue-50 p-1.5 rounded-full transition-transform duration-300">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </span>
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-60 border-t border-brand-beige-100 p-5' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
}
