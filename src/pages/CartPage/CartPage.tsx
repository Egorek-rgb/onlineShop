// src/pages/CartPage/CartPage.tsx
import React from "react";
import { useCart } from "../../app/context/CartContext";
import styles from "./CartPage.module.css";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();

  // Безопасное форматирование цены - добавляем проверку
  const formatPrice = (price: number | undefined): string => {
    // Если цена не определена или не число, возвращаем $0.00
    if (typeof price !== "number" || isNaN(price)) {
      return "$0.00";
    }
    return `$${price.toFixed(2)}`;
  };

  // Увеличение количества товара
  const increaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity && currentQuantity > 0) {
      updateQuantity(id, currentQuantity + 1);
    }
  };

  // Уменьшение количества товара
  const decreaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity && currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  // Расчет стоимости доставки (бесплатно при заказе от $100)
  const calculateShipping = () => {
    const total = getTotalPrice();
    return total > 100 ? 0 : 15;
  };

  const shippingCost = calculateShipping();
  const totalPrice = getTotalPrice();
  const grandTotal = totalPrice + shippingCost;

  // Если корзина пуста
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <div className={styles.emptyCartIcon}>🛒</div>
            <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
            <p className={styles.emptyCartText}>
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/" className={styles.continueShoppingLink}>
              Continue Shopping →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        {/* Хлебные крошки */}
        <div className={styles.breadcrumb}>
          <Link to="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbActive}>Cart</span>
        </div>

        <h1 className={styles.pageTitle}>Shopping Cart</h1>

        {/* Таблица корзины для десктопа */}
        <div className={styles.cartTable}>
          {/* Заголовки таблицы */}
          <div className={styles.cartHeader}>
            <div className={styles.headerProduct}>Product</div>
            <div className={styles.headerPrice}>Price</div>
            <div className={styles.headerQuantity}>Quantity</div>
            <div className={styles.headerSubtotal}>Subtotal</div>
            <div className={styles.headerAction}></div>
          </div>

          {/* Список товаров */}
          <div className={styles.cartItems}>
            {cartItems.map((item) => {
              // Безопасная проверка наличия товара
              if (!item || !item.id) return null;

              const itemPrice = item.price || 0;
              const itemQuantity = item.quantity || 1;
              const subtotal = itemPrice * itemQuantity;

              return (
                <div key={item.id} className={styles.cartRow}>
                  <div className={styles.productInfo}>
                    <div className={styles.productImage}>
                      {item.image ? (
                        <img src={item.image} alt={item.name || "Product"} />
                      ) : (
                        <div className={styles.imagePlaceholder}>📦</div>
                      )}
                    </div>
                    <div className={styles.productDetails}>
                      <h3 className={styles.productName}>
                        {item.name || "Unknown Product"}
                      </h3>
                      <p className={styles.productId}>ID: #{item.id}</p>
                    </div>
                  </div>

                  <div className={styles.productPrice}>
                    {formatPrice(itemPrice)}
                  </div>

                  <div className={styles.productQuantity}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => decreaseQuantity(item.id, itemQuantity)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className={styles.quantityValue}>{itemQuantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => increaseQuantity(item.id, itemQuantity)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.productSubtotal}>
                    {formatPrice(subtotal)}
                  </div>

                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Мобильное представление корзины */}
        <div className={styles.mobileCart}>
          {cartItems.map((item) => {
            if (!item || !item.id) return null;

            const itemPrice = item.price || 0;
            const itemQuantity = item.quantity || 1;

            return (
              <div key={item.id} className={styles.mobileCartItem}>
                <div className={styles.mobileProductHeader}>
                  <div className={styles.mobileProductImage}>
                    {item.image ? (
                      <img src={item.image} alt={item.name || "Product"} />
                    ) : (
                      <div className={styles.imagePlaceholder}>📦</div>
                    )}
                  </div>
                  <div className={styles.mobileProductInfo}>
                    <h3 className={styles.mobileProductName}>
                      {item.name || "Unknown Product"}
                    </h3>
                    <p className={styles.mobileProductPrice}>
                      {formatPrice(itemPrice)}
                    </p>
                  </div>
                  <button
                    className={styles.mobileRemoveButton}
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </div>

                <div className={styles.mobileQuantitySection}>
                  <span className={styles.mobileQuantityLabel}>Quantity:</span>
                  <div className={styles.productQuantity}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => decreaseQuantity(item.id, itemQuantity)}
                    >
                      -
                    </button>
                    <span className={styles.quantityValue}>{itemQuantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => increaseQuantity(item.id, itemQuantity)}
                    >
                      +
                    </button>
                  </div>
                  <div className={styles.mobileSubtotal}>
                    <span>Subtotal:</span>
                    <strong>{formatPrice(itemPrice * itemQuantity)}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Кнопки действий */}
        <div className={styles.cartActions}>
          <Link to="/" className={styles.continueShopping}>
            ← Continue Shopping
          </Link>
          <button className={styles.clearCart} onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        {/* Сводка заказа */}
        <div className={styles.orderSummary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>
                {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
              </span>
            </div>

            {shippingCost > 0 && totalPrice < 100 && (
              <div className={styles.shippingNotice}>
                ✨ Add ${(100 - totalPrice).toFixed(2)} more to get free
                shipping
              </div>
            )}

            <div className={styles.divider}></div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>

            <button className={styles.checkoutButton}>
              Proceed to Checkout →
            </button>

            <div className={styles.paymentMethods}>
              <p>Secure payment with:</p>
              <div className={styles.paymentIcons}>
                <span>💳 Visa</span>
                <span>💳 Mastercard</span>
                <span>🟦 PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
