import React, { useState } from "react";

import { flowers } from "../data/flowers";
import { greenery } from "../data/greenery";
import { paper } from "../data/paper";
import { ribbons } from "../data/ribbon";



const BouquetConstructor = ({ onAddToCart }) => {

  /* dropdown */
  const [flowersOpen, setFlowersOpen] = useState(true);
  const [greeneryOpen, setGreeneryOpen] = useState(false);
  const [paperOpen, setPaperOpen] = useState(false);
  const [ribbonOpen, setRibbonOpen] = useState(false);

  /* selections */
  const [selectedFlowers, setSelectedFlowers] = useState({});
  const [selectedGreenery, setSelectedGreenery] = useState({});
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedRibbon, setSelectedRibbon] = useState(null);

  const [pulse, setPulse] = useState(false);


  /* helpers */
  const addItem = (item, setter) => {
  setter((prev) => ({
    ...prev,
    [item.id]: {
      ...item,
      quantity: (prev[item.id]?.quantity || 0) + 1,
    },
  }));

  setPulse(true);
  setTimeout(() => setPulse(false), 300);

  // UX: если это первый цветок
  if (!Object.keys(selectedFlowers).length) {
    setGreeneryOpen(true);
  }
};

  const removeItem = (item, setter) => {
    setter((prev) => {
      const qty = prev[item.id]?.quantity || 0;
      if (qty <= 1) {
        const copy = { ...prev };
        delete copy[item.id];
        return copy;
      }
      return {
        ...prev,
        [item.id]: {
          ...item,
          quantity: qty - 1,
        },
      };
    });
  };

  const renderMultiGrid = (items, selected, add, remove) => (
    <div className="flower-grid">
      {items.map((item) => (
        <div key={item.id} className="flower-card">
          <img src={item.img} alt={item.name} />

          <div className="flower-info">
            <span>{item.name}</span>
            <small>{item.price} ₽</small>
          </div>

          <div className="flower-controls">
            <button
              onClick={() => remove(item)}
              disabled={!selected[item.id]}
            >
              −
          </button>
            <span>{selected[item.id]?.quantity || 0}</span>
            <button onClick={() => add(item)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );

const renderSingleGrid = (items, selected, setSelected) => (
  <div className="flower-grid">
    {items.map((item) => {
      const isActive = selected?.id === item.id;

      return (
        <div
          key={item.id}
          className={`flower-card ${isActive ? "active" : ""}`}
          onClick={() =>
            setSelected(isActive ? null : item)
          }
        >
          <img src={item.img} alt={item.name} />

          <div className="flower-info">
            <span>{item.name}</span>
            <small>{item.price} ₽</small>
          </div>
        </div>
      );
    })}
  </div>
);


  const calcMultiSum = (items) =>
  Object.values(items).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalPrice =
    calcMultiSum(selectedFlowers) +
    calcMultiSum(selectedGreenery) +
    (selectedPaper?.price || 0) +
    (selectedRibbon?.price || 0);

  const MIN_PRICE = 2000;
  const isMinReached = totalPrice >= MIN_PRICE;
  const remaining = Math.max(0, MIN_PRICE - totalPrice);

  const buildBouquetItem = () => {
    const items = [];

    Object.values(selectedFlowers).forEach((f) => {
      items.push(`${f.name} × ${f.quantity}`);
    });

    Object.values(selectedGreenery).forEach((g) => {
      items.push(`${g.name} × ${g.quantity}`);
    });

    if (selectedPaper) items.push(`Упаковка: ${selectedPaper.name}`);
    if (selectedRibbon) items.push(`Лента: ${selectedRibbon.name}`);

    return {
      id: Date.now(), // уникальный id
      title: "Букет на заказ",
      desc: items.join(", "),
      price: totalPrice,
      img: "zakaz.jpg",
      category: "constructor",
    };
  };


  return (
    <div className="constructor-page">
      <h1 className="constructor-title">Соберите букет</h1>

      <p className="constructor-subtitle">
        Здесь вы можете самостоятельно собрать идеальный букет, 
        выбрав цветы, зелень и оформление. 
        Наш конфигуратор поможет вам создать гармоничную композицию 
        под любой повод.
      </p>

      {/* ЦВЕТЫ */}
      <div className="dropdown-block">
        <button
          className="dropdown-header"
          onClick={() => setFlowersOpen(!flowersOpen)}
        >
          🌸 Цветы
          <span className={flowersOpen ? "arrow open" : "arrow"}>▾</span>
        </button>

        {flowersOpen && (
          <div className="dropdown-content">
            {flowers.map((group) => (
              <div key={group.type} className="flower-group">
                <h3>{group.type}</h3>
                {renderMultiGrid(
                  group.variants,
                  selectedFlowers,
                  (item) => addItem(item, setSelectedFlowers),
                  (item) => removeItem(item, setSelectedFlowers)
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ЗЕЛЕНЬ */}
      <div className="dropdown-block">
        <button
          className="dropdown-header"
          onClick={() => setGreeneryOpen(!greeneryOpen)}
        >
          🌿 Зелень
          <span className={greeneryOpen ? "arrow open" : "arrow"}>▾</span>
        </button>

        {greeneryOpen && (
          <div className="dropdown-content">
            {renderMultiGrid(
              greenery,
              selectedGreenery,
              (item) => addItem(item, setSelectedGreenery),
              (item) => removeItem(item, setSelectedGreenery)
            )}
          </div>
        )}
      </div>

      {/* УПАКОВКА */}
      <div className="dropdown-block">
        <button
          className="dropdown-header"
          onClick={() => setPaperOpen(!paperOpen)}
        >
          💐 Упаковка
          <span className={paperOpen ? "arrow open" : "arrow"}>▾</span>
        </button>

        {paperOpen && (
          <div className="dropdown-content">
            {renderSingleGrid(paper, selectedPaper, setSelectedPaper)}
          </div>
        )}
      </div>

      {/* ЛЕНТА */}
      <div className="dropdown-block">
        <button
          className="dropdown-header"
          onClick={() => setRibbonOpen(!ribbonOpen)}
        >
          🎀 Лента
          <span className={ribbonOpen ? "arrow open" : "arrow"}>▾</span>
        </button>

        {ribbonOpen && (
          <div className="dropdown-content">
            {renderSingleGrid(ribbons, selectedRibbon, setSelectedRibbon)}
          </div>
        )}
      </div>

      <div className="constructor-summary">
      <div className={`summary-price ${pulse ? "pulse" : ""}`}>
        <span>Итого:</span>
        <b>{totalPrice} ₽</b>
      </div>

      {!isMinReached && (
        <p className="summary-hint">
          Минимальная стоимость букета — {MIN_PRICE} ₽.  
          Добавьте ещё на {remaining} ₽
        </p>
      )}

      <div className="summary-items">

        {Object.values(selectedFlowers).length > 0 && (
          <div className="summary-group">
            <b>Цветы:</b>
            <ul>
              {Object.values(selectedFlowers).map((item) => (
                <li key={item.id}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}

        {Object.values(selectedGreenery).length > 0 && (
          <div className="summary-group">
            <b>Зелень:</b>
            <ul>
              {Object.values(selectedGreenery).map((item) => (
                <li key={item.id}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedPaper && (
          <div className="summary-group">
            <b>Упаковка:</b> {selectedPaper.name}
          </div>
        )}

        {selectedRibbon && (
          <div className="summary-group">
            <b>Лента:</b> {selectedRibbon.name}
          </div>
        )}

      </div>


    <button
      className="summary-button"
      disabled={!isMinReached}
      onClick={() => onAddToCart(buildBouquetItem())}
    >
      Добавить букет в корзину
    </button>

    </div>

    </div>
  );
};

export default BouquetConstructor;
