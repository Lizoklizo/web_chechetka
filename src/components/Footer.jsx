import React from "react";
import vk from "./../img/vk.svg";
import tg from "./../img/telegram.svg";
import ig from "./../img/instagram.svg";

export default function Footer() {
  return (
    <footer>
      <ul>
        <li>
          <a href="https://vk.com/chechetkaa">
            <img src={vk} alt="vk" />
          </a>
        </li>
        <li>
          <a href="https://t.me/elchechetka">
            <img src={tg} alt="tg" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/_chechetka_?igsh=b3JrOXVicmdkYTdo">
            <img src={ig} alt="ig" />
          </a>
        </li>
      </ul>
      <p>Чечетка Елизавета</p>
    </footer>
  );
}
