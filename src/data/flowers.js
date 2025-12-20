import roseRed from "../img/rose-red.jpg";
import roseWhite from "../img/rose-white.jpg";
import rosePink from "../img/rose-pink.jpg";

import chryWhite from "../img/chry-white.jpg";
import chryYellow from "../img/chry-yellow.jpg";
import chryPink from "../img/chry-pink.jpg";

import diaWhite from "../img/dia-white.jpg";
import diaPink from "../img/dia-pink.jpg";
import diaYellow from "../img/dia-yellow.jpg";
import diaBeige from "../img/dia-beige.jpg";


export const flowers = [
  {
    type: "Розы",
    variants: [
      { id: "rose-red", name: "Красные розы", price: 250, img: roseRed },
      { id: "rose-pink", name: "Розовые розы", price: 250, img: rosePink },
      { id: "rose-white", name: "Белые розы", price: 250, img: roseWhite },
    ]
  },
  {
    type: "Хризантемы",
    variants: [
      { id: "chry-white", name: "Белые хризантемы", price: 180, img: chryWhite },
      { id: "chry-yellow", name: "Жёлтые хризантемы", price: 180, img: chryYellow },
      { id: "chry-pink", name: "Розовые хризантемы", price: 180, img: chryPink },
    ]
  },
  {
    type: "Диантусы",
    variants: [
      { id: "dia-white", name: "Белые диантусы", price: 150, img: diaWhite },
      { id: "dia-pink", name: "Розовые диантусы", price: 150, img: diaPink },
      { id: "dia-yellow", name: "Жёлтые диантусы", price: 150, img: diaYellow },
      { id: "dia-beige", name: "Бежевые диантусы", price: 150, img: diaBeige },
    ]
  }
];
