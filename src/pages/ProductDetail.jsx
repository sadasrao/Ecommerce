
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { items, status, error } = useSelector(
    (state) => state.products
  );

  const product = items.find((item) => item.id === Number(id));

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  if (status === "loading" || status === "idle") {
    return <main className="container">Loading products...</main>;
  }

  if (status === "failed") {
    return (
      <main className="container">
        <p role="alert">{error}</p>
        <button
          className="primary-button"
          onClick={() => dispatch(fetchProducts())}
        >
          Try again
        </button>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container">
        <h2>Product not found</h2>
        <Link to="/">Back to products</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <div className="pdp-layout">
        <div className="pdp-gallery">
          <div className="pdp-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="gallery-thumbnail">
            <img src={product.image} alt="Product thumbnail" />
          </div>
        </div>

        <div className="pdp-info">
          <p className="category-label">{product.category}</p>
          <h1>{product.title}</h1>

          <div className="rating">
            <span>★ {product.rating?.rate ?? "N/A"}</span>
            <small>
              ({product.rating?.count ?? 0} reviews)
            </small>
          </div>

          <h2 className="pdp-price">
            ${product.price.toFixed(2)}
          </h2>

          <h3>Description</h3>
          <p className="description">{product.description}</p>

          <h3>Quantity</h3>

          <div className="quantity-stepper">
            <button
              disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              −
            </button>

            <span>{quantity}</span>

            <button onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>

          <button
            className="primary-button pdp-add"
            onClick={() =>
              dispatch(addToCart({ product, quantity }))
            }
          >
            🛒 Add {quantity} to Cart
          </button>

          <p className="shipping-note">
            Free shipping on orders of $100 or more
          </p>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;
