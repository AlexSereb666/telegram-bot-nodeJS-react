import React, { useState, useEffect } from 'react';
import './ItemMenu.css';
import ButtonItem from '../buttonItem/ButtonItem';
import ButtonCounter from '../buttonCounter/ButtonCounter';
import { useNavigate } from 'react-router-dom'

const ItemMenu = ({ img, name, price, id, cartItems, setCartItems, initialPrice, userId }) => {

    const [count, setCount] = useState(0);

    const navigate = useNavigate()

    // Проверка наличия компонента в корзине
    const isInCart = cartItems.some(item => item.id === id);

    const handleAddButtonClick = () => {
        handleIncrement();
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
        const itemIndex = cartItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            setCount(cartItems[itemIndex].count);
        }
    }, [cartItems, id]);

    const selectedProduct = (productId) => {
        navigate(`/cardProduct/${userId}/${productId}`)
    }

    return (
        <div className='item-menu-container'>
            <div className='item-menu-img'>
                <img src={process.env.REACT_APP_API_URL + img} alt="not found img" onClick={() => selectedProduct(id)} />
                {isInCart && (
                    <div className={`circle-overlay ${count > 0 ? 'visible' : ''}`}>
                        {count}
                    </div>
                )}
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
                {isInCart ? (
                    <ButtonCounter 
                        onClickPlus={handleIncrement}
                        onClickMinus={handleDecrement}
                    />
                ) : (
                    <ButtonItem
                        name="Добавить"
                        onClick={handleAddButtonClick}
                    />
                )}
            </div>
        </div>
    );
}

export default ItemMenu;
