import React, { useEffect, useState } from "react";
import './OrdersCourier.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourierOrdersWithStatus, getCourierOrdersWithStatusFree, 
    updateStatusOrderCourier } from '../../http/orderAPI'
import ButtonItem from "../../components/buttonItem/ButtonItem";
import imgCat from '../../assets/img/cat.png';
import messageImg from '../../assets/img/message.png';
import CustomDropdown from '../../components/customDropdown/CustomDropdown';
import MessageBoxList from "../../components/messageBoxList/MessageBoxList";
import MessageBox from "../../components/messageBox/MessageBox";

const OrdersCourier = () => {
    const { idUser } = useParams()

    const navigate = useNavigate()

    const [selectedMenu, setSelectedMenu] = useState(1);
    const [listOrders, setListOrders] = useState([])

    const [sortDate, setSortDate] = useState("📆")

    const [listProducts, setListProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showModalConfirmation, setShowModalConfirmation] = useState(false)
    const [editStatus, setEditStatus] = useState({})

    const listStatusOrders = [
        {id: 1, name: "Выполнен"},
        {id: 2, name: "Передан в доставку"},
        {id: 3, name: "Ожидает доставку"},
    ]

    const choiceOrders = (selectedMenu) => {
        if (selectedMenu === 1) { // свободные заказы
            getCourierOrdersWithStatusFree('Передан_в_доставку')
            .then((item) => setListOrders(item))
        } else if (selectedMenu === 2) { // мои заказы
            getCourierOrdersWithStatus(idUser, 'Ожидает_доставку')
            .then((item) => setListOrders(item))
        } else if (selectedMenu === 3) { // история заказов
            getCourierOrdersWithStatus(idUser, 'Выполнен')
            .then((item) => setListOrders(item))
        }
    }

    useEffect(() => {
        choiceOrders(selectedMenu)
    }, [selectedMenu])

    const sortedDate = () => {
        if (sortDate === "📆") {
            setSortDate("📆 ⬆")
            listOrders.sort((a, b) => new Date(a.date) - new Date(b.date))
        } else if (sortDate === "📆 ⬆") {
            setSortDate("📆 ⬇")
            listOrders.sort((a, b) => new Date(b.date) - new Date(a.date))
        } else if (sortDate === "📆 ⬇") {
            setSortDate("📆 ⬆")
            listOrders.sort((a, b) => new Date(a.date) - new Date(b.date))
        }
    }

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

    const handleSelectStatusOrder = (value, id) => {
        setShowModalConfirmation(true);
        setEditStatus({id, status: value})
    };

    const canselEditOrder = () => {
        setListOrders([])
        choiceOrders(selectedMenu);
        setShowModalConfirmation(false);
    }

    const editOrderStatus = () => {
        updateStatusOrderCourier(editStatus.id, idUser, editStatus.status)
        .then((item) => console.log(`Статус заказа успешно изменен на "${item.status}"`));
        setShowModalConfirmation(false);
    }

    return (
        <div className="orders-courier-container">
            <div className="orders-courier-container-menu">
                <div className="orders-courier-container-menu-top">
                    <div className="orders-courier-container-menu-top-free">
                        <ButtonItem
                            name="Свободные заказы"
                            onClick={() => setSelectedMenu(1)}
                        />
                    </div>
                    <div className="orders-courier-container-menu-top-myOrders">
                        <ButtonItem
                            name="Моя работа"
                            onClick={() => setSelectedMenu(2)}
                        />
                    </div>
                    <div className="orders-courier-container-menu-top-history">
                        <ButtonItem
                            name="История"
                            onClick={() => setSelectedMenu(3)}
                        />
                    </div>
                </div>
                <div className="orders-courier-container-menu-bottom">
                    <div className="orders-courier-container-menu-bottom-sort">
                        <ButtonItem
                            name={sortDate}
                            onClick={sortedDate}
                        />
                    </div>
                </div>
            </div>
            <div className="orders-courier-container-list">
                {listOrders.length > 0 ? (
                    listOrders.map((item, index) => (
                        <div className="orders-courier-container-list-item" ket={index} onClick={() => openModal(item.order_products)}>
                            <div className="orders-courier-container-list-item-data-info">
                                <div className="orders-courier-container-list-item-order-id">
                                    Номер заказа: {item.id}
                                </div>
                                <div className="orders-courier-container-list-item-delivery">
                                    {item.address}
                                </div>
                                <div className="orders-courier-container-list-item-data">
                                    {parseDate(item.date)}
                                </div>
                            </div>
                            {selectedMenu !== 3 && (
                                <div className="orders-courier-container-list-item-message" onClick={(e) => e.stopPropagation()}>
                                    <img src={messageImg} alt="грустный котик:(" onClick={() => navigateMessage(item.userId)}/>
                                </div>
                            )}
                            <div className="orders-courier-container-list-item-status" onClick={(e) => e.stopPropagation()}>
                                <CustomDropdown
                                    options={listStatusOrders}
                                    onSelect={(value) => handleSelectStatusOrder(value, item.id)}
                                    text="Статус..."
                                    containerStyle={{ width: '160px' }}
                                    selectedItem={item.status}
                                    disabled={selectedMenu === 3 ? true : false}
                                />
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

export default OrdersCourier;
