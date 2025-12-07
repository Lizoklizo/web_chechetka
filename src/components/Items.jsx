import React from "react";
import Item from "./Item";
import { Pagination } from "@mui/material";

export default function Items({ items, onAdd, onShowItem, category }) {
  const [page, setPage] = React.useState(1);

  console.log(category);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <main>
      <div className="item-container">
        {items.map(
          (el) =>
            (category !== "all" || el.page === page) && ( // Modified condition
              <Item
                onShowItem={onShowItem}
                key={el.id}
                item={el}
                onAdd={onAdd}
              />
            )
        )}
      </div>
      <Pagination
        className="pagi"
        page={page}
        count={items.length < 6 ? 1 : Math.ceil(items.length / 6)} // Changed to Math.ceil
        variant="outlined"
        color="secondary"
        size="large"
        onChange={handleChangePage}
      />
    </main>
  );
}
