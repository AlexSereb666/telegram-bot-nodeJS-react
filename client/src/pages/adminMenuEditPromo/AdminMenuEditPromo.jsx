import React, { useState, useEffect } from "react";
import './AdminMenuEditPromo.css';
import { useParams, useNavigate } from 'react-router-dom';
import btnBack from '../../assets/img/button-back.png'
import CustomInput from "../../components/customInput/CustomInput";
import ButtonItem from "../../components/buttonItem/ButtonItem"
import ToggleCheckbox from "../../components/toggleCheckbox/ToggleCheckbox";
import DateTimePicker from "../../components/dateTimePicker/DateTimePicker";
import { getPromoCodeById, editPromoCode,
    addPromoCodeToProduct, deletePromoCodeProduct } from '../../http/promoCodeAPI';
import MessageBox from "../../components/messageBox/MessageBox";
import CustomDropdown from '../../components/customDropdown/CustomDropdown';
import { getAll } from '../../http/productAPI';
import deleteImg from '../../assets/img/delete.png'

const AdminMenuEditPromo = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [promo, setPromo] = useState({})

    const [code, setCode] = useState("")
    const [discount, setDiscount] = useState(0)
    const [isCheckedBlock, setIsCheckedBlock] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const [message, setMessage] = useState("")
    const [showModal, setShowModal] = useState(false)

    const [showModalProd, setShowModalProd] = useState(false)

    const [listProduct, setListProduct] = useState([])
    const [list, setList] = useState([])
    const [selectedProduct, setSelectedProduct] = useState("")

    useEffect(() => {
        getAll().then((item) => setListProduct(item))
    }, [])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const initPromo = () => {
        getPromoCodeById(id).then((item) => setPromo(item.promoCode))
    }

    useEffect(() => {
        initPromo()
    }, [])

    useEffect(() => {
        setCode(promo.code)
        setDiscount(promo.discount)
        setIsCheckedBlock(promo.block)
        setSelectedDate(promo.validUntilDate)
    }, [promo])

    const restartPromo = () => {
        initPromo()
    }

    const onEditPromo = () => {
        const status  = isCheckedBlock ? 'Закрыт' : 'Открыт';
        editPromoCode(id, code, discount, status, selectedDate)
        .then((item) => console.log(item))

        setShowModal(true)
        setMessage("Промокод успешно изменен")
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const handleSelectProduct = (value) => {
        setSelectedProduct(value)
    }

    const openAddProduct = () => {
        const filteredListProduct = listProduct.filter(product => {
            return !promo.products.some(promoProduct => promoProduct.id === product.id);
        });
    
        const simplifiedList = filteredListProduct.map(product => {
            return {
                id: product.id,
                name: product.name
            };
        });
    
        setList(simplifiedList);
    
        setShowModalProd(true);
    }

    const onAddProductPromo = () => {
        const product = list.find(product => product.name === selectedProduct);
        addPromoCodeToProduct(id, product.id).then(() => initPromo())
        setShowModalProd(false)
    }

    const deleteOnClick = (productId) => {
        deletePromoCodeProduct(id, productId).then(() => initPromo())
    }

    return (
        <div className="admin-menu-edit-promo">
            <div className="admin-menu-edit-promo-info">
                <div className="product-card-container-btn-back" onClick={() => navigate(-1)}>
                    <img src={btnBack} alt="Ой, тут должна быть кнопка назад!" />
                </div>
                <CustomInput
                    value={code}
                    setValue={setCode}
                    label={"Код"}
                />
                <CustomInput
                    value={discount}
                    setValue={setDiscount}
                    label={"Скидка"}
                    max={100}
                    min={0}
                    type="number"
                />
                <ToggleCheckbox
                    label="Заблокировать"
                    isChecked={false} 
                    onToggle={() => setIsCheckedBlock(!isCheckedBlock)}
                />
                <DateTimePicker
                    defaultDate={selectedDate}
                    onDateChange={handleDateChange}
                    label="Действителен: "
                />
                <div className="admin-menu-edit-promo-info-btns">
                    <ButtonItem
                        name="Сохранить изменения"
                        onClick={onEditPromo}
                    />
                    <ButtonItem
                        name="Сбросить"
                        onClick={restartPromo}
                    />
                </div>
                <div className="admin-menu-edit-promo-info-add-product">
                    <ButtonItem
                        name="Добавить продукт"
                        onClick={openAddProduct}
                    />
                </div>
            </div>
            <div className="admin-menu-edit-promo-list">
                {promo.products && promo.products.map((item) => (
                    <div className="admin-menu-edit-promo-list-item" key={item.id}>
                        <div className="admin-menu-edit-promo-list-item-name">
                            {item.name}
                        </div>
                        <div className="admin-menu-edit-promo-list-item-delete">
                            <img src={deleteImg} alt="Нет изображения" onClick={() => deleteOnClick(item.id)}/>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <MessageBox
                    onYes={closeModal}
                    textYes={"Ок"}
                    check={true}
                    oneButton={true}
                    message={message}
                />
            )}
            {showModalProd && (
                <div className="modal-desc">
                    <div className="modal-content-desc">
                        <CustomDropdown
                            options={list}
                            onSelect={handleSelectProduct}
                            text="Продукт"
                            containerStyle={{ width: '235px' }}
                        />
                        <div className="modal-content-desc-button">
                            <ButtonItem
                                name="Отмена"
                                onClick={() => setShowModalProd(false)}
                            />
                            <ButtonItem
                                name="Добавить"
                                onClick={onAddProductPromo}
                            />
                        </div>
                    </div>
              </div>
            )}
        </div>
    )
}

export default AdminMenuEditPromo;
