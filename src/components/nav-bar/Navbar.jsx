import React from "react";
import "./Navbar.css";
import logoMascot from "../../assets/logoMascot.svg";
import cartLogo from "../../assets/cartLogo.svg";
import sweetsIcon from "../../assets/sweetsLogo.svg";
import drinksIcon from "../../assets/drinksLogo.svg";
import bakeryIcon from "../../assets/bakeryLogo.svg";
import { useCart } from "../../components/cart/CartContext.jsx";

const Navbar = () => {
  const { cartItems, toggleSidebar, isSidebarOpen, notification } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <nav className="main-nav">
        <div className="top-nav">
          <div className="logo">
            <img src={logoMascot} alt="Matcha Mart Mascot" />
          </div>

          <div className="nav-links">
            <a href="#">Complete our survey!</a>
          </div>

          <div className="cart">
            <div className="cart-box" onClick={toggleSidebar}>
              <img src={cartLogo} alt="Cart" />
              <span>{cartItems.length} items</span>
            </div>
          </div>
        </div>

        <div className="category-menu">
          <a href="#">New Arrivals</a>
          <a href="#">Best Sellers</a>

          <div className="dropdown">
            <button className="dropdown-toggle">
              <img
                src={sweetsIcon}
                style={{
                  width: "1.5vw",
                  height: "auto",
                  marginRight: "0.5em",
                  verticalAlign: "middle",
                }}
              />
              Sweets ▼
            </button>
            <div className="dropdown-menu">
              <a href="#">Matcha Chocolate</a>
              <a href="#">Candy & Hard Sweets</a>
              <a href="#">Cookies</a>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropdown-toggle">
              <img
                src={drinksIcon}
                style={{
                  width: "1.5vw",
                  height: "auto",
                  marginRight: "0.5em",
                  verticalAlign: "middle",
                }}
              />
              Drinks ▼
            </button>
            <div className="dropdown-menu">
              <a href="#">Matcha Powder</a>
              <a href="#">Bottled Drinks</a>
              <a href="#">Latte Mixes</a>
            </div>
          </div>

          <div className="dropdown">
            <button className="dropdown-toggle">
              <img
                src={bakeryIcon}
                style={{
                  width: "1.5vw",
                  height: "auto",
                  marginRight: "0.5em",
                  verticalAlign: "middle",
                }}
              />
              Bakery ▼
            </button>
            <div className="dropdown-menu">
              <a href="#">Cakes</a>
              <a href="#">Pastries</a>
              <a href="#">Mochi</a>
            </div>
          </div>

          <a href="#">Browse All</a>
        </div>
      </nav>

      <div className={`cart-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          &times;
        </button>
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} — ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>
              <button className="checkout-button">Check Out Now</button>
            </div>
          </>
        )}
      </div>

      {isSidebarOpen && (
        <div className="overlay show" onClick={toggleSidebar}></div>
      )}

      {notification && (
        <div className="cart-notification">
          <p>{notification}</p>
        </div>
      )}
    </>
  );
};

export default Navbar;
