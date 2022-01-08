import React, { useState } from "react";
import "./QuantitySelect.scss";
import iconMinus from './icon-minus.svg';
import iconPlus from './icon-plus.svg';

function QuantitySelect(props) {

    const [quantity, setQuantity] = useState(0);

    const onMinus = () => {
        if (quantity > 0) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            props.onChange(newQuantity);
        };
    }
    const onPlus = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        props.onChange(newQuantity);
    }

    return (
        <div className="quantity-select">
            <button className="quantity-button quantity-minus" onClick={onMinus}>
                <img className="icon-minus" src={iconMinus} />
            </button>
            <div className="quantity-value">{quantity}</div>
            <button className="quantity-button quantity-plus" onClick={onPlus}>
                <img className="icon-plus" src={iconPlus} />
            </button>
        </div>
    );
}

export default QuantitySelect;