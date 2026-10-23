
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";
import SaleBanner from "../components/SaleBanner";

function ProductList() {
  const dispatch = useDispatch();

  const { items, status, error } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const categories = [
    "all",
    ...new Set(items.map((product) => product.category)),
  ];

  let filtered = items.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  filtered = [...filtered];

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <main className="container">
      <div className="search-section">
        <span className="search-icon">⌕</span>

        <input
          type="search"
          placeholder="Search products by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
      </div>

      <SaleBanner />

      <section id="products" className="products-section">
        <div className="page-heading">
          <div>
            <h1>Explore Products</h1>
            <p>Find your favorite products at great prices.</p>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort by Price</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <div className="category-chips">
          {categories.map((c) => (
            <button
              key={c}
              className={`chip ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c === "all" ? "All Products" : c}
            </button>
          ))}
        </div>

        {status === "loading" || status === "idle" ? (
          <p>Loading products...</p>
        ) : status === "failed" ? (
          <div>
            <p>{error || "Unable to load products."}</p>

            <button
              className="primary-button"
              onClick={() => dispatch(fetchProducts())}
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <p className="result-count">
              {filtered.length} products found
            </p>

            {filtered.length === 0 ? (
              <div className="no-results">
                <h2>No products found</h2>
                <p>Try searching for something else.</p>

                <button
                  className="primary-button"
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default ProductList;
