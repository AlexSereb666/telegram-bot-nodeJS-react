import React, { useEffect, useState } from "react";
import './AdminOrders.css';
import { getAll, deleteOrder, updateStatusAdmin } from '../../http/orderAPI';
import imgCat from '../../assets/img/cat.png'
import CustomDropdown from '../../components/customDropdown/CustomDropdown';
import deleteImg from '../../assets/img/delete.png'
import MessageBoxList from "../../components/messageBoxList/MessageBoxList";
import CustomInput from "../../components/customInput/CustomInput";
import ButtonItem from "../../components/buttonItem/ButtonItem"

const AdminOrders = () => {
    const [listOrders, setListOrders] = useState([])
    const [sortListOrders, setSortListOrders] = useState([])
    const [selectedStatus, setSelectedStatus] = useState("")
    const [sortDate, setSortDate] = useState(true)
    const [searchNum, setSearchNum] = useState("")

    const [listProducts, setListProducts] = useState([])
    const [showModal, setShowModal] = useState(false)

    const listStatusOrders = [
        {id: 1, name: "Отменен"},
        {id: 2, name: "Выполнен"},
        {id: 3, name: "Оформлен"},
        {id: 4, name: "В работе"},
        {id: 5, name: "Передан в доставку"},
        {id: 6, name: "Готов к получению"},
        {id: 7, name: "Ожидает доставку"},
    ]

    const initOrders = () => {
        getAll().then((item) => setListOrders(item))
    }

    useEffect(() => {
        initOrders()
    }, [])

    useEffect(() => {
        setSortListOrders(listOrders)
    }, [listOrders])

    const handleSelectStatus = (id, value) => {
        setSelectedStatus(value)

        updateStatusAdmin(id, value).then((item) => console.log(item))
    }

    const parseDate = (date) => {
        const originalDate = new Date(date);
        const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
            .toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours()
                .toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
        
        return formattedDate;
    }

    const onDeleteOrder = (id) => {
        deleteOrder(id).then(() => initOrders())
    }

    const openModal = (listProduct) => {
        let items = []

        listProduct.map((item, index) => {
            items.push({id: index, title: item.product.name,
                status: '', date: `${item.currentPrice}₽`})
        })

        setListProducts(items)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const sorted = () => {
        let sortedList = [...listOrders];

        sortedList = sortedList.filter(item => {
            const nameCondition = searchNum ? `${item.id}`.toLowerCase().includes(searchNum.toLowerCase()) : true;
            return nameCondition;
        });

        if (sortDate) {
            sortedList.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else {
            sortedList.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        setSortListOrders(sortedList);
    };

    useEffect(() => {
        sorted()
    }, [searchNum, sortDate])

    return (
        <div className="admin-orders">
            <div className="admin-orders-menu">
                <div className="admin-orders-menu-search">
                    <CustomInput
                        value={searchNum}
                        setValue={setSearchNum}
                        label={"Номер заказа"}
                    />
                </div>
                <div className="admin-orders-menu-sort-date">
                    <ButtonItem
                        name={"По дате"}
                        onClick={() => setSortDate(!sortDate)}
                    />
                </div>
            </div>
            <div className="admin-orders-list">
                {sortListOrders.length > 0 ? (
                    sortListOrders.map((item) => (
                        <div className="admin-orders-list-item" key={item.id} onClick={() => openModal(item.order_products)}>
                            <div className="admin-orders-list-item-number">
                                Номер: {item.id}
                            </div>
                            <div className="admin-orders-list-item-date">
                                {parseDate(item.date)}
                            </div>
                            <div className="admin-orders-list-item-status" onClick={(e) => e.stopPropagation()}>
                                <CustomDropdown
                                    options={listStatusOrders}
                                    onSelect={(value) => handleSelectStatus(item.id, value)}
                                    text="Статус..."
                                    containerStyle={{ width: '140px' }}
                                    selectedItem={item.status}
                                />
                            </div>
                            <div className="admin-orders-list-item-delete" onClick={(e) => e.stopPropagation()}>
                                <img src={deleteImg} alt="Нет изображения" onClick={() => onDeleteOrder(item.id)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="personal-orders-cat">
                        <div className="menu-list-img-cat">
                            <img src={imgCat} alt="Тут должно быть изображение:("/>
                            <div className="menu-list-img-cat-name">Заказы не найдены</div>
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <MessageBoxList
                    onOk={closeModal}
                    textOk={"Закрыть"}
                    list={listProducts}
                    flag={false}
                />
            )}
        </div>
    )
}

export default AdminOrders;
