import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Order from "./Order";
import flower from "./../img/flower.svg";

export default function Header({
  orders,
  onDelete,
  goToCart,
  goToCatalog,
  goToAbout,
  goToConstructor,
  pageView,
}) {
  const [cartOpen, setCartOpen] = useState(false);

  const showOrders = (orders) => {
    let sum = 0;
    orders.forEach((el) => (sum += parseFloat(el.price)));

    return (
      <div className="shop-cart-container">
        {orders.map((el, index) => (
          <Order key={index} item={el} onDelete={onDelete} />
        ))}

        <p className="sum">
          Сумма: {new Intl.NumberFormat().format(sum)} ₽
        </p>

        <button
          className="checkout-btn"
          onClick={() => {
            setCartOpen(false);
            goToCart();
          }}
        >
          Перейти в корзину
        </button>
      </div>
    );
  };

  return (
    <header>
      <div>
        <span className="logo" onClick={goToCatalog}>
          CHECHETOCHKA
          <img src={flower} alt="logo" />
        </span>

        <div className="nav">
          <FaShoppingCart
            onClick={() => setCartOpen(!cartOpen)}
            className={`shop-cart-button ${cartOpen && "active"}`}
          />

          <ul className="nav-ul">
            <li
              className={pageView === "catalog" ? "active" : ""}
              onClick={goToCatalog}
            >
              Каталог
            </li>

              {}
            <li
              className={pageView === "constructor" ? "active" : ""}
              onClick={goToConstructor}
            >
              Собрать букет
            </li>

            <li
              onClick={() =>
                document
                  .getElementById("footer-contacts")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Контакты
            </li>

            <li
              onClick={() =>
                document
                  .getElementById("footer-address")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Адрес
            </li>

            <li
              className={pageView === "about" ? "active" : ""}
              onClick={goToAbout}
            >
              О нас
            </li>
          </ul>
        </div>

        {cartOpen && (
          <div className="shop-cart">
            {orders.length ? showOrders(orders) : <h2>Товаров нет</h2>}
          </div>
        )}
      </div>

      <div className="presentation"></div>
    </header>
  );
}
