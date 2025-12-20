require("dotenv").config();
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// временные данные (в памяти)
let items = [];
let idCounter = 1;
let orders = [];

const ordersFile = path.join(__dirname, "orders.json");

// загрузка заказов
if (fs.existsSync(ordersFile)) {
    orders = JSON.parse(fs.readFileSync(ordersFile, "utf-8"));
} 
/* POST - создать */
app.post("/api/items", (req, res) => {
    const item = {
        id: idCounter++,
        title: req.body.title,
        price: req.body.price
};
    items.push(item);
    res.status(201).json(item);
});

/* GET — получить все */
app.get("/api/items", (req, res) => {
    res.json(items); 
});

/* PUT - изменить  */
app.put("/api/items/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = items.find(i => i.id === id);

    if (!item) {
        return res.status(404).json({ message: "Not found" });
    }

    item.title = req.body.title ?? item.title;
    item.price = req.body.price ?? item.price;

    res.json(item);
});

/* DELETE - удалить */
app.delete("/api/items/:id", (req, res) => {
    const id = Number(req.params.id);
    items = items.filter(i => i.id !== id);
    res.status(204).end();
});


/* POST - СОЗДАТЬ ЗАКАЗ */
app.post("/api/orders", (req, res) => {
    const order = {
        id: Date.now(),
        status: "new",
        customer: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        deliveryType: req.body.deliveryType
        },
        items: req.body.items,
        total: req.body.total,
        readyDate: req.body.readyDate,
        readyText: req.body.readyText,
        createdAt: new Date()
};

orders.push(order);

// Сохраняем в файл каждый раз
fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

res.status(201).json(order);
});

// заказы переживают перезапуск сервера
// fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));

/* GET - ПОЛУЧИТЬ ВСЕ ЗАКАЗЫ */
app.get("/api/orders", (req, res) => {
    const formattedOrders = orders.map(order => ({
        id: order.id,
        status: order.status,
        customer: order.customer,
        items: order.items,
        total: order.total,
        readyDate: order.readyDate,
        readyText: order.readyText,
        createdAt: new Date(order.createdAt).toLocaleString("ru-RU")
    }));
    res.json(formattedOrders);
});


/* SERVER */
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Backend is running ");
});


app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});

