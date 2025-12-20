import React, { useState } from "react";
import wel1 from "../img/wel1.jpg";
import wel2 from "../img/wel2.jpg";
import wel3 from "../img/wel3.jpg";
import wel4 from "../img/wel4.jpg";
import wel5 from "../img/wel5.jpg";


const CartPage = ({ orders, onDelete, goBack, clearOrders }) => {
const [showForm, setShowForm] = useState(false);
const [deliveryType, setDeliveryType] = useState("pickup");
const [orderDone, setOrderDone] = useState(false);

const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");

// открытки 
const [card, setCard] = useState(null);
const [cardText, setCardText] = useState("");

const cards = [
    { id: 1, title: "Открытка 1", price: 100, img: wel1 },
    { id: 2, title: "Открытка 2", price: 100, img: wel2 },
    { id: 3, title: "Открытка 3", price: 100, img: wel3 },
    { id: 4, title: "Открытка 4", price: 100, img: wel4 },
    { id: 5, title: "Открытка 5", price: 100, img: wel5 }
];


const [step, setStep] = useState("card"); 


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

const cardPrice = card ? card.price : 0;
const finalSum = totalSum + deliveryPrice + cardPrice;


const remainingForFreeDelivery = 10000 - totalSum;

const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const canSubmit =
    name.trim() !== "" &&
    phone.trim() !== "" &&
    isEmailValid;

// Расчёт даты готовности заказа
const now = new Date();
const currentHour = now.getHours();

const deliveryDate = new Date();
let deliveryText = "";

if (currentHour < 17) {
    deliveryText = "Заказ будет готов сегодня";
} else {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
    deliveryText = "Заказ будет готов завтра";
}

const formattedDate = deliveryDate.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long"
});




  // подтвержение заказа
const confirmOrder = () => {
    const orderData = {
        name,
        phone,
        email,
        deliveryType,
        items: orders.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: 1
        })),
        card: card
            ? {
                title: card.title,
                price: card.price,
                text: cardText
            }
            : null,
        total: finalSum,
        readyDate: formattedDate,
        readyText: deliveryText
    };


  fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Order sent:", data);
      setShowForm(false);
      setOrderDone(true);
      clearOrders();
    })
    .catch(err => {
      console.error("Order error:", err);
    });
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
                    <div
                    key={index}
                    className={`cart-item ${item.category === "constructor" ? "custom-bouquet" : ""}`}
                    >
                    {/* КАРТИНКА */}
                    <div className="cart-image">
                        <img
                            src={item.img.startsWith("/") ? item.img : `/img/${item.img}`}
                            alt={item.title}
                        />
                        {item.category === "constructor" && (
                        <span className="custom-badge">Собран вручную</span>
                        )}
                    </div>

                    {/* ИНФОРМАЦИЯ */}
                    <div className="cart-info">
                        <h2>{item.title}</h2>

                        {item.category === "constructor" && (
                        <p className="cart-desc">{item.desc}</p>
                        )}

                        <b>{item.price} ₽</b>
                    </div>

                    {/* УДАЛЕНИЕ */}
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
                    onClick={() => {
                    setStep("card");
                    setShowForm(true);
                    }}
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

        {/* МОДАЛКА */}
        {showForm && (
        <div className="order-modal">
            <div className="order-modal-content">

            {/* ===== ШАГ 1: ОТКРЫТКИ ===== */}
            {step === "card" && (
                <>
                <h2>Выберите открытку</h2>

            <div className="card-grid">
                <div
                    className={`card-item ${!card ? "active" : ""}`}
                    onClick={() => setCard(null)}
                >
                    <div className="card-placeholder">
                    Без открытки
                    </div>
                </div>

                {cards.map(c => (
                    <div
                    key={c.id}
                    className={`card-item ${card?.id === c.id ? "active" : ""}`}
                    onClick={() => setCard(c)}
                    >
                    <img src={c.img} alt={c.title} />
                    <div className="card-meta">
                        <span>{c.title}</span>
                        <small>+{c.price} ₽</small>
                    </div>
                    </div>
                ))}
            </div>


                {card && (
                    <textarea
                    placeholder="Текст поздравления (необязательно)"
                    value={cardText}
                    onChange={e => setCardText(e.target.value)}
                    />
                )}

                <div className="order-buttons">
                    <button
                    className="checkout-btn"
                    onClick={() => setStep("form")}
                    >
                    Продолжить
                    </button>

                    <button
                    className="cancel-btn"
                    onClick={() => setShowForm(false)}
                    >
                    Отмена
                    </button>
                </div>
                </>
            )}

            {/* ШАГ 2: ОФОРМЛЕНИЕ */}
            {step === "form" && (
                <>
                <h2>Оформление заказа</h2>

                <input
                    type="text"
                    placeholder="ФИО"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    type="tel"
                    placeholder="Номер телефона"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Электронная почта"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={!isEmailValid && email ? "input-error" : ""}
                />

                <div className="delivery-options">
                    <label>
                    <input
                        type="radio"
                        value="pickup"
                        checked={deliveryType === "pickup"}
                        onChange={() => setDeliveryType("pickup")}
                    />
                    Самовывоз
                    </label>

                    <label>
                    <input
                        type="radio"
                        value="courier"
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
                            <b>{totalSum >= 10000 ? "Бесплатно" : "300 ₽"}</b>
                        </p>

                        {totalSum < 10000 && (
                            <p className="free-delivery-hint">
                            Добавьте ещё{" "}
                            <b>{(10000 - totalSum).toFixed(0)} ₽</b>{" "}
                            до бесплатной доставки
                            </p>
                        )}
                        </>
                    )}

                    <p className="final-sum">
                        Итоговая сумма: <b>{finalSum.toFixed(2)} ₽</b>
                    </p>

                    <div className="delivery-info">
                        <b>{formattedDate}</b>
                        <span>{deliveryText}</span>
                    </div>
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
                    onClick={() => setStep("card")}
                    >
                    Назад
                    </button>
                </div>
                </>
            )}

            </div>
        </div>
        )}

        {orderDone && (
        <div className="order-success">
            <h2>Заказ оформлен 🌸</h2>
            <p>Наш менеджер свяжется с вами в ближайшее время</p>
        </div>
        )}
    </main>
);
};

export default CartPage;
