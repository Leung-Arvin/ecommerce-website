import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./LandingPage.css";
import PromoCard from "../../components/promo-card/PromoCard";
import productData from "../../data/products.json";
import Button from "../../components/button/Button";
import Navbar from "../../components/nav-bar/Navbar";
import ProductCard from "../../components/product-card/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import MainBanner from "../../components/main-banner/MainBanner";

export default function LandingPage() {
  let navigate = useNavigate();
  const featuredSnacks = productData.products.snacks.slice(1, 4);
  const matchaDrinks = productData.products.drinks;
  const matchaBakery = productData.products.bakery;
  const heroBannerRef = useRef(null);
  const promoSectionRef = useRef(null);
  const drinksSectionRef = useRef(null);
  const bakerySectionRef = useRef(null);

  useEffect(() => {
    gsap.set(
      [
        heroBannerRef.current,
        promoSectionRef.current,
        drinksSectionRef.current,
        bakerySectionRef.current,
      ],
      {
        opacity: 0,
        y: 20,
      }
    );
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(heroBannerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })
      .to(
        promoSectionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.4"
      )
      .to(drinksSectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      })
      .to(
        bakerySectionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      );
  }, []);

  return (
    <div className="landing-container">
      <Navbar />
      <MainBanner />

      <section className="main-container">
        <div className="side-by-side-container">
          <div className="container">
            <div className="side-by-side-container">
              <section className="hero-banner" ref={heroBannerRef}>
                <h2>Celebrate Canada Day!</h2>
                <h1>
                  20% off your purchase with code: <br />
                  GOCANADA
                </h1>
                <Button onClick={() => navigate("/browse")} color="green">
                  SHOP NOW
                </Button>
              </section>
              <img
                src="https://www.tofucute.com/images/blog/matcha600.png"
                alt=""
                style={{
                  display: "flex",
                  width: "40%",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>

          <section className="promo-section" ref={promoSectionRef}>
            {featuredSnacks.map((snack) => (
              <PromoCard key={snack.id} product={snack} />
            ))}
          </section>
        </div>
        <section className="product-section" ref={drinksSectionRef}>
          <div>
            <div>
              <h2>Matcha Drinks</h2>
              <p>Matcha crafted in Uji, Kyoto, Japan.</p>
            </div>
            <Link to="/drinks" className="view-all-link">
              View All
            </Link>
          </div>
          <div className="product-scroll-container">
            <div className="product-scroll">
              {matchaDrinks.map((drink) => (
                <ProductCard key={drink.id} product={drink} />
              ))}
            </div>
          </div>
        </section>
        <section className="product-section" ref={bakerySectionRef}>
          <div className="product-header">
            <div>
              <h2>Matcha Bakery</h2>
              <p>
                Handcrafted, home-baked pastries made fresh daily at the Matcha
                Mart, using premium matcha from Uji, Kyoto, Japan.
              </p>
            </div>
            <Link to="/bakery" className="view-all-link">
              View All
            </Link>
          </div>
          <div className="product-scroll-container">
            <div className="product-scroll">
              {matchaBakery.map((bakery) => (
                <ProductCard key={bakery.id} product={bakery} />
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
