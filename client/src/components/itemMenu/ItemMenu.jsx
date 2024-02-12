import React, { useState, useEffect } from 'react'
import './ItemMenu.css'
import ButtonItem from '../buttonItem/ButtonItem'
import ButtonCounter from '../buttonCounter/ButtonCounter'

const ItemMenu = ({ img, name, price, id, cartItems, setCartItems, initialPrice }) => {

    const [count, setCount] = useState(0);
    const [isAddButtonVisible, setIsAddButtonVisible] = useState(true);

    const handleAddButtonClick = () => {
        setCount(1);
        setIsAddButtonVisible(false);
    };

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        const itemIndex = cartItems.findIndex(item => item.id === id);
        if (itemIndex === -1) {
            setCartItems([...cartItems, { id, count: newCount, price: initialPrice }]);
        } else {
            const newCartItems = [...cartItems];
            newCartItems[itemIndex].count = newCount;
            setCartItems(newCartItems);
        }
    };
    
    const handleDecrement = () => {
        const newCount = count - 1;
        setCount(newCount);
        if (newCount === 0) {
            setCartItems(cartItems.filter(item => item.id !== id));
        } else {
            const itemIndex = cartItems.findIndex(item => item.id === id);
            const newCartItems = [...cartItems];
            newCartItems[itemIndex].count = newCount;
            setCartItems(newCartItems);
        }
    };

    useEffect(() => {
        if (count === 0) {
            setIsAddButtonVisible(true);
        }
    }, [count]);

    return (
        <div className='item-menu-container'>
            <div className='item-menu-img'>
                <img src={img} alt="not found img"/>
                <div className={`circle-overlay ${count > 0 ? 'visible' : ''}`}>
                    {count}
                </div>
            </div>
            <div className='item-menu-name-and-price'>
                <div className='item-menu-name'>
                    · {name} ·
                </div>
                <div className='item-menu-price'>
                    ₽ {price}
                </div>
            </div>
            <div className='item-menu-button'>
                {isAddButtonVisible && (
                    <ButtonItem
                        name="Добавить"
                        onClick={handleAddButtonClick}
                    />
                )}
                {count > 0 && 
                <ButtonCounter 
                    onClickPlus={handleIncrement}
                    onClickMinus={handleDecrement}
                />
                }
            </div>
        </div>
    )
}

export default ItemMenu;
