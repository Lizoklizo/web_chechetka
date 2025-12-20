import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Orders load error:", err));
  }, []);

  return (
    <main className="admin-page">
      <h1>Заказы (Admin)</h1>

      {orders.length === 0 ? (
        <p>Заказов пока нет</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Клиент</th>
              <th>Телефон</th>
              <th>Доставка</th>
              <th>Сумма</th>
              <th>Готовность</th>
              <th>Статус</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer.name}</td>
                <td>{order.customer.phone}</td>
                <td>{order.customer.deliveryType}</td>
                <td>{order.total} ₽</td>
                <td>
                  {order.readyDate}
                  <br />
                  <small>{order.readyText}</small>
                </td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default AdminOrders;
