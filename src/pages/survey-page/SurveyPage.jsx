import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from "../../components/button/Button";
import TextArea from "../../components/textarea/TextArea";
import ToggleSelect from "../../components/toggle-select/ToggleSelect";
import "./SurveyPage.css";
import { useNavigate } from 'react-router';

export default function SurveyPage() {
  let navigate = useNavigate();
  const containerRef = useRef();
  const leftRef = useRef();
  const rightRef = useRef();
  const formElementsRef = useRef([]);

  const addToFormElements = (el) => {
    if (el && !formElementsRef.current.includes(el)) {
      formElementsRef.current.push(el);
    }
  };

  useGSAP(() => {
    gsap.from(leftRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from(rightRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.out"
    });

    gsap.from(formElementsRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.4,
      ease: "back.out(1)"
    });
  }, { scope: containerRef }); 

  return (
    <div className="survey-page-container" ref={containerRef}>
      <div className="survey-left" ref={leftRef}>
        <h2 className="survey-header">Matcha Mart Customer Experience Survey</h2>
        <p className="survey-description">
          This survey is to help the Matcha Mart team understand how our users feel about our website
        </p>
      </div>
      <div className="survey-right" ref={rightRef}>
        <div ref={addToFormElements}>
          <ToggleSelect
            options={[
              {value: 'amazing', label: 'Amazing'},
              {value: 'good', label: 'Good'},
              {value: 'average', label: 'Average'},
              {value: 'poor', label: 'Poor'},
              {value: 'extremely-poor', label:'Extremely Poor'}
            ]}
            label="1. How would you rate your overall experience with Matcha Mart"
            name="experience"
          />
        </div>
        
        <div ref={addToFormElements}>
          <ToggleSelect
            options={[
              {value: 'everyday', label: 'Everyday'},
              {value: 'fairly-often', label: 'Fairly Often'},
              {value: 'sometimes', label: 'Sometimes'},
              {value: 'not-often', label: 'Not Often'},
            ]}
            name="visit-frequency"
            label="2. How often do you come to Matcha Mart"
          />
        </div>
        
        <div ref={addToFormElements}>
          <TextArea
            label="3. Tell us about your experience with Matcha Mart"
          />
        </div>
        
        <div ref={addToFormElements}>
          <ToggleSelect
            options={[
              {value: 'great', label: '😁 Great'},
              {value: 'good', label: '😊 Good'},
              {value: 'ok', label: '😐 Ok'},
              {value: 'bad', label: '😒 Bad'},
              {value: 'terrible', label: '😠 Terrible'}
            ]}
            type="button"
            name="feeling-select"
            label="4. How do you feel when using Matcha Mart"
          />
        </div>
        
        <div ref={addToFormElements}>
          <Button className="survey-button" onClick={() => {navigate("/survey-confirmation")}}>
            Submit Survey
          </Button>
        </div>
      </div>
    </div>  
  );
}