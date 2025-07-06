import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../components/cart/CartContext.jsx";
import "./ProductDetail.css";
import productData from "../../data/products.json";
import Navbar from "../../components/nav-bar/Navbar.jsx";

import Button from "../../components/button/Button.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const allProducts = Object.values(productData.products).flat();
  const product = allProducts.find((p) => p.id.toString() === id);

  if (!product) {
    return <div className="product-detail">Product not found.</div>;
  }

  function getCategoryFromId(productId) {
    for (const [category, products] of Object.entries(productData.products)) {
      if (products.some((product) => product.id === productId)) {
        return category.charAt(0).toUpperCase() + category.slice(1);
      }
    }
    return "Unknown";
  }

  return (
    <>
      <Navbar />
      <div className="product-detail">
        <div className="details-container">
          <div className="detail-wrapper">
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "20vw",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <div className="detail-info">
              <p>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </Link>{" "}
                / {getCategoryFromId(id)}
              </p>

              <h1>{product.name}</h1>
              <p className="detail-price">${product.price.toFixed(2)}</p>
              <p className="in-stock">
                <span className="in-stock-circle"></span> In stock, ready to
                ship
              </p>

              <Button color="white" onClick={() => addToCart(product)}>
                Add to cart
              </Button>

              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
