import React, { useState } from "react";

const CartPage = ({ orders, onDelete, goBack, clearOrders }) => {
  const [showForm, setShowForm] = useState(false);
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [orderDone, setOrderDone] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const totalSum = orders.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );

  const deliveryPrice =
    deliveryType === "courier"
      ? totalSum > 10000
        ? 0
        : 300
      : 0;

  const finalSum = totalSum + deliveryPrice;

  const remainingForFreeDelivery = 10000 - totalSum;

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const canSubmit =
    name.trim() !== "" &&
    phone.trim() !== "" &&
    isEmailValid;

  // подтвержение заказа
  const confirmOrder = () => {
    setShowForm(false);
    setOrderDone(true);
    clearOrders(); // очистка заказа
  };

  return (
    <main className="cart-page">
      <h1>Корзина</h1>

      {orders.length === 0 && !orderDone ? (
        <p className="cart-empty">Ваша корзина пуста 🌸</p>
      ) : (
        <>
          {!orderDone && (
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

                <button
                  className="checkout-btn"
                  onClick={() => setShowForm(true)}
                >
                  Оформить заказ
                </button>
              </div>
            </>
          )}
        </>
      )}

      <button className="back-btn" onClick={goBack}>
        ← Вернуться в каталог
      </button>

      {/* Модальное окно */}
      {showForm && (
        <div className="order-modal">
          <div className="order-modal-content">
            <h2>Оформление заказа</h2>

            <input
              type="text"
              placeholder="ФИО"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Номер телефона"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              type="email"
              placeholder="Электронная почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={!isEmailValid && email ? "input-error" : ""}
            />

            <div className="delivery-options">
              <label>
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === "pickup"}
                  onChange={() => setDeliveryType("pickup")}
                />
                Самовывоз
              </label>

              <label>
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === "courier"}
                  onChange={() => setDeliveryType("courier")}
                />
                Доставка курьером
              </label>
            </div>

            {deliveryType === "courier" && (
              <textarea placeholder="Адрес доставки" />
            )}

            <div className="order-summary">
              <p>
                Сумма товаров: <b>{totalSum.toFixed(2)} ₽</b>
              </p>

              {deliveryType === "courier" && (
                <>
                  <p>
                    Доставка:{" "}
                    <b>
                      {totalSum > 10000 ? "Бесплатно" : "300 ₽"}
                    </b>
                  </p>

                  {remainingForFreeDelivery > 0 && (
                    <p className="free-delivery-hint">
                      Добавьте ещё{" "}
                      <b>{remainingForFreeDelivery.toFixed(0)} ₽</b>{" "}
                      до бесплатной доставки
                    </p>
                  )}
                </>
              )}

              <p className="final-sum">
                Итоговая сумма: <b>{finalSum.toFixed(2)} ₽</b>
              </p>
            </div>

            <div className="order-buttons">
              <button
                className="checkout-btn"
                disabled={!canSubmit}
                onClick={confirmOrder}
              >
                Подтвердить
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Заказ оформлен */}
      {orderDone && (
        <div className="order-success">
          <h2>Заказ оформлен 🌸</h2>
          <p>
            Для оплаты с вами свяжется наш менеджер в ближайшее время
          </p>
        </div>
      )}
    </main>
  );
};

export default CartPage;
