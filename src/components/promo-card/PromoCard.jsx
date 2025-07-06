import React from "react";
import "./PromoCard.css";
import { Link } from "react-router-dom";

export default function PromoCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="promo-card-link">
      <div className="promo-card">
        <div className="card-text">
          <p className="card-title">
            ${product.price.toFixed(2)} for a pack of {product.name}
          </p>
          <button className="card-button">Buy Now</button>
        </div>
        <img className="card-image" src={product.image} alt={product.name} />
      </div>
    </Link>
  );
}
