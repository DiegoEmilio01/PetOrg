import React, { useState, useEffect } from 'react';
import logo from '../../images/logo.png';
import { hot } from 'react-hot-loader';

function Products(props) {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (loading) {
            updateProducts();
            setLoading(false);
        } else {
            updateProducts();
        }
    }, [props.updateCart]);

    const productInCart = (products, product) => {
        let productIndex = false;
        products.forEach(prod => {
            if (prod.product.id === product.id) {
                productIndex = products.indexOf(prod);
            }
        });
        return productIndex;
    };

    const updateProducts = async () => {
        const currentProducts = await getProducts();
        const updatedProducts = [];
        currentProducts.products.forEach(product => {
            const productIndex = productInCart(props.updateCart, product);
            if (productIndex !== false) {
                product.stock -= props.updateCart[productIndex].quantity;
            }
            updatedProducts.push(product);
        });
        setProducts(updatedProducts);
    };

    const buildTokenRequest = () => {
        const url = `${window.location.origin}/auth`;

        const headers = {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        };
      
        const body = JSON.stringify({
            url: window.location.origin
        });
    
        const requestOptions = {
            method: 'POST',
            headers,
            body,
        };

        return { url, requestOptions };
    };

    const getPermissionToken = async () => {
        const { url, requestOptions } = buildTokenRequest(); 
        return await fetch(url, requestOptions)
        .then((res) => res.json());
    };

    const buildProductRequest = async () => {
        const url = `${window.location.origin}/api/products`;
        const token = await getPermissionToken();

        const headers = {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token.token}`
        };

        const requestOptions = {
            method: 'GET',
            headers,
        };
        return { url, requestOptions };
    }

    const getProducts = async () => {
        const { url, requestOptions } = await buildProductRequest();
        return await fetch(url, requestOptions)
        .then((res) => res.json());
    };

    const addToCart = (product) => {
        props.addToCart(product);
    }
    
    if (loading) return <h1>Cargando</h1>
       
    return (
    <div className="index_c" key={products}>
        <h1>Productos </h1>
        <div className="card_index">{products.map((product, i) => 
            <article key={i} className="card">
                <a className="link" href={`/products/${(product.id)}`}>
                    <img className="card_photo" src={logo} alt="Foto Product"/>
                </a>
                <a className="link" href={`/products/${(product.id)}`}><h3>{product.name}</h3></a>
                <div className="card_description">
                <p>Precio: {product.price}</p>
                <p>Stock: {product.stock}</p>
                <p>Uso: { product.used ? 'Usado':'Nuevo' }</p>
                </div>
                <div className="card_footer">
                <button>
                    <a className="link" href={`/products/${(product.id)}`}>Detalle</a>
                </button>
                <button onClick={() => addToCart(product)}>
                    Añadir al carro
                </button>
                </div>
            </article>
        )}</div>
    </div>
    );
}

export default hot(module)(Products);