import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Order from "./Order";
import flower from "./../img/flower.svg";

export default function Header({ orders, onDelete, goToCart, goToCatalog }) {

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

      {}
      <button
        className="checkout-btn"
        onClick={() => {
          setCartOpen(false); // закрываем окошко
          goToCart();         // переходим в корзину
        }}
      >
        Перейти в корзину
      </button>
    </div>
  );
};


  const showNothing = () => (
    <div className="empty">
      <h2>Товаров нет</h2>
    </div>
  );

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
            <li onClick={() => setCartOpen(false)}>Каталог</li>
            <li>Контакты</li>
            <li>Адреса</li>
            <li>О нас</li>
          </ul>
        </div>

        {cartOpen && (
          <div className="shop-cart">
            {orders.length > 0 ? showOrders(orders) : showNothing()}
          </div>
        )}
      </div>

      <div className="presentation"></div>
    </header>
  );
}
