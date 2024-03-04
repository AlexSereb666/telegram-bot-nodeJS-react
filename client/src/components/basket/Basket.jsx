import React, { useState, useEffect, useMemo, useCallback } from "react";
import './Basket.css'
import { getAllProductsInBasket, removeFromBasket } from '../../http/basketAPI'
import { getUserById, updateUserAddress } from '../../http/userAPI'
import ButtonBasket from "../buttonBasket/ButtonBasket";
import CustomCheckbox from '../customCheckbox/CustomCheckbox'
import StarImg from '../../assets/img/star.png'
import MessageBox from "../messageBox/MessageBox";
import deleteImg from '../../assets/img/delete.png'
import imgCat from '../../assets/img/cat.png'
import { useNavigate } from 'react-router-dom'
import { useTelegram } from '../../hooks/useTelegram';

const Basket = () => {
    const { tg } = useTelegram()

    const [listProducts, setListProducts] = useState([])
    const [listPromoCode, setListPromoCode] = useState([])

    const [userId, setUserId] = useState(1)
    const [user, setUser] = useState(null)
    const [selectedProducts, setSelectedProducts] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [showModalAddress, setShowModalAddress] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)
    const [textModal, setTextModal] = useState("")

    const [flagDeleteProduct, setFlagDeleteProduct] = useState(true)
    const [address, setAddress] = useState(false)
    const [addressText, setAddressText] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProducts])

    useEffect(() => {
        tg.MainButton.setParams({
            text: `Оформить заказ ${calculateTotalPrice()} ₽`,
            color: '#24cc12'
        })

        if (selectedProducts.length > 0) {
            tg.MainButton.show()
        } else {
            tg.MainButton.hide()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProducts])

    const onSendData = useCallback(() => {
        localStorage.clear()
        const type = 'basketProducts'
        const data = { type, products: selectedProducts,  delivery: address}
        tg.sendData(JSON.stringify(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProducts])

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        selectedProducts.forEach(item => {
            totalPrice += item.price;
        });
        return totalPrice;
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const idUserParam = params.get('idUser');
        if (idUserParam) {
            const id = JSON.parse(decodeURIComponent(idUserParam));
            setUserId(id);
        }
    }, []);

    useEffect(() => {
        const storedPromoCodes = JSON.parse(localStorage.getItem('appliedPromoCodes'));
        if (storedPromoCodes) {
            setListPromoCode(storedPromoCodes);
        }
    }, [])

    useEffect(() => {
        try {
            getAllProductsInBasket(userId).then((items) => {
                const updatedItems = items.map((item, index) => ({
                    ...item,
                    selectedId: new Date().getTime() + index
                }));
                setListProducts(updatedItems);
    
                // Здесь обрабатываем промокоды, когда список продуктов доступен
                const uniquePromoCodes = Array.from(new Set(listPromoCode.map(promoCode => promoCode.productName)))
                    .map(productName => {
                        return listPromoCode.find(promoCode => promoCode.productName === productName);
                    });
    
                const updatedProducts = updatedItems.map(product => {
                    const matchingPromoCode = uniquePromoCodes.find(promoCode => promoCode.productName === product.name);
                    if (matchingPromoCode) {
                        const discountedPrice = product.price * (1 - (matchingPromoCode.discount / 100));
                        return {
                            ...product,
                            price: discountedPrice
                        };
                    }
                    return product;
                });
                setListProducts(updatedProducts);
            });
    
        } catch (e) {
            console.log(e);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listPromoCode]);

    useEffect(() => {
        getUserById(userId).then((item) => { 
            setUser(item.user)
            setAddressText(item.user.address === 'Не указан' ? '' : item.user.address) 
        })
    }, [])

    useEffect(() => {
        getUserById(userId).then((item) => { 
            setUser(item.user)
        })
    }, [addressText])

    useMemo(() => {
        setSelectedProducts([])
        listProducts.map((item) => setSelectedProducts((prevSelected) => [...prevSelected, item]))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listProducts])

    const isInSelectedList = (product) => {
        return selectedProducts.some(selectedProduct => selectedProduct.selectedId === product.selectedId);
    };

    const handleCheckboxChange = (productId, isChecked) => {
        if (isChecked) {
            setSelectedProducts((prevSelected) => [...prevSelected, productId]);
        } else {
            setSelectedProducts((prevSelected) => {
                const indexToRemove = prevSelected.indexOf(productId);
                if (indexToRemove !== -1) {
                    const newSelected = [...prevSelected];
                    newSelected.splice(indexToRemove, 1);
                    return newSelected;
                }
                return prevSelected;
            });
        }
    };

    const clearSelectedProduct = () => {
        setSelectedProducts([])
    }

    const addSelectedProduct = () => {
        setSelectedProducts(listProducts)
    }

    const deleteSelectedProducts = () => {
        setShowModal(false)
        try {
            listProducts.forEach(product => {
                const selectedProduct = selectedProducts.find(selected => selected.selectedId === product.selectedId);
                if (selectedProduct) {
                    removeFromBasket(userId, selectedProduct.id)
                }
            });

            // Обновляем состояние basketProducts после удаления продуктов
            setListProducts(prevProducts => prevProducts.filter(product => !selectedProducts.includes(product)));

            // Очищаем выбранные продукты
            setSelectedProducts([]);
        } catch (e) {
            console.log(e)
        }
    }

    const deleteSelectedProduct = () => {
        setShowModal(false)
        try {
            removeFromBasket(userId, productToDelete.id)
    
            // Обновляем состояние basketProducts после удаления продукта
            setListProducts(prevProducts => prevProducts.filter(product => product !== productToDelete));
    
            // Очищаем выбранный продукт
            setProductToDelete(null);
        } catch (e) {
            console.log(e)
        }
    }

    const handleDeleteConfirmation = () => {
        if (selectedProducts.length > 0) {
            setTextModal("Вы уверены, что хотите удалить выбранные продукты?")
            setFlagDeleteProduct(true)
            setShowModal(true);
        }
    };

    const handleDeleteProduct = (product) => {
        setTextModal("Вы уверены, что хотите удалить выбранный продукт?")
        setFlagDeleteProduct(false)
        setProductToDelete(product);
        setShowModal(true);
    };

    const editAddress = () => {
        if (addressText.trim() !== '' || addressText.trim() !== 'Не указан') {
            updateUserAddress(userId, addressText).then((res) => console.log(res.message))
        }

        setShowModalAddress(false)
    }

    const handleCheckboxCheckAddress = (isChecked) => {
        setAddress(isChecked)
        if (isChecked && user.address === 'Не указан') {
            setShowModalAddress(true)
        }
    };

    const closeModalAddress = () => {
        setShowModalAddress(false)

        // не работает //
        if (addressText === 'Не указан' || addressText.trim() === '') {
            setAddress(false)
        }
        // а че?? а ниче хз //
    }

    const selectedProduct = (productId) => {
        navigate(`/cardProduct/${userId}/${productId}`)
    }

    return (
        <div className="basket-container">
            {listProducts.length === 0 ? (
                <div className="basket-list-product-img-cat">
                    <img src={imgCat} alt="Тут должно быть изображение:("/>
                    <div className="basket-list-product-img-cat-name">Корзина пуста... Перейдите в меню, чтобы добавить продукты.</div>
                </div>
            ) : (
                <>
                    <div className="basket-container-menu">
                        <div className="basket-menu-button">
                            <ButtonBasket text="Удалить выбранные" onClick={handleDeleteConfirmation} />
                            <ButtonBasket text="Выделить все" onClick={addSelectedProduct} />
                            <ButtonBasket text="Снять выделение" onClick={clearSelectedProduct} />
                        </div>
                        <div className="basket-menu-button-selected-product">
                            Выбрано продуктов: {selectedProducts.length}
                            <button onClick={() => navigate(`/promocode/${userId}`)}>Промокоды</button>
                        </div>
                        <div className="basket-menu-button-delivery">
                            <CustomCheckbox
                                label={`с доставкой (${addressText})`}
                                onChangeSolo={handleCheckboxCheckAddress}
                                check={address}
                            />
                            <button onClick={() => setShowModalAddress(true)}>
                            Изменить
                            </button>
                        </div>
                    </div>
                    <div className="basket-list-product">
                        {listProducts.map((data, index) => (
                            <div key={index} className='basket-container-line' onClick={() => selectedProduct(data.id)}>
                                <div className='basket-container-line-img'>
                                    <img src={process.env.REACT_APP_API_URL + data.img} alt="Нет изображения"/>
                                </div>
                                <div className='basket-container-line-name'>
                                    {data.name}
                                </div>
                                <div className='basket-container-line-star'>
                                    <img src={StarImg} alt="Нет изображения"/>
                                    <div className='basket-container-line-rating'>
                                        {data.averageRating}
                                    </div>
                                </div>
                                <div className='basket-container-line-price'>
                                    {data.price}₽
                                </div>
                                <div className='basket-container-line-delete-one' onClick={(e) => e.stopPropagation()}>
                                    <img src={deleteImg} alt="Нет изображения" onClick={() => handleDeleteProduct(data)}/>
                                </div>
                                <div className='basket-container-line-checkbox' onClick={(e) => e.stopPropagation()}>
                                    <CustomCheckbox productId={data} onChange={handleCheckboxChange} 
                                    check={isInSelectedList(data)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {showModal && (
                <MessageBox
                    message={textModal}
                    check={true}
                    onYes={flagDeleteProduct ? deleteSelectedProducts : deleteSelectedProduct}
                    onNo={() => setShowModal(false)}
                    textNo={"Нет"}
                    textYes={"Да"}
                />
            )}
            {showModalAddress && (
                <MessageBox
                    check={false}
                    onYes={editAddress}
                    onNo={closeModalAddress}
                    textNo={"Закрыть"}
                    textYes={"Изменить"}
                    inputValue={addressText}
                    setInputValue={setAddressText}
                />
            )}
        </div>
    )
}

export default Basket
