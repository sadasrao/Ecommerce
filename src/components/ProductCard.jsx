
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";

import QuantityStepper from "./QuantityStepper";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const quantity = cartItem?.quantity || 0;

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>
      </Link>

      <div className="product-content">
        <p className="category-label">{product.category}</p>

        <Link
          to={`/product/${product.id}`}
          className="product-title"
        >
          {product.title}
        </Link>

        <div className="rating">
          <span>★ {product.rating?.rate ?? "N/A"}</span>
          <small>({product.rating?.count ?? 0} reviews)</small>
        </div>

        <div className="product-bottom">
          <strong className="product-price">
            ${product.price.toFixed(2)}
          </strong>

          {quantity === 0 ? (
            <button
              className="primary-button"
              onClick={() =>
                dispatch(addToCart({ product, quantity: 1 }))
              }
            >
              Add to cart
            </button>
          ) : (
            <QuantityStepper
              quantity={quantity}
              onIncrease={() =>
                dispatch(increaseQuantity(product.id))
              }
              onDecrease={() =>
                dispatch(decreaseQuantity(product.id))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
