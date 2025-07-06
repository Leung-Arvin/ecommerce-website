import React from "react";
import "./Navbar.css";
import { useCart } from "../../components/cart/CartContext.jsx";
import Button from "../button/Button.jsx";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  let navigate = useNavigate();
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
          <Link to="/" className="logo">
            <img src="/illustrations/logoMascot.svg" alt="Mascot" />
          </Link>

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
        <Link to="/browse" className="category-link">
            <span>New Arrivals</span>
          </Link>

          <Link to="/browse" className="category-link">
            <span>Best Sellers</span>
          </Link>

          <Link to="/snacks" className="category-link">
            <button className="dropdown-toggle">
              <img
                src="/illustrations/sweetsLogo.svg"
                style={{
                  width: "1.5vw",
                  height: "auto",
                  marginRight: "0.5em",
                  verticalAlign: "middle",
                }}
                alt="Sweets"
              />
              <span>Sweets</span>
            </button>
          </Link>

          <Link to="/drinks" className="category-link">
            <button className="dropdown-toggle">
              <img
                src="/illustrations/drinksLogo.svg"
                style={{
                  width: "1.5vw",
                  height: "auto",
                  marginRight: "0.5em",
                  verticalAlign: "middle",
                }}
                alt="Drinks"
              />
              <span>Drinks</span>
            </button>
          </Link>

          <Link to="/bakery" className="category-link">
            <button className="dropdown-toggle">
              <img
                src="/illustrations/bakeryLogo.svg"
                style={{
                  width: "1.5vw",
                  height: "auto",
                  marginRight: "0.5em",
                  verticalAlign: "middle",
                }}
                alt="Bakery"
              />
              <span>Bakery</span>
            </button>
          </Link>
          <Link to="/browse" className="category-link">
            <span>Browse All</span>
          </Link>
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
            <Button
              onClick={() => navigate("/checkout-form")}
              color="green"
              className="fixed-bottom"
            >
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
