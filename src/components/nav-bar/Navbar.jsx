import React from "react";
import "./Navbar.css";
import { useCart } from "../../components/cart/CartContext.jsx";
import Button from "../button/Button.jsx";

const Navbar = () => {
  const {
    cartItems,
    toggleSidebar,
    isSidebarOpen,
    notification,
    handleDeleteItem,
    updateItemQuantity,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <nav className="main-nav">
        <div className="top-nav">
          <div className="logo">
            <img src="/illustrations/logoMascot.svg" alt="Mascot" />
          </div>

          <div className="nav-links">
            <a href="#">Complete our survey!</a>
          </div>

          <div className="cart">
            <div className="cart-box" onClick={toggleSidebar}>
              <img src="/illustrations/cartLogo.svg" alt="Cart" />
              <span>
                {cartItems.length} items ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="category-menu">
          <a href="#">New Arrivals</a>
          <a href="#">Best Sellers</a>

          <div className="dropdown">
            <button className="dropdown-toggle">
              <img
                src="/illustrations/sweetsLogo.svg"
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
                src="/illustrations/drinksLogo.svg"
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
                src="/illustrations/bakeryLogo.svg"
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
        <h1>Your Cart</h1>
        <hr className="cart-divider" />

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="cart-items-list">
              {cartItems.map((item, index) => (
                <li className="cart-item" key={index}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="quantity-controls">
                      <button onClick={() => updateItemQuantity(index, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateItemQuantity(index, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="delete-item-btn"
                    onClick={() => handleDeleteItem(index)}
                    aria-label={`Remove ${item.name}`}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <>
            <div className="cart-summary">
              <p className="total-price">Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <Button color="green" className="fixed-bottom">
              Check Out Now
            </Button>
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
