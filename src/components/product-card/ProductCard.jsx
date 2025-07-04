import React from "react";
import "./ProductCard.css";
import { useCart } from "../cart/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img className="product-image" src={product.image} alt={product.name} />

      <button className="add-to-cart-button" onClick={handleAddToCart}>
        <span className="plus-icon">+</span> ADD TO CART
      </button>

      <Link to={`/products/${product.id}`} className="product-name-link">
        <p className="product-name">{product.name}</p>
      </Link>
      <p className="product-price">${product.price.toFixed(2)}</p>
    </div>
  );
}
