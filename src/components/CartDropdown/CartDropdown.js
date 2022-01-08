import React, { useEffect, useState } from "react";
import useOutsideClick from '../common/useOutsideClick'
import "./CartDropdown.scss";
import iconCart from "./icon-cart.svg";
import iconDelete from "./icon-delete.svg";
import AppButton from "../AppButton/AppButton";

function CartDropdown(props) {

    const [isDropdownOpen, setDropDownOpen] = useState(false);
    const { ref, setIsComponentActive } = useOutsideClick(isDropdownOpen, onOutsideClick);
    const [cartItems, setCartItems] = useState({ quantity: 0, items: [] });

    useEffect(() => {
        if (props.cartItems && props.cartItems.length > 0) {
            let quantity = 0;
            let items = [];

            props.cartItems.map((item, index) => {
                quantity += item.quantity;
                items.push(<CartItem item={item} key={index} deleteCartItem={props.deleteCartItem} />);
            })

            setCartItems({ quantity: quantity, items: items });
        } else {
            setCartItems({ quantity: 0, items: [] });
        }
    }, [props.cartItems])

    const onCartClick = () => {
        setDropDownOpen(!isDropdownOpen);
        setIsComponentActive(!isDropdownOpen);
    }

    function onOutsideClick() {
        setDropDownOpen(false);
        setIsComponentActive(false);
    }

    return (
        <div ref={ref} className={`cart cart-content ${props.className}`}>
            <div className="wrapper">
                <img src={iconCart} className="icon-cart" onClick={onCartClick} />
                {(cartItems.quantity > 0) ? <div className="cart-quantity" onClick={onCartClick}>{cartItems.quantity}</div> : null}
            </div>
            <div className={`cart-dropdown ${isDropdownOpen ? 'cart-dropdown-active' : null}`}>
                <h3>Cart</h3>
                {cartItems.quantity == 0 ? <div className="cart-empty">Your cart is empty</div> :
                    <div className="wrapper">
                        {cartItems.items.map((item) => {
                            return (item)
                        })}
                        <AppButton className="checkout-button" text="Checkout" onClick={() => props.deleteCartItem(0, true)} />
                    </div>
                }
            </div>
        </div>
    );
}

function CartItem(props) {

    let i = props.item;
    return (
        <div className="item">
            <img className="item-thumb" src={i.thumbnail} />
            <div className="item-desc">
                <span className="item-name">{i.name}</span>
                <span className="item-price">{`$${i.price.toFixed(2)} x ${i.quantity}`} <b>${(i.price * i.quantity).toFixed(2)}</b></span>
            </div>
            <img className="item-delete" src={iconDelete} onClick={() => { props.deleteCartItem(i.id) }} />
        </div>
    )
}

export default CartDropdown;