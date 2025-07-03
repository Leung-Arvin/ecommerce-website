import "./LandingPage.css";
import matchaBanner from "../../assets/matchaBanner.svg";
import PromoCard from "../../components/promo-card/PromoCard";
import productData from "../../data/products.json";
import Button from "../../components/button/Button";
import Navbar from "../../components/nav-bar/navbar";
import ProductCard from "../../components/product-card/ProductCard";

export default function LandingPage() {
  const featuredSnacks = productData.products.snacks.slice(1, 4);
  const matchaDrinks = productData.products.drinks.slice(0, 5);
  const matchaBakery = productData.products.bakery.slice(2, 7);

  return (
    <div className="landing-container">
      <div className="banner-container">
        <img
          src={matchaBanner}
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
      <Navbar />

      <section className="main-container">
        <div className="side-by-side-container">
          <section className="container">
            <div className="side-by-side-container">
              <section className="hero-banner">
                <h2>Celebrate Canada Day!</h2>
                <h1>20% off your purchase with code GOCANADA</h1>
                <Button color="green">SHOP NOW</Button>
              </section>
              <img
                src="https://www.tofucute.com/images/blog/matcha600.png"
                alt=""
                style={{ width: "50%", borderRadius: "10px" }}
              />
            </div>
          </section>

          <section className="promo-section">
            {featuredSnacks.map((snack) => (
              <PromoCard key={snack.id} product={snack} />
            ))}
          </section>
        </div>
        <section className="product-section">
          <div className="product-header">
            <div>
              <h2>Matcha Drinks</h2>
              <p>Matcha crafted in Uji, Kyoto, Japan.</p>
            </div>
            <a href="" className="view-all-link">
              View All
            </a>
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
