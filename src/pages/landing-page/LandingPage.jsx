import "./LandingPage.css";
import PromoCard from "../../components/promo-card/PromoCard";
import productData from "../../data/products.json";
import Button from "../../components/button/Button";
import Navbar from "../../components/nav-bar/Navbar";
import ProductCard from "../../components/product-card/ProductCard";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const featuredSnacks = productData.products.snacks.slice(1, 4);
  const matchaDrinks = productData.products.drinks.slice(0, 5);
  const matchaBakery = productData.products.bakery.slice(2, 7);

  return (
    <div className="landing-container">
      <Navbar />
      <div className="banner-container">
        <img
          src="/illustrations/matchaBanner.svg"
          alt="Premium Matcha Products"
          className="full-width-banner"
          style={{
            width: "100vw",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>

      <section className="main-container">
        <div className="side-by-side-container">
          <div className="container">
            <div className="side-by-side-container">
              <section className="hero-banner">
                <h2>Celebrate Canada Day!</h2>
                <h1>
                  20% off your purchase with code: <br />
                  GOCANADA
                </h1>
                <Button color="green">SHOP NOW</Button>
              </section>
              <img
                src="https://www.tofucute.com/images/blog/matcha600.png"
                alt=""
                style={{ display: "flex", width: "40%", borderRadius: "10px" }}
              />
            </div>
          </div>

          <section className="promo-section">
            {featuredSnacks.map((snack) => (
              <PromoCard key={snack.id} product={snack} />
            ))}
          </section>
        </div>
        <section className="product-section">
          <div>
            <div>
              <h2>Matcha Drinks</h2>
              <p>Matcha crafted in Uji, Kyoto, Japan.</p>
            </div>
            <Link to="/products/drinks" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="product-grid">
            {matchaDrinks.map((drink) => (
              <ProductCard key={drink.id} product={drink} />
            ))}
          </div>
        </section>
        <section className="product-section">
          <div className="product-header">
            <div>
              <h2>Matcha Bakery</h2>
              <p>Matcha crafted in Uji, Kyoto, Japan.</p>
            </div>
            <a href="" className="view-all-link">
              View All
            </a>
          </div>

          <div className="product-grid">
            {matchaBakery.map((bakery) => (
              <ProductCard key={bakery.id} product={bakery} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
