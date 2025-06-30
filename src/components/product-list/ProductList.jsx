// In your ProductList.jsx
import React from 'react';
import './ProductList.css';

export const ProductList = ({ items = [], className = '' }) => {
  return (
    <div className={`product-list-container ${items.length > 4 ? 'scrollable' : ''} ${className}`}>
      <div className="product-items">
        {items.map((product, index) => (
          <div key={`${product.id}-${index}`} className="product-item">
            <div className="product-info">
              <img src={product.image} className='product-image'/>
              <span className="product-name">{product.name}</span>
              {product.quantity > 1 && (
                <span className="product-quantity">×{product.quantity}</span>
              )}
            </div>
            <span className="product-price">
              ${(product.price * (product.quantity || 1)).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

