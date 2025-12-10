import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import CartPage from "./components/CartPage";
import About from "./components/About";

const AboutPage = () => (
  <main style={{ minHeight: "400px", padding: "60px 0", textAlign: "center" }}>
    <h1>О нас</h1>
  </main>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          title: "Белые розы",
          img: "roses1.jpg",
          desc: "Букет белых роз – символ чистоты, нежности и возвышенной красоты. Этот величественный аранжированный букет составлен из изысканных белоснежных роз, подчеркивая элегантность и изысканность.",
          category: "roses",
          price: "3999.99",
          page: 1,
        },
        {
          id: 2,
          title: "Красные розы",
          img: "roses2.webp",
          desc: "Букет красных роз – символ страсти, любви и силы эмоций. Этот впечатляющий аранжированный букет составлен из ярких красных роз, олицетворяя глубокие чувства и романтическую приверженность.",
          category: "roses",
          price: "4500.00",
          page: 1,
        },
        {
          id: 3,
          title: "Белые лилии",
          img: "lillies1.jpg",
          desc: "Элегантный букет белых лилий – символ чистоты, изысканности и возвышенной красоты.",
          category: "lilies",
          price: "2700.00",
          page: 1,
        },
        {
          id: 4,
          title: "Разноцветные тюльпаны",
          img: "tulips1.jpg",
          desc: "Букет разноцветных тюльпанов – искрящаяся радуга в мире цветов.",
          category: "tulips",
          price: "2500.00",
          page: 1,
        },
        {
          id: 5,
          title: "Розовые пионы",
          img: "peonies1.jpg",
          desc: "Нежный букет розовых пионов – воплощение элегантности и нежности.",
          category: "peonies",
          price: "5000.00",
          page: 1,
        },
        {
          id: 6,
          title: "Желтые розы",
          img: "roses3.jpg",
          desc: "Солнечный букет жёлтых роз — воплощение радости.",
          category: "roses",
          price: "3200.00",
          page: 1,
        },
        {
          id: 7,
          title: "Белые тюльпаны",
          img: "tulips2.jpg",
          desc: "Изящный букет белых тюльпанов — символ чистоты.",
          category: "tulips",
          price: "3200.00",
          page: 2,
        },
        {
          id: 8,
          title: "Желтые тюльпаны",
          img: "tulips3.webp",
          desc: "Солнечный букет жёлтых тюльпанов.",
          category: "tulips",
          price: "3200.00",
          page: 2,
        },
        {
          id: 9,
          title: "Розовые лилии",
          img: "lillies2.jpg",
          desc: "Нежный букет розовых лилий.",
          category: "lilies",
          price: "2800.00",
          page: 2,
        },
        {
          id: 10,
          title: "Желтые лилии",
          img: "lillies3.png",
          desc: "Букет жёлтых лилий — символ радости.",
          category: "lilies",
          price: "3000.00",
          page: 2,
        },
        {
          id: 11,
          title: "Белые пионы",
          img: "peonies2.webp",
          desc: "Изысканный букет белых пионов.",
          category: "peonies",
          price: "5300.00",
          page: 2,
        },
        {
          id: 12,
          title: "Разноцветные пионы",
          img: "peonies3.jpg",
          desc: "Карнавал красок и эмоций.",
          category: "peonies",
          price: "6100.00",
          page: 2,
        },
      ],
      orders: [],
      currentItems: [],
      showFullItem: false,
      fullItem: {},
      category: "all",
      pageView: "catalog", 
      cartOpen: false,
    };
    this.state.currentItems = this.state.items;

    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.clearOrders = this.clearOrders.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
    this.goToCart = this.goToCart.bind(this);
    this.goToCatalog = this.goToCatalog.bind(this);
    this.goToAbout = this.goToAbout.bind(this);
    this.closeCart = this.closeCart.bind(this);
  }

  render() {
    return (
      <div className="wrapper">
        <Header
          orders={this.state.orders}
          onDelete={this.deleteOrder}
          goToCart={this.goToCart}
          goToCatalog={this.goToCatalog}
          goToAbout={this.goToAbout}     
          cartOpen={this.state.cartOpen}
          closeCart={this.closeCart}
          pageView={this.state.pageView} 
        />

        {this.state.pageView === "catalog" && (
          <>
            <Categories chooseCategory={this.chooseCategory} />
            <Items
              category={this.state.category}
              onShowItem={this.onShowItem}
              items={this.state.currentItems}
              onAdd={this.addToOrder}
            />
          </>
        )}

        {this.state.pageView === "cart" && (
          <CartPage
            orders={this.state.orders}
            onDelete={this.deleteOrder}
            goBack={this.goToCatalog}
            clearOrders={this.clearOrders}
          />
        )}

        {this.state.pageView === "about" && <About />}

        {this.state.showFullItem && (
          <ShowFullItem
            onShowItem={this.onShowItem}
            onAdd={this.addToOrder}
            item={this.state.fullItem}
          />
        )}

        <Footer />
      </div>
    );
  }

  addToOrder(item) {
    this.setState({
      orders: [...this.state.orders, item],
      cartOpen: true,
    });

  // отправляем товар в backend
  fetch("http://localhost:5000/api/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: item.title,
      price: item.price,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Sent to backend:", data);
    })
    .catch((err) => {
      console.error("Backend error:", err);
    });
  }

  deleteOrder(id) {
    const orders = [...this.state.orders];
    const index = orders.findIndex((el) => el.id === id);

    if (index !== -1) {
      orders.splice(index, 1);
      this.setState({ orders });
    }
  }

  clearOrders() {
    this.setState({ orders: [] });
  }

  closeCart() {
    this.setState({ cartOpen: false });
  }

  goToCart() {
    this.setState({ pageView: "cart", cartOpen: false });
  }

  goToCatalog() {
    this.setState({ pageView: "catalog" });
  }

  goToAbout() {
    this.setState({ pageView: "about" });
  }

  onShowItem(item) {
    this.setState({
      fullItem: item,
      showFullItem: !this.state.showFullItem,
    });
  }

  chooseCategory(category) {
    if (category === "all") {
      this.setState({
        currentItems: this.state.items,
        category: category,
      });
      return;
    }

    this.setState({
      currentItems: this.state.items.filter(
        (el) => el.category === category
      ),
      category: category,
    });
  }
}

export default App;