import {useState} from 'react';
import './AccordionFilter.css';

export default function AccordionFilter({title, children}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='accordion-filter'>
      <button
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span>{isOpen ? 'v' : '<'}</span>
      </button>
      {isOpen && (
        <div className='accordion-content'>
          {children}
          </div>
      )}
    </div>
  )
}