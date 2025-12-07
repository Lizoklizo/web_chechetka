import React from "react";

const CartPage = ({ orders, onDelete, goBack }) => {
  const totalSum = orders.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );

  return (
    <main className="cart-page">
      <h1>Корзина</h1>

      {orders.length === 0 ? (
        <p className="cart-empty">Ваша корзина пуста 🌸</p>
      ) : (
        <>
          <div className="cart-list">
            {orders.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={"./img/" + item.img} alt={item.title} />

                <div className="cart-info">
                  <h2>{item.title}</h2>
                  <b>{item.price} ₽</b>
                </div>

                <span
                  className="delete-icon"
                  onClick={() => onDelete(item.id)}
                >
                  ✕
                </span>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Итого: {totalSum.toFixed(2)} ₽</h2>
            <button className="checkout-btn">Оформить заказ</button>
          </div>
        </>
      )}

      <button className="back-btn" onClick={goBack}>
        ← Вернуться в каталог
      </button>
    </main>
  );
};

export default CartPage;
