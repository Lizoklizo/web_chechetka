import React from "react";
import vk from "./../img/vk.svg";
import tg from "./../img/telegram.svg";
import ig from "./../img/instagram.svg";

export default function Footer() {
  return (
    <footer>
      {/* КОНТАКТЫ */}
      <div id="footer-contacts">
        <ul>
          <li>
            <a href="https://vk.com/chechetkaa" target="_blank" rel="noreferrer">
              <img src={vk} alt="vk" />
            </a>
          </li>
          <li>
            <a href="https://t.me/elchechetka" target="_blank" rel="noreferrer">
              <img src={tg} alt="tg" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/_chechetka_?igsh=b3JrOXVicmdkYTdo"
              target="_blank"
              rel="noreferrer"
            >
              <img src={ig} alt="ig" />
            </a>
          </li>
        </ul>
      </div>

      {/* АДРЕС + ЯНДЕКС КАРТА */}
      <div
        id="footer-address"
        style={{ marginTop: "50px", textAlign: "center" }}
      >
        <h3>Наш адрес</h3>
        <p>г. Саратов, ул. Большая Казачья 23/27</p>

        <div style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>
          <iframe
            title="Yandex Map"
            src="https://yandex.ru/map-widget/v1/?ll=46.029039%2C51.533103&z=16&pt=46.029039,51.533103,pm2rdm"
            width="800"
            height="450"
            frameBorder="0"
            style={{ borderRadius: "16px", maxWidth: "100%" }}
            allowFullScreen
          />
        </div>
      </div>

      <p style={{ marginTop: "30px" }}>Чечетка Елизавета</p>
    </footer>
  );
}
