import React from "react";
import "./ProductCard.css";
import { useCart } from "../cart/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link-wrapper">
        <img className="product-image" src={product.image} alt={product.name} />
        <p className="product-name">{product.name}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </Link>

      <button className="add-to-cart-button" onClick={handleAddToCart}>
        <span className="plus-icon">+</span> ADD TO CART
      </button>
    </div>
  );
}
