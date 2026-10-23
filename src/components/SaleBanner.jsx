
function SaleBanner() {
  const handleShopNow = () => {
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="sale-banner">
      <div className="sale-content">
        <span className="sale-label">SPECIAL SALE</span>

        <h1>Big Shopping Sale!</h1>

        <p>
          Discover amazing products with discounts
          of up to 25%. Shop your favorites today!
        </p>

        <button
          className="sale-button"
          onClick={handleShopNow}
        >
          Shop Now →
        </button>
      </div>

      <div className="sale-visual" aria-hidden="true">
        <span>🛍️</span>
      </div>
    </section>
  );
}

export default SaleBanner;
