import React from "react";
import { useState } from "react";

export default function Categories({ chooseCategory }) {
  const [categories, setCategories] = useState([
    { key: "all", name: "Всё" },
    { key: "peonies", name: "Пионы" },
    { key: "roses", name: "Розы" },
    { key: "lilies", name: "Лилии" },
    { key: "tulips", name: "Тюльпаны" },
  ]);
  return (
    <div className="categories">
      {categories.map((el) => (
        <div key={el.key} onClick={() => chooseCategory(el.key)}>
          {el.name}
        </div>
      ))}
    </div>
  );
}
