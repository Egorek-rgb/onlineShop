import { useState, useEffect } from "react";
import logo from "../../../assets/Logo (1).svg";
import styles from "./Header.module.css";
import whishList from "../../../assets/Wishlist.svg";
import cart from "../../../assets/cart.svg";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const { getTotalItems } = useCart();
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    // Обновляем счетчик при изменении корзины
    setCartItemCount(getTotalItems());
  }, [getTotalItems]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className={styles.header__wrapper}>
        <div className={styles.header}>
          <div className={styles.header__logo}>
            <img src={logo} alt="Логотип" />
          </div>

          <nav className={styles.header__navigation}>
            <ul className={styles.header__list}>
              <Link to="/" className={styles.header__listItem}>
                Home
              </Link>
              <li className={styles.header__listItem}>Contact</li>
              <li className={styles.header__listItem}>About</li>
              <li className={styles.header__listItem}>Sign Up</li>
            </ul>
          </nav>

          {isMobile && (
            <div className={styles.header__burger}>
              <button className={styles.burgerButton} onClick={toggleMenu}>
                <div
                  className={`${styles.burgerIcon} ${isMenuOpen ? styles.open : ""}`}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>
          )}

          <div className={styles.header__searchAndIcons}>
            <form action="">
              <div className={styles.header__searchWrapper}>
                <input
                  type="search"
                  className={styles.header__search}
                  placeholder="What are you looking for?"
                />
              </div>
            </form>
            <div className={styles.header__icons}>
              <div className={styles.header__wishList}>
                <img src={whishList} alt="wishList" />
              </div>
              <div className={styles.header__cart}>
                <Link to="/cart" className={styles.cartLink}>
                  <img src={cart} alt="cart" />
                  {cartItemCount > 0 && (
                    <span className={styles.cartBadge}>{cartItemCount}</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobile && (
        <div
          className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}
        >
          <div className={styles.mobileMenuHeader}>
            <img src={logo} alt="Логотип" className={styles.mobileMenuLogo} />
            <button className={styles.closeButton} onClick={closeMenu}>
              <span className={styles.closeIcon}>×</span>
            </button>
          </div>
          <ul className={styles.mobileMenuList}>
            <li className={styles.mobileMenuItem} onClick={closeMenu}>
              Home
            </li>
            <li className={styles.mobileMenuItem} onClick={closeMenu}>
              Contact
            </li>
            <li className={styles.mobileMenuItem} onClick={closeMenu}>
              About
            </li>
            <li className={styles.mobileMenuItem} onClick={closeMenu}>
              Sign Up
            </li>
          </ul>
        </div>
      )}

      {isMobile && isMenuOpen && (
        <div className={styles.overlay} onClick={closeMenu}></div>
      )}
    </>
  );
};

export default Header;
