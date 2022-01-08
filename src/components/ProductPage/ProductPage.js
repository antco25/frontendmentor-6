import React, { useState } from "react";
import "./ProductPage.scss";
import ProductGallery from '../ProductGallery/ProductGallery';
import QuantitySelect from "../QuantitySelect/QuantitySelect";
import AppButton from "../AppButton/AppButton";
import iconCart from "./icon-cart.svg";

function ProductPage(props) {

    const [quantity, setQuantity] = useState(0);

    const addToCart = () => {
        const product = {
            "id": props.product.id,
            "name": props.product.name,
            "price": (props.product.price * props.product.discount),
            "thumbnail": props.product.images[0].thumbnail,
            "quantity": quantity,
        }
        props.addToCart(product)
    }

    const p = props.product;
    return (
        <div className="product-page">
            <ProductGallery images={p.images} />
            <div className="product-detail">
                <div className="product-company">{p.company}</div>
                <h1 className="product-name">{p.name}</h1>
                <p className="product-desc">{p.desc}</p>
                <div className="product-price">
                    <div className="price-current">
                        <span className="price-value">${(p.price * p.discount).toFixed(2)}</span>
                        <span className="price-discount">{p.discount * 100}%</span>
                    </div>
                    <div className="price-standard">${p.price.toFixed(2)}</div>
                </div>
                <div className="product-quantity">
                    <QuantitySelect onChange={(q) => setQuantity(q)} />
                    <AppButton icon={iconCart} text="Add to cart" onClick={addToCart} />
                </div>
            </div>
        </div>
    );
}

export default ProductPage;