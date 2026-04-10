import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FaqItem } from '../types';

interface FaqAccordionItemProps {
    faq: FaqItem;
    isOpen: boolean;
    onClick: () => void;
}

const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-100 py-6 reveal">
            <button onClick={onClick} className="flex w-full justify-between items-center text-left focus:outline-none group">
                <span className={`font-medium text-lg transition-colors duration-300 ${isOpen ? 'text-orange-500' : 'text-slate-800 group-hover:text-orange-500'}`}>
                    {faq.question}
                </span>
                <div className={`flex-shrink-0 ml-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : 'bg-slate-50 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500'}`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'max-h-96 opacity-100 mt-5' : 'max-h-0 opacity-0'}`}>
                <p className="text-slate-500 font-light leading-relaxed pr-12 text-base">{faq.answer}</p>
            </div>
        </div>
    );
};

export default FaqAccordionItem;