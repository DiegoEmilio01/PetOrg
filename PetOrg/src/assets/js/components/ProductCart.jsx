import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import { hot } from 'react-hot-loader';

function ProductCart(props) {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(props.cart);
        setLoading(false);
    }, [props.cart]);

    const removeFromCart = (product) => {
        props.removeFromCart(product);
    };

    const buyCart = () => {
        props.buyCart(products);
    }

    if (loading) return <h1>Cargando</h1>

    if (products.length > 0) {
        return (
        <div className="index_c" key={props.cart}>
            <h1>En el carro </h1>
            <div className="card_index">{products.map((product, i) => 
                <article key={i} className="card">
                <a className="link" href={`/products/${(product.product.id)}`}>
                    <img className="card_photo" src={logo} alt="Foto Product"/>
                </a>
                <a className="link" href={`/products/${(product.product.id)}`}><h3>{product.product.name}</h3></a>
                <div className="card_description">
                <p>Precio: {product.product.price}</p>
                <p>Cantidad: {product.quantity}</p>
                <p>Uso: { product.product.used ? 'Usado':'Nuevo' }</p>
                </div>
                <div className="card_footer">
                <button>
                    <a className="link" href={`/products/${(product.product.id)}`}>Detalle</a>
                </button>
                <button onClick={() => removeFromCart(product)}>
                    Remover
                </button>
                </div>
            </article>
            )}</div>
            <h4>Total: {props.totalPrice}</h4>
            <button onClick={buyCart}> Comprar productos</button>
        </div>
        );
    } else {
        return <></>
    }
}

export default hot(module)(ProductCart);
