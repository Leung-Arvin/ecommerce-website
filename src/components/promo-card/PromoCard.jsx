import React from "react";
import "./PromoCard.css";
import { Link } from "react-router-dom";

export default function PromoCard({ product }) {
  return (
    <div className="promo-card">
      <div className="card-text">
        <p className="card-title">
          ${product.price.toFixed(2)} for a pack of {product.name}{" "}
        </p>
        <Link to={`/products/${product.id}`}>
          <button className="card-button">Buy Now</button>
        </Link>
      </div>
      <img className="card-image" src={product.image} alt={product.name} />
    </div>
  );
}
