import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./MainBanner.css";

export default function MainBanner({ text = "抹茶 Matcha Mart" }) {
  const leftStripesRef = useRef(null);
  const rightStripesRef = useRef(null);
  const bannerTextRef = useRef(null);

  useEffect(() => {
    gsap.set([leftStripesRef.current, rightStripesRef.current], {
      x: (i) => (i === 0 ? -100 : 100), 
      opacity: 0
    });
    gsap.set(bannerTextRef.current, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to([leftStripesRef.current, rightStripesRef.current], {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1
    })
    .to(bannerTextRef.current, {
      opacity: 1,
      duration: 0.6
    });

    const leftStripes = leftStripesRef.current?.querySelectorAll('.stripe');
    const rightStripes = rightStripesRef.current?.querySelectorAll('.stripe');
    
    if (leftStripes && rightStripes) {
      tl.to([...leftStripes, ...rightStripes], {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.6,
        stagger: 0.05
      }, "-=0.4");
    }
  }, []);

  return (
    <div className="convenience-banner">
      <div className="stripes left-stripes" ref={leftStripesRef}>
        <div className="stripe one"></div>
        <div className="stripe two"></div>
        <div className="stripe three"></div>
      </div>
      
      <div className="banner-text" ref={bannerTextRef}>
        {text}
      </div>
      
      <div className="stripes right-stripes" ref={rightStripesRef}>
        <div className="stripe one"></div>
        <div className="stripe two"></div>
        <div className="stripe three"></div>
      </div>
    </div>
  );
}