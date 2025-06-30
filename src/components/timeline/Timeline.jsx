import React, { useRef } from 'react';
import './Timeline.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Timeline = ({ steps }) => {
  const timelineRef = useRef();
  const progressFillRef = useRef();
  const indicatorsRef = useRef([]);
  const labelsRef = useRef([]);
  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / (steps.length - 1)) * 100;


  useGSAP(() => {
    gsap.set([
      timelineRef.current, 
      progressFillRef.current, 
      ...indicatorsRef.current, 
      ...labelsRef.current
    ], { autoAlpha: 0 });

    gsap.timeline({ defaults: { ease: "power2.out" } })
      // Container fade in
      .to(timelineRef.current, { 
        autoAlpha: 1, 
        duration: 0.4 
      })
      // Progress bar grow
      .to(progressFillRef.current, {
        autoAlpha: 1,
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.8
      }, ">-=0.2")
      // Indicators pop in
      .to(indicatorsRef.current, {
        autoAlpha: 1,
        scale: 1,
        stagger: 0.15,
        duration: 0.3
      }, ">-=0.4")
      // Labels fade in
      .to(labelsRef.current, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.25
      }, "<0.1");
  }, []);

  const addToIndicatorsRef = (el) => {
    if (el && !indicatorsRef.current.includes(el)) {
      indicatorsRef.current.push(el);
    }
  };

  const addToLabelsRef = (el) => {
    if (el && !labelsRef.current.includes(el)) {
      labelsRef.current.push(el);
    }
  };

  return (
    <div className="timeline-container" ref={timelineRef}>
      <div className="timeline-progress-bg"></div>
      <div 
        className="timeline-progress-fill" 
        ref={progressFillRef}
        style={{ width: `${progress}%`, transform: "scaleX(0)" }}
      ></div>
      
      {steps.map((step, index) => (
        <div key={step.id} className="timeline-step">
          <div 
            className={`timeline-indicator ${
              step.completed ? 'completed' : 
              step.active ? 'active' : ''
            }`}
            ref={addToIndicatorsRef}
            style={{ opacity: 0, scale: 0 }}
          >
            {step.completed ? '✓' : index + 1}
          </div>
          <span 
            className={`timeline-label ${
              step.active ? 'active' : ''
            }`}
            ref={addToLabelsRef}
            style={{ opacity: 0, transform: "translateY(5px)" }}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Timeline;