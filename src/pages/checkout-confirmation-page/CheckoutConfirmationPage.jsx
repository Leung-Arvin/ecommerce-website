import { useNavigate } from "react-router"
import "./CheckoutConfirmationPage.css"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import Button from "../../components/button/Button";
import Timeline from "../../components/timeline/Timeline";

export default function CheckoutConfirmationPage() {
  const [currentStep, setCurrentStep] = useState(2);
  let navigate = useNavigate();
  const leftRef = useRef();
  const rightRef = useRef();  

  const steps = [
    {
      id: "cart",
      label: "Cart",
      completed: currentStep > 0,
      active: currentStep === 0,
    },
    {
      id: "shipping",
      label: "Information",
      completed: currentStep > 1,
      active: currentStep === 1,
    },
    {
      id: "payment",
      label: "Confirmation",
      completed: currentStep > 2,
      active: currentStep === 2,
    },
  ];

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
      ease: "power3.out"
    });
    }  
  )

  return(
    <div className="checkout-confirmation-container">
      <Timeline steps={steps} />
      <div className="checkout-confirmation-content">
        <div className="checkout-confirmation-left" ref={leftRef}>
          <h2>Thank you for your purchase!</h2>
          <p>Your order will be processed within 24 hours during working days. We will notify you by email once your order has been shipped</p>

          <Button onClick={()=> {setCurrentStep(3) 
            navigate("/")
          }}>
            Continue Shopping
          </Button>
        </div>
        <div className="checkout-confirmation-right" ref={rightRef}>
          <img src="/illustrations/tom_confirmation.png" className="checkout-confirmation-image" alt="Confirmation illustration" />
        </div>
      </div>
    </div>
  )
}