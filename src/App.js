import React, { useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import ProductPage from "./components/ProductPage/ProductPage";
import productSneakers from "./data/productSneakers";

function App() {

  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    const newCartItems = [...cartItems];
    let isProductInCart = false;

    //Search if product exists and update quantity
    for (let i = 0; i < newCartItems.length; i++) {
      if (newCartItems[i].id == product.id) {
        isProductInCart = true;

        if (product.quantity == 0) {
          newCartItems.splice(i, 1);
        } else {
          newCartItems[i].quantity = product.quantity;
        }

        break;
      }
    }

    if (!isProductInCart) {
      if (product.quantity != 0)
        newCartItems.push(product)
    }

    setCartItems(newCartItems);
  }

  const deleteCartItem = (id, deleteAll = false) => {
    if (deleteAll) {
      setCartItems([]);
      return;
    }

    const newCartItems = [];
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id !== id) {
        newCartItems.push(cartItems[i]);
      }
    }
    setCartItems(newCartItems);
  }

  return (
    <div className="App">
      <Header cartItems={cartItems} deleteCartItem={deleteCartItem} />
      <ProductPage product={productSneakers} addToCart={addToCart} />
    </div>
  );
}

export default App;