import React, { useState, useEffect } from "react";
import { useTelegram } from '../../hooks/useTelegram';
import CustomDropdown from "../customDropdown/CustomDropdown";
import './ListMenu.css'
import ItemMenu from "../itemMenu/ItemMenu";
//import imgPath from './photo_2023-08-31_00-30-34.jpg';

const ListMenu = () => {
    const { tg } = useTelegram();

    const [selectType, setSelectType] = useState("")
    const [selectView, setSelectView] = useState("")

    const [cartItems, setCartItems] = useState([]);
    const [listProduct, setListProduct] = useState([]);

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.count * item.price;
        });
        return totalPrice;
    }

    useEffect(() => {
        tg.MainButton.setParams({
            text: `Добавить в корзину ${calculateTotalPrice()} ₽`,
            color: '#24cc12'
        })

        if (cartItems.length > 0) {
            tg.MainButton.show()
        } else {
            tg.MainButton.hide()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems])

    const handleSelectType= (value) => {
        setSelectType(value)
        console.log(selectType)
    };

    const handleSelectView= (value) => {
        setSelectView(value)
        console.log(selectView)
    };

    const listType = [
        {id: 1, name: 'Все'},
        {id: 2, name: 'Напитки'},
        {id: 3, name: 'Десерты'},
    ]

    const listView = [
        {id: 1, name: 'Все'},
        {id: 2, name: 'Торт'},
        {id: 3, name: 'Пирожное'},
        {id: 4, name: 'Батончик'},
    ]

    /*
    const listProduct = [
        {id: 1, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 2, name: 'Капучино', price: 200, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 3, name: 'Капучино', price: 130, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 4, name: 'Капучино', price: 80, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 5, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 6, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 7, name: 'Капучино', price: 10, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 8, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 9, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 10, name: 'Капучино', price: 40, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 11, name: 'Капучино', price: 1100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 12, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 13, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 14, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 15, name: 'Капучино', price: 40, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 16, name: 'Капучино', price: 1100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 17, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 18, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 19, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 20, name: 'Капучино', price: 40, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 21, name: 'Капучино', price: 1100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 22, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 23, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 24, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 25, name: 'Капучино', price: 40, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 26, name: 'Капучино', price: 1100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 27, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 28, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 29, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 30, name: 'Капучино', price: 40, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 31, name: 'Капучино', price: 1100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 32, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
        {id: 33, name: 'Капучино', price: 100, img: imgPath, block: false, type: 'Напитки', view: 'Кофе' },
    ]
    */

    useEffect(() => {
        // Выполняем запрос к вашему локальному серверу при монтировании компонента
        fetch('http://192.168.56.1:5000/api/product/getAllProducts')
            .then(response => response.json())
            .then(data => {
                setListProduct(data.products);
            })
            .catch(error => {
                console.error('Ошибка при загрузке продуктов:', error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="menu-container">
            <div className="menu-panel-button">
                <div className="menu-panel-button-type">
                    <CustomDropdown
                        options={listType}
                        onSelect={handleSelectType}
                        text="Тип..."
                        containerStyle={{ width: '155px' }}
                    />
                </div>
                <div className="menu-panel-button-view">
                    <CustomDropdown
                        options={listView}
                        onSelect={handleSelectView}
                        text="Вид..."
                        containerStyle={{ width: '155px' }}
                    />
                </div>
            </div>
            <div className="menu-list-product">
                {listProduct
                    .filter(item => !item.block)
                    .map((item, index) => (
                        <ItemMenu
                            key={index}
                            img={item.img}
                            name={item.name}
                            price={item.price}
                            id={item.id}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                            initialPrice={item.price}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default ListMenu
