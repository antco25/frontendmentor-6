import React from "react";
import "./AppButton.scss";

function AppButton(props) {
    return (
        <button className={`app-button ${props.className}`} onClick={props.onClick}>
            {props.icon ? <img src={props.icon} /> : null}
            <span className="app-button-text">{props.text}</span>
        </button>
    );
}

export default AppButton;