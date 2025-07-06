import { useState } from "react";
import "./CheckoutFormPage.css";
import Timeline from "../../components/timeline/Timeline";
import TextInput from "../../components/text-input/TextInput";
import Button from "../../components/button/Button";
import { ProductList } from "../../components/product-list/ProductList";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCart } from "../../components/cart/CartContext";
import Navbar from "../../components/nav-bar/Navbar";

export default function CheckoutFormPage() {
  let navigate = useNavigate();
  const {
    cartItems,
    clearCart
  } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [discountCode, setDiscountCode] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [capitalCity, setCapitalCity] = useState("");
  const containerRef = useRef();
  const formRef = useRef();
  const orderDetailsRef = useRef();

  const handleProvinceChange = (e) => {
    const provinceName = e.target.value;
    setSelectedProvince(provinceName);
    
    const selectedProvinceData = PROVINCES.find((p) => p.name === provinceName);
    if (selectedProvinceData) {
      setCapitalCity(selectedProvinceData.capital);
    }
  };

  useGSAP(() => {
    gsap.set([formRef.current, orderDetailsRef.current], {
      autoAlpha: 0,
      y: 20
    });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .to(formRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6
      })
      .to(orderDetailsRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4
      }, "-=0.3"); 

    gsap.from(".checkout-form-left > *:not(h2, button)", {
      autoAlpha: 0,
      y: 10,
      stagger: 0.05,
      delay: 0.4
    });

    gsap.from(".product-item", {
      autoAlpha: 0,
      x: -10,
      stagger: 0.03,
      delay: 0.6
    });

  }, { scope: containerRef });

  const PROVINCES = [
    { name: "Alberta", capital: "Edmonton" },
    { name: "British Columbia", capital: "Victoria" },
    { name: "Manitoba", capital: "Winnipeg" },
    { name: "New Brunswick", capital: "Fredericton" },
    { name: "Newfoundland and Labrador", capital: "St. John's" },
    { name: "Northwest Territories", capital: "Yellowknife" },
    { name: "Nova Scotia", capital: "Halifax" },
    { name: "Nunavut", capital: "Iqaluit" },
    { name: "Ontario", capital: "Toronto" },
    { name: "Prince Edward Island", capital: "Charlottetown" },
    { name: "Quebec", capital: "Quebec City" },
    { name: "Saskatchewan", capital: "Regina" },
    { name: "Yukon", capital: "Whitehorse" },
  ];

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

  // Calculate order totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxRate = 0.13; // 13% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(amount);
  };

  return (
    <>
    <Navbar/>
    <div className="checkout-form-container" ref={containerRef}>
      <Timeline steps={steps} />
      <div className="checkout-content-container">
        <div className="checkout-form-left" ref={formRef}>
          <h2>Contact</h2>
          <TextInput
            label="Email"
            placeholder="ex. johndoe@email.com"
            name="email"
          />

          <h2>Delivery</h2>
          <TextInput
            label="Country/Region"
            placeholder="ex. johndoe@email.com"
            name="country"
            defaultValue="Canada"
            disabled
          />
          <p>*delivery only for Canada</p>
          <div className="form-row">
            <TextInput
              label="First Name"
              placeholder="ex. John"
              name="first-name"
            />
            <TextInput
              label="Last Name"
              placeholder="ex. Doe"
              name="last-name"
            />
          </div>
          <TextInput label="Company" placeholder="(optional)" name="company" />
          <TextInput
            label="Address"
            placeholder="ex. 123 Matcha Street"
            name="address"
          />
          <TextInput
            label="Apartment, Suite, etc."
            placeholder="(optional)"
            name="apartment"
          />
          <div className="form-row">
            <div className="form-select-group">
              <label>Province/Territory</label>
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="form-select"
                required
              >
                <option value="">Select a province</option>
                {PROVINCES.map((province) => (
                  <option key={province.name} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-select-group">
              <label>Capital City</label>
              <input
                type="text"
                value={capitalCity}
                className="form-select"
                readOnly
                placeholder="Select province first"
              />
            </div>
            <TextInput label="ZIP Code" placeholder="ex. 70455" name="" />
          </div>
          <TextInput
            label="Phone Number"
            placeholder="ex. 123-456-7890"
            name="apartment"
          />

          <h2>Payment</h2>
          <TextInput label="Card Number" placeholder="" name="apartment" />
          <div className="form-row">
            <TextInput
              label="Expiration Date"
              placeholder=""
              name="first-name"
            />
            <TextInput label="Security Code" placeholder="" name="last-name" />
          </div>
          <TextInput label="Name on Card" placeholder="" name="apartment" />
          <Button onClick={() => {navigate("/checkout-confirmation"); clearCart() }}>Pay Now</Button>
        </div>
        <div className="checkout-order-details-container" ref={orderDetailsRef}>
          <div className="checkout-order-details">
            <h2>Order Details</h2>
            <ProductList items={cartItems} />
            <div className="discount-container">
            <input
              className="discount-input"
              placeholder="Enter your discount code here"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <Button className="discount-button">
              Apply
            </Button>
            </div>
            <div className="checkout-cost-breakdown">
              <div className="checkout-cost-row">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="checkout-cost-row">
                <span>Tax (13%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="checkout-cost-row total">
                <span>Total</span>
                <span>{"CAD " + formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
