import React from "react";
import { FaTrash } from "react-icons/fa";

export default function Order({ item, onDelete }) {
  return (
    <div className="item">
      <div className="item-left-side">
        <img src={"./img/" + item.img} alt="" />
        <div className="item-text">
          <h2>{item.title}</h2>
          <p>{item.price}₽</p>
        </div>
      </div>
      <FaTrash className="delete-icon" onClick={() => onDelete(item.id)} />
    </div>
  );
}
