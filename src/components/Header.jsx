
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../features/cart/cartSlice";

function Header() {
  const totalItems = useSelector(selectTotalItems);

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">🛍 ShopKart</Link>

        <nav className="nav-links">
          <NavLink to="/" end>Products</NavLink>
          <NavLink to="/cart" className="cart-link">
            🛒 Cart
            <span className="cart-badge">{totalItems}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
