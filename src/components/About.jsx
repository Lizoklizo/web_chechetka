import React from "react";

export default function About() {
    return (
        <main className="about-page">
        <h1>О нас</h1>

        <p className="about-text">
            Мы работаем с 2023 года и создаём не просто букеты, а настроение,
            эмоции и счастливые моменты. Каждый цветок проходит тщательный
            отбор, а каждая композиция собирается с любовью и вниманием к деталям.
        </p>

        <p className="about-text">
            Наша команда — это флористы с отличным вкусом, современным взглядом
            и искренней любовью к своему делу. Мы следим за трендами, но всегда
            сохраняем индивидуальный стиль.
        </p>

        <div className="about-images">
            <img src="/img/studio1.jpg" alt="Наша студия" />
            <img src="/img/studio2.jpg" alt="Рабочий процесс" />
        </div>
        </main>
    );
}
