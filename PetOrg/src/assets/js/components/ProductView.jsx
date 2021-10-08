import React, { useState, useEffect } from 'react';
import Products from './Products';
import ProductCart from './ProductCart';
import { hot } from 'react-hot-loader';

function ProductView(props) {
    const [loading, setLoading] = useState(true);
    const [productCart, setProductCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
      const cartItems = JSON.parse(window.localStorage.getItem('cart'));
      if (cartItems) {
        const total = cartPrice(cartItems);
        setProductCart(cartItems);
        setLoading(false);
        setTotalPrice(total);
      }
    }, []);

    const cartPrice = (cart) => {
      const total = cart.map((product) => product.product.price * product.quantity).reduce((total, price) => total + price, 0);
      return total
    }

    const canBeAdded = (cart, product) => {
        const productIndex = cart.findIndex((prod) => prod.product.id === product.id);
        if (productIndex === -1 && product.stock >= 0) {
          if (product.stock === 0) return false;
          return true;
        } else if (product.stock > 0) {
          return true;
        } else {
          return false;
        }
      };
      
    const addItemToCart = (cart, product) => {
        const productIndex = cart.findIndex((prod) => prod.product.id === product.id);
        if (canBeAdded(cart, product)){
          if (productIndex === -1) {
            cart.push({ quantity: 1, product });
            window.localStorage.setItem('cart', JSON.stringify(cart));
            setTotalPrice(cartPrice(cart));
            setProductCart(cart);
            alert('Producto añadido al carro');
          } else {
            const quantity = cart[productIndex].quantity + 1;
            cart.splice(productIndex, 1);
            cart.push({ quantity, product });
            window.localStorage.setItem('cart', JSON.stringify(cart));
            setTotalPrice(cartPrice(cart));
            setProductCart(cart);
            alert('Producto añadido al carro');
          }
        } else {
          alert('No hay suficiente stock del producto');
        }
      };
    
    const addToCart = (product) => {
      let cart = JSON.parse(window.localStorage.getItem('cart'));
      if (cart != null) {
        addItemToCart(cart, product);
      } else {
        cart = [];
        addItemToCart(cart, product);
      }
    };

    const removeFromCart = (product) => {
      const productsArray = [...productCart];
      const productIndex = productsArray.indexOf(product);
      productsArray.splice(productIndex, 1);
      window.localStorage.setItem('cart', JSON.stringify(productsArray));
      setTotalPrice(cartPrice(productsArray));
      setProductCart(productsArray);
    };

    const getDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1 >= 10) ? today.getMonth() + 1 : '0' + (today.getMonth() + 1);
      const day = (today.getDate() >= 10) ? today.getDate() : '0' + today.getDate();
      return year + '-' + month + '-' + day;
    };

    const buildBuyRequest = (products) => {
      const date = getDate();
  
      const headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      };
  
      const body = JSON.stringify({
        products,
        date,
        total: totalPrice,
      });
  
      const requestOptions = {
        method: 'POST',
        headers,
        body,
      };
      return { requestOptions };
    };

    const buyCart = (products) => {
      const { requestOptions } = buildBuyRequest(products);
      fetch('/products/buy/cart', requestOptions)
      .then( (res) => res.json())
      .then( (res) => {
        if (res.message === "success") {
          window.localStorage.removeItem('cart');
          alert("Compra exitosa.");
          location.reload();
        } else {
          alert("Compra fallida por saldo insuficiente.");
        }
      });
    };

    return (
        <>
          <ProductCart cart={productCart} removeFromCart={removeFromCart} buyCart={buyCart} totalPrice={totalPrice}/>  
          <Products addToCart={addToCart} updateCart={productCart}/>
        </>
    );
}

export default hot(module)(ProductView);
