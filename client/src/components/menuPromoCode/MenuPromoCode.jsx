import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './MenuPromoCode.css'
import btnBack from '../../assets/img/button-back.png'
import CustomInput from "../customInput/CustomInput";
import ButtonItem from '../buttonItem/ButtonItem'
import { Context } from '../../index';
import { getPromoCodeByCode } from '../../http/promoCodeAPI'
import MessageBox from "../messageBox/MessageBox";
import { getAllProductsInBasket } from '../../http/basketAPI'
import btnDelete from '../../assets/img/btn-delete-rect.png'
import { observer } from "mobx-react-lite";

const MenuPromoCode = observer(() => {
    const { promoCode } = useContext(Context)
    const { idUser } = useParams()
    const navigate = useNavigate()

    const [promoCodeText, setPromoCodeText] = useState("")
    const [textModal, setTextModal] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showModalDel, setShowModalDel] = useState(false)
    const [listProducts, setListProducts] = useState([])
    const [appliedPromoCodes, setAppliedPromoCodes] = useState([])
    const [codeToDelete, setCodeToDelete] = useState("")

    useEffect(() => {
        // При загрузке компонента, извлекаем список промокодов из localStorage (если есть)
        const storedPromoCodes = JSON.parse(localStorage.getItem('appliedPromoCodes'));
        if (storedPromoCodes) {
            setAppliedPromoCodes(storedPromoCodes);
        }

        try {
            getAllProductsInBasket(idUser).then((item) => {
                setListProducts(item);
            });

        } catch (e) {
            console.log(e);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addCodeToList = () => {
        if (promoCodeText.trim() !== '') {
            // Проверяем, был ли уже применен данный промокод
            if (appliedPromoCodes.some(appliedCode => appliedCode.code === promoCodeText)) {
                setTextModal("Данный промокод уже был применен");
                setShowModal(true);
                setPromoCodeText("");
                return;
            }
    
            getPromoCodeByCode(promoCodeText)
                .then((item) => {
                    const promoProducts = item.promoCode.products;
                    // Поиск продуктов, которые есть и в promoProducts, и в listProducts
                    const applicableProducts = listProducts.filter(product =>
                        promoProducts.some(promoProduct => promoProduct.id === product.id)
                    );
    
                    if (applicableProducts.length > 0) {
                        promoCode.addItem(item.promoCode);
    
                        // Добавление информации о примененном промокоде в appliedPromoCodes
                        const applicablePromoCodes = [];
                        applicableProducts.forEach(product => {
                            const promoProduct = promoProducts.find(promoProduct => promoProduct.id === product.id);
                            if (promoProduct) {
                                applicablePromoCodes.push({
                                    code: item.promoCode.code,
                                    discount: item.promoCode.discount,
                                    productName: promoProduct.name
                                });
                            }
                        });

                        if (applicablePromoCodes.length > 0) {
                            promoCode.addItem(item.promoCode);
                            
                            // Добавляем информацию о примененных промокодах к списку промокодов
                            setAppliedPromoCodes(prevCodes => [...prevCodes, ...applicablePromoCodes]);
                            // Сохраняем обновленный список промокодов в localStorage
                            localStorage.setItem('appliedPromoCodes', JSON.stringify([...appliedPromoCodes, ...applicablePromoCodes]));
                        }
    
                        setTextModal("Промокод успешно применен");
                    } else {
                        setTextModal("Нет продуктов на которые действует данный промокод");
                    }
                    setShowModal(true);
                })
                .catch((error) => {
                    console.log("Введеный промокод не существует", error);
                    setShowModal(true)
                    setTextModal("Введеный промокод не существует")
                });
        }
        setPromoCodeText("");
    };    

    const deletePromoCode = (code) => {
        setTextModal(`Вы уверены, что хотите деактивировать промокод ${code}?`)
        setCodeToDelete(code);
        setShowModalDel(true);
    }

    const deleteCDode = () => {
        const filteredCodes_1 = promoCode.list.filter(promoCode => promoCode.code !== codeToDelete);
        promoCode.setList(filteredCodes_1);

        const filteredCodes_2 = appliedPromoCodes.filter(promoCode => promoCode.code !== codeToDelete);
        setAppliedPromoCodes(filteredCodes_2)

        setShowModalDel(false);

        // Сохраняем обновленный список промокодов в localStorage
        localStorage.setItem('appliedPromoCodes', JSON.stringify(filteredCodes_2));
    }

    return (
        <div className="menu-promo-code-container">
            <div className="menu-promo-code-container-menu">
                <div className="menu-promo-code-container-menu-btn-back" onClick={() => navigate(-1)}>
                    <img src={btnBack} alt="Куда пропала кнопка назад? О.О" />
                </div>
                <div className="menu-promo-code-container-menu-input">
                    <CustomInput
                        value={promoCodeText} 
                        setValue={setPromoCodeText} 
                        label={"Введите промокод"}
                        type="text"
                    />
                </div>
                <div className="menu-promo-code-container-menu-button">
                    <ButtonItem
                        name="Активировать"
                        onClick={addCodeToList}
                    />
                </div>
            </div>
            <div className="menu-promo-code-container-list">
                {appliedPromoCodes.map((promoCode, index) => (
                    <div className="menu-promo-code-container-list-item" key={index}>
                        <div className="menu-promo-code-container-list-item-code">
                            {promoCode.code}
                        </div>
                        <div className="menu-promo-code-container-list-item-discount">
                            -{promoCode.discount}%
                        </div>
                        <div className="menu-promo-code-container-list-item-code-product">
                            {promoCode.productName}
                        </div>
                        <div className="menu-promo-code-container-list-item-code-product-btn-delete">
                            <img src={btnDelete} alt="Тут должен быть крестик!" onClick={() => deletePromoCode(promoCode.code)}/>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <MessageBox
                    message={textModal}
                    check={true}
                    onYes={() => setShowModal(false)}
                    textYes={"Ок"}
                    oneButton={true}
                />
            )}
            {showModalDel && (
                <MessageBox
                    message={textModal}
                    check={true}
                    onYes={deleteCDode}
                    onNo={() => setShowModalDel(false)}
                    textNo={"Нет"}
                    textYes={"Да"}
                />
            )}
        </div>
    )
})

export default MenuPromoCode