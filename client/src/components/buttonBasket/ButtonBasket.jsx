import React from "react";
import './ButtonBasket.css'

const ButtonBasket = ({text, onClick}) => {
    return (
        <div className="basket-btn-container">
            <button className="basket-btn" onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export default ButtonBasket
