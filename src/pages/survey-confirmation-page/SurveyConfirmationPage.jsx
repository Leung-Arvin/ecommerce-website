import { useState, useEffect, useRef } from "react";
import "./SurveyConfirmationPage.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function SurveyConfirmationPage() {
  let navigate = useNavigate();
  const [confirmationCode, setConfirmationCode] = useState("");
  const leftRef = useRef();
  const rightRef = useRef();  

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
  })

  // Generate random 8-digit alphanumeric code
  useEffect(() => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setConfirmationCode(result);
  }, []);

  return (
    <div className="survey-confirmation-container">
      <div className="survey-confirmation-left" ref={leftRef}>
        <h2>Thank you for filling out our Survey!</h2>
        <p>We appreciate your feedback and hope that you will continue to come back</p>
        <p>Don't forget! You can now save 10% off your next purchase with your code:</p>
        <p className="confirmation-code">{confirmationCode}</p>
        <Button onClick={()=> navigate("/")}>
          Continue Shopping
        </Button>
      </div>
      <div className="survey-confirmation-right" ref={rightRef}>
        <img src="/illustrations/tom_confirmation.png" className="survey-confirmation-image" alt="Confirmation illustration" />
      </div>
    </div>
  );
}