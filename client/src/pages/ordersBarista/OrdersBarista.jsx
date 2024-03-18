import React, { useState, useEffect, useMemo } from "react";
import './OrdersBarista.css';
import { useParams, useNavigate } from 'react-router-dom';
import CustomDropdown from '../../components/customDropdown/CustomDropdown';
import { getUnassignedAndBaristaOrders, updateStatusOrder } from '../../http/orderAPI';
import ButtonItem from "../../components/buttonItem/ButtonItem";
import imgCat from '../../assets/img/cat.png';
import MessageBoxList from "../../components/messageBoxList/MessageBoxList";
import MessageBox from "../../components/messageBox/MessageBox";
import messageImg from '../../assets/img/message.png';

const OrdersBarista = () => {
    const { idUser } = useParams()

    const navigate = useNavigate()

    const listStatusOrders = [
        {id: 1, name: "Отменен"},
        {id: 2, name: "Выполнен"},
        {id: 3, name: "Оформлен"},
        {id: 4, name: "В работе"},
        {id: 5, name: "Передан в доставку"},
        {id: 6, name: "Готов к получению"},
    ]

    const [listOrders, setListOrders] = useState([])
    const [listOrdersSorted, setListOrdersSorted] = useState([])

    const [sortDate, setSortDate] = useState("📆")
    const [archive, setArchive] = useState("Архив")

    const [listStatus, setListStatus] = useState([])
    const [selectStatus, setSelectStatus] = useState("")

    const [listProducts, setListProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showModalConfirmation, setShowModalConfirmation] = useState(false)

    const [editStatus, setEditStatus] = useState({})

    useEffect(() => {
        getUnassignedAndBaristaOrders(idUser).then((item) => setListOrders(item))
    }, [])

    const currentOrdersFilter = () => {
        const filteredOrders = listOrders.filter(order => order.status !== "Отменен" && order.status !== "Выполнен");
        setListOrdersSorted(filteredOrders);
    }

    const archiveOrdersFilter = () => {
        const filteredOrders = listOrders.filter(order => order.status === "Отменен" || order.status === "Выполнен");
        setListOrdersSorted(filteredOrders);
    }

    useEffect(() => {
        currentOrdersFilter()
    }, [listOrders])

    // уникальные статусы, для фильтров //
    useMemo(() => {
        const uniqueStatus = [...new Set(listOrdersSorted.map(order => order.status))];
        setListStatus([{ id: 0, name: 'Все' }, ...uniqueStatus.map((item, index) => ({ id: index + 1, name: item }))]);
    }, [listOrdersSorted])

    const handleSelectStatus = (value) => {
        setSelectStatus(value)

        if (value === "Все") {
            if (archive === "Архив") {
                currentOrdersFilter()
            } else {
                archiveOrdersFilter()
            }
        } else {
            const filteredOrders = listOrders.filter(order => order.status === value);
            setListOrdersSorted(filteredOrders);
        }
    };

    const handleSelectStatusOrder = (value, id) => {
        setShowModalConfirmation(true);
        setEditStatus({id, status: value})
    };

    const sortedDate = () => {
        if (sortDate === "📆") {
            setSortDate("📆 ⬆")
            listOrdersSorted.sort((a, b) => new Date(a.date) - new Date(b.date))
        } else if (sortDate === "📆 ⬆") {
            setSortDate("📆 ⬇")
            listOrdersSorted.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (sortDate === "📆 ⬇") {
            setSortDate("📆 ⬆")
            listOrdersSorted.sort((a, b) => new Date(a.date) - new Date(b.date))
        }
    }

    const sortedType = () => {
        if (archive === "Архив") {
            setArchive("Актуальные")
            archiveOrdersFilter()
        } else {
            setArchive("Архив")
            currentOrdersFilter()
        }
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

    const canselEditOrder = () => {
        setListOrders([])
        getUnassignedAndBaristaOrders(idUser).then((item) => setListOrders(item))
        setShowModalConfirmation(false);
    }

    const editOrderStatus = () => {
        updateStatusOrder(editStatus.id, idUser, editStatus.status)
        .then((item) => console.log(`Статус заказа успешно изменен на "${item.status}"`));
        setShowModalConfirmation(false);
    }

    // парсинг даты //
    const parseDate = (date) => {
        const originalDate = new Date(date);
        const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
            .toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours()
                .toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
        
        return formattedDate;
    }

    const navigateMessage = (id) => {
        navigate(`/messageBot/${id}/${idUser}`)
    }

    return (
        <div className="orders-barista-container">
            <div className="orders-barista-container-menu">
                <div className="orders-barista-container-menu-top">
                    <div className="orders-barista-container-menu-top-filter-status">
                        <CustomDropdown
                            options={listStatus}
                            onSelect={handleSelectStatus}
                            text="Статус..."
                            containerStyle={{ width: '140px' }}
                            selectedItem={selectStatus}
                        />
                    </div>
                </div>
                <div className="orders-barista-container-menu-bottom">
                    <div className="orders-barista-container-menu-bottom-sorted">
                        <ButtonItem
                            name={sortDate}
                            onClick={sortedDate}
                        />
                    </div>
                    <div className="orders-barista-container-menu-bottom-button-archive">
                        <ButtonItem
                            name={archive}
                            onClick={sortedType}
                        />
                    </div>
                </div>
            </div>
            <div className="orders-barista-container-list">
                {listOrdersSorted.length > 0 ? ( listOrdersSorted.map((item, index) => (
                    <div className="orders-barista-container-list-item" ket={index} onClick={() => openModal(item.order_products)}>
                        <div className="orders-barista-container-list-item-data-delivery">
                            <div className="orders-barista-container-list-item-order-id">
                                Номер заказа: {item.id}
                            </div>
                            <div className="orders-barista-container-list-item-data">
                                {parseDate(item.date)}
                            </div>
                            <div className="orders-barista-container-list-item-delivery">
                                {item.delivery ? "С доставкой" : "Без доставки"}
                            </div>
                            <div className="orders-barista-container-list-item-count-products">
                                Продуктов: {item.order_products.length}
                            </div>
                        </div>
                        <div className="orders-barista-container-list-item-message" onClick={(e) => e.stopPropagation()}>
                            <img src={messageImg} alt="грустный котик:(" onClick={() => navigateMessage(item.userId)}/>
                        </div>
                        <div className="orders-barista-container-list-item-status" onClick={(e) => e.stopPropagation()}>
                            <CustomDropdown
                                options={listStatusOrders}
                                onSelect={(value) => handleSelectStatusOrder(value, item.id)}
                                text="Статус..."
                                containerStyle={{ width: '160px' }}
                                selectedItem={item.status}
                                disabled={archive === 'Архив' ? false : true}
                            />
                        </div>
                    </div>
                ))) : (
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
            {showModalConfirmation && (
                <MessageBox
                    message="Вы уверены, что хотите изменить статус заказа?"
                    check={true}
                    onYes={editOrderStatus}
                    onNo={canselEditOrder}
                    textNo={"Нет"}
                    textYes={"Да"}
                />
            )}
        </div>
    )
}

export default OrdersBarista;
