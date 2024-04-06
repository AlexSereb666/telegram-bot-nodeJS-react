import React, { useState, useEffect } from "react";
import './AdminMenuListPromo.css';
import { useNavigate } from 'react-router-dom';
import { getAllPromoCodesCurrent, deletePromoCode, addPromoCode } from '../../http/promoCodeAPI'
import imgCat from '../../assets/img/cat.png'
import CustomInput from "../../components/customInput/CustomInput";
import ButtonItem from "../../components/buttonItem/ButtonItem"
import deleteImg from '../../assets/img/delete.png'
import ToggleCheckbox from "../../components/toggleCheckbox/ToggleCheckbox";
import DateTimePicker from "../../components/dateTimePicker/DateTimePicker";

const AdminMenuListPromo = () => {
    const navigate = useNavigate()

    const [listPromo, setListPromo] = useState([])
    const [sortListPromo, setSortListPromo] = useState([])

    const [searchCode, setSearchCode] = useState("")

    const [sortDate, setSortDate] = useState(true)
    const [sortDiscount, setSortDiscount] = useState(true)
    const [sortCount, setSortCount] = useState(true)

    const [showModal, setShowModal] = useState(false)

    const [code, setCode] = useState("")
    const [discount, setDiscount] = useState(0)
    const [isCheckedBlock, setIsCheckedBlock] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const initPromo = () => {
        getAllPromoCodesCurrent(false).then((item) => setListPromo(item.promoCodes))
    }

    useEffect(() => {
        initPromo()
    }, [])

    useEffect(() => {
        setSortListPromo(listPromo)
    }, [listPromo])

    const sorted = () => {
        let sortedList = [...listPromo];

        sortedList = sortedList.filter(item => {
            const nameCondition = searchCode ? item.code.toLowerCase().includes(searchCode.toLowerCase()) : true;
            return nameCondition;
        });

        if (sortDate) {
            sortedList.sort((a, b) => new Date(a.validUntilDate) - new Date(b.validUntilDate));
        } else {
            sortedList.sort((a, b) => new Date(b.validUntilDate) - new Date(a.validUntilDate));
        }

        if (sortDiscount) {
            sortedList.sort((a, b) => a.discount - b.discount);
        } else {
            sortedList.sort((a, b) => b.discount - a.discount);
        }

        if (sortCount) {
            sortedList.sort((a, b) => a.promo_code_products.length - b.promo_code_products.length);
        } else {
            sortedList.sort((a, b) => b.promo_code_products.length - a.promo_code_products.length);
        }
        setSortListPromo(sortedList);
    };

    useEffect(() => {
        sorted()
    }, [sortDate, sortDiscount, sortCount, searchCode])

    const parseDate = (date) => {
        const originalDate = new Date(date);
        const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
            .toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours()
                .toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
        
        return formattedDate;
    }

    const onDeletePromo = (id) => {
        deletePromoCode(id).then(() => initPromo())
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const closeModal = () => {
        setCode("")
        setDiscount(0)
        setIsCheckedBlock(false)
        setShowModal(false)
    }

    const addPromo = () => {
        const active  = isCheckedBlock ? 'Закрыт' : 'Открыт';
        addPromoCode(code, discount, active, selectedDate)
        .then(() => initPromo())

        setShowModal(false)
    }

    return (
        <div className="admin-menu-list-promo">
            <div className="admin-menu-list-promo-menu">
                <div className="admin-menu-list-promo-menu-search">
                    <CustomInput
                        value={searchCode}
                        setValue={setSearchCode}
                        label={"Код"}
                    />
                </div>
                <div className="admin-menu-list-promo-menu-sort">
                    <ButtonItem
                        name="По дате"
                        onClick={() => setSortDate(!sortDate)}
                    />
                    <ButtonItem
                        name="По скидке"
                        onClick={() => setSortDiscount(!sortDiscount)}
                    />
                    <ButtonItem
                        name="По кол-ву продуктов"
                        onClick={() => setSortCount(!sortCount)}
                    />
                </div>
                <div className="admin-menu-list-promo-menu-add-code">
                    <ButtonItem
                        name="Добавить промокод"
                        onClick={() => setShowModal(true)}
                    />
                </div>
            </div>
            <div className="admin-menu-list-promo-list">
                {sortListPromo.length > 0 ? ( sortListPromo.map((item) => (
                    <div className="admin-menu-list-promo-list-item" key={item.id} onClick={() => navigate(`/adminEditPromo/${item.id}`)}>
                        <div className="admin-menu-list-promo-list-item-code">
                            {item.code}
                        </div>
                        <div className="admin-menu-list-promo-list-item-discount">
                            {item.discount}%
                        </div>
                        <div className="admin-menu-list-promo-list-item-date">
                            {parseDate(item.validUntilDate)}
                        </div>
                        <div className="admin-menu-list-promo-list-item-count">
                            /{item.promo_code_products.length}
                        </div>
                        <div className="admin-menu-list-promo-list-item-status">
                            {item.status}
                        </div>
                        <div className="admin-menu-list-promo-list-item-delete" onClick={(e) => e.stopPropagation()}>
                            <img src={deleteImg} alt="Нет изображения" onClick={() => onDeletePromo(item.id)} />
                        </div>
                    </div>
                ))
                ) : (
                    <div className="personal-orders-cat">
                        <div className="menu-list-img-cat">
                            <img src={imgCat} alt="Тут должно быть изображение:("/>
                            <div className="menu-list-img-cat-name">Промокоды не найдены</div>
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <div className="modal-desc">
                    <div className="modal-content-desc">
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
                            isChecked={isCheckedBlock} 
                            onToggle={() => setIsCheckedBlock(!isCheckedBlock)}
                        />
                        <DateTimePicker
                            defaultDate={selectedDate}
                            onDateChange={handleDateChange}
                            label="Действителен: "
                        />
                        <div className="modal-content-desc-btns">
                            <ButtonItem
                                name="Отмена"
                                onClick={closeModal}
                            />
                            <ButtonItem
                                name="Добавить промокод"
                                onClick={addPromo}
                            />
                        </div>
                    </div>
              </div>
            )}
        </div>
    )
}

export default AdminMenuListPromo;
