import { useState } from 'react';
import type { ReactNode } from 'react';
import './Accordion.css';

export interface AccordionItem {
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div className={`accordion__item ${open ? 'accordion__item--open' : ''}`} key={index}>
            <button
              type="button"
              className="accordion__trigger"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <span>{item.question}</span>
              <span className="accordion__chevron" aria-hidden="true">
                {open ? '−' : '+'}
              </span>
            </button>
            {open && <div className="accordion__panel">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
