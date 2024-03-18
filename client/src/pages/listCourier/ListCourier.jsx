import React, { useEffect, useState } from "react";
import './ListCourier.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getBaristaOrdersWithStatus } from '../../http/orderAPI';
import { getUserById } from '../../http/userAPI'
import imgCat from '../../assets/img/cat.png';
import messageImg from '../../assets/img/message.png';
import ButtonItem from "../../components/buttonItem/ButtonItem";
import MessageBoxList from "../../components/messageBoxList/MessageBoxList";

const ListCourier = () => {
    const { idBarista } = useParams();
    const navigate = useNavigate();

    const [listOrders, setListOrder] = useState([]);
    const [couriers, setCouriers] = useState({});

    const [sortDate, setSortDate] = useState("📆")
    const [showModal, setShowModal] = useState(false)
    const [listProducts, setListProducts] = useState([])

    useEffect(() => {
        getBaristaOrdersWithStatus(idBarista, 'Ожидает_доставку')
        .then((item) => setListOrder(item));
    }, [idBarista]);

    useEffect(() => {
        const fetchCouriers = async () => {
            const courierIds = listOrders.map(order => order.courierId);
            const fetchedCouriers = {};
            await Promise.all(courierIds.map(async id => {
                const courier = await getUserById(id);
                fetchedCouriers[id] = courier.user;
            }));
            setCouriers(fetchedCouriers);
        };
        fetchCouriers();
    }, [listOrders]);

    // парсинг даты //
    const parseDate = (date) => {
        const originalDate = new Date(date);
        const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
            .toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours()
                .toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
        
        return formattedDate;
    }

    const navigateMessage = (id) => {
        navigate(`/messageBot/${id}/${idBarista}`)
    }

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

    return (
        <div className="list-courier-container">
            {listOrders.length > 0 ? (
                <div>
                    <div className="list-courier-container-menu">
                        <ButtonItem
                            name={sortDate}
                            onClick={sortedDate}
                        />
                    </div>
                    <div className="list-courier-container-list">
                        { listOrders.map((item, index) => (
                                <div className="list-courier-container-list-item" key={index} onClick={() => openModal(item.order_products)}>
                                    <div className="list-courier-container-list-item-info">
                                        <div className="list-courier-container-list-item-info-order-id">
                                            Номер заказа: {item.id}
                                        </div>
                                        <div className="list-courier-container-list-item-info-order-name-couirer">
                                            Курьер: {couriers[item.courierId]?.name || 'Загрузка...'}
                                        </div>
                                        <div className="list-courier-container-list-item-info-order-data">
                                            {parseDate(item.date)}
                                        </div>
                                    </div>
                                    <div className="list-courier-container-list-item-button-message" onClick={(e) => e.stopPropagation()}>
                                        <img src={messageImg} alt="грустный котик:(" onClick={() => navigateMessage(item.courierId)}/>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ) : (
                <div className="personal-orders-cat">
                    <div className="menu-list-img-cat">
                        <img src={imgCat} alt="Тут должно быть изображение:("/>
                        <div className="menu-list-img-cat-name">Заказы не найдены</div>
                    </div>
                </div>
            )}
            {showModal && (
                <MessageBoxList
                    onOk={closeModal}
                    textOk={"Закрыть"}
                    list={listProducts}
                    flag={false}
                />
            )}
        </div>
    );
}

export default ListCourier;
