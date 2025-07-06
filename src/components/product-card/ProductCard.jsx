import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";



export default function ProductCard({ product }) {


  return (
    <div className="product-card">
      <img className="product-image" src={product.image} alt={product.name} />

      <button className="add-to-cart-button">
        <span className="plus-icon">+</span> ADD TO CART
      </button>

      <Link to={`/products/${product.id}`} className="product-name-link">
        <p className="product-name">{product.name}</p>
      </Link>
      <p className="product-price">${product.price.toFixed(2)}</p>
    </div>
  );
}