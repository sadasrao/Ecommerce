
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  selectTotalItems,
  selectTotalPrice,
} from "../features/cart/cartSlice";

import QuantityStepper from "../components/QuantityStepper";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalItems = useSelector(selectTotalItems);
  const subtotal = useSelector(selectTotalPrice);

  const shipping = subtotal >= 100 ? 0 : 5;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main className="container empty-cart">
        <div className="empty-icon">🛒</div>
        <h1>Your cart is empty</h1>
        <p>Looks like you haven't added anything yet.</p>

        <Link to="/" className="primary-button">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="page-heading">
        <div>
          <h1>Shopping Cart</h1>
          <p>{totalItems} items in your cart</p>
        </div>

        <button
          className="clear-button"
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-row" key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.title} />
              </Link>

              <div className="cart-item-info">
                <Link
                  to={`/product/${item.id}`}
                  className="product-title"
                >
                  {item.title}
                </Link>

                <p className="category-label">{item.category}</p>
                <p>${item.price.toFixed(2)} each</p>

                <QuantityStepper
                  quantity={item.quantity}
                  onIncrease={() =>
                    dispatch(increaseQuantity(item.id))
                  }
                  onDecrease={() =>
                    dispatch(decreaseQuantity(item.id))
                  }
                />

                <button
                  className="remove-button"
                  onClick={() =>
                    dispatch(removeFromCart(item.id))
                  }
                >
                  Remove
                </button>
              </div>

              <strong className="line-total">
                ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}
        </div>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-line">
            <span>Subtotal ({totalItems} items)</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <strong className={shipping === 0 ? "free" : ""}>
              {shipping === 0 ? "FREE" : "$5.00"}
            </strong>
          </div>

          <hr />

          <div className="summary-line summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <p className="shipping-message">
            {shipping === 0
              ? "🎉 You qualify for free shipping!"
              : `Add $${(100 - subtotal).toFixed(2)} more for free shipping`}
          </p>

          <button
            className="primary-button checkout-button"
            disabled
            title="Checkout is not part of this task"
          >
            Proceed to Checkout
          </button>

          <Link to="/" className="continue-link">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
