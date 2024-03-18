import React, { useEffect, useMemo, useState } from "react";
import { useParams } from 'react-router-dom';
import './PersonalOrders.css';
import CustomDropdown from "../../components/customDropdown/CustomDropdown";
import { getOrderOne } from '../../http/orderAPI';
import ButtonItem from "../../components/buttonItem/ButtonItem";
import DateTimePicker from "../../components/dateTimePicker/DateTimePicker";
import Reset from '../../assets/img/reset.png';
import MessageBoxList from "../../components/messageBoxList/MessageBoxList";
import imgCat from '../../assets/img/cat.png';

const PersonalOrders = () => {
    const { idUser } = useParams()

    const [listStatus, setListStatus] = useState([])
    const [selectStatus, setSelectStatus] = useState("")

    const [listOrders, setListOrders] = useState([])
    const [listOrdersSorted, setListOrdersSorted] = useState([])

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [resetFilter, setResetFilter] = useState(false);

    const [sortPrice, setSortPrice] = useState("💰")
    const [sortDate, setSortDate] = useState("📆")

    const [listProducts, setListProducts] = useState([])
    const [showModal, setShowModal] = useState(false)

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

    const sortedPrice = () => {
        if (sortPrice === "💰") {
            setSortPrice("💰 ⬆")
            listOrdersSorted.sort((a, b) => totalPrice(a.order_products) - totalPrice(b.order_products));
        } else if (sortPrice === "💰 ⬆") {
            setSortPrice("💰 ⬇")
            listOrdersSorted.sort((a, b) => totalPrice(b.order_products) - totalPrice(a.order_products));
        } else if (sortPrice === "💰 ⬇") {
            setSortPrice("💰 ⬆")
            listOrdersSorted.sort((a, b) => totalPrice(a.order_products) - totalPrice(b.order_products));
        }

        setSortDate("📆")
    }

    const sortedDate = () => {
        if (sortDate === "📆") {
            listOrdersSorted.sort((a, b) => new Date(a.date) - new Date(b.date))
            setSortDate("📆 ⬆")
        } else if (sortDate === "📆 ⬆") {
            listOrdersSorted.sort((a, b) => new Date(b.date) - new Date(a.date))
            setSortDate("📆 ⬇")
        } else if (sortDate === "📆 ⬇") {
            setSortDate("📆")
            listOrdersSorted.sort((a, b) => new Date(a.date) - new Date(b.date))
        }

        setSortPrice("💰");
    }

    useEffect(() => {
        let filteredOrders = [...listOrders];
    
        if (!resetFilter) {
            const selectedDateWithoutTime = new Date(selectedDate);
            selectedDateWithoutTime.setHours(0, 0, 0, 0);
            filteredOrders = filteredOrders.filter(order => {
                const orderDateWithoutTime = new Date(order.date);
                orderDateWithoutTime.setHours(0, 0, 0, 0);
                return orderDateWithoutTime.getTime() === selectedDateWithoutTime.getTime();
            });
        }
    
        setListOrdersSorted(filteredOrders);
    }, [selectedDate]);

    const sortedReset = () => {
        setSortDate("📆")
        setSortPrice("💰")
        setSelectStatus("Все")
        setSelectedDate(new Date())
        setResetFilter(true);

        setListOrdersSorted(listOrders)
    }

    useEffect(() => {
        let filteredOrders = [...listOrders];
    
        if (selectStatus !== "" && selectStatus !== "Все") {
            filteredOrders = filteredOrders.filter(order => order.status === selectStatus);
        }
    
        setListOrdersSorted(filteredOrders);
    }, [listOrders, selectStatus]);

    const handleSelectStatus= (value) => {
        setSelectStatus(value)
    };

    const handleDateChange = date => {
        setSelectedDate(date);
        setResetFilter(false);
    };

    // получаем заказы и всю инфу о них //
    useEffect(() => {
        getOrderOne(idUser).then((item) => setListOrders(item))
    }, [])

    // уникальные статусы, для фильтров //
    useMemo(() => {
        const uniqueStatus = [...new Set(listOrders.map(order => order.status))];
        setListStatus([{ id: 0, name: 'Все' }, ...uniqueStatus.map((item, index) => ({ id: index + 1, name: item }))]);
        setListOrdersSorted(listOrders)
    }, [listOrders])

    const totalPrice = (items) => { 
        let sum = 0;
        for (let item of items) {
            sum += item.currentPrice;
        }

        return sum;
    }

    // парсинг даты //
    const parseDate = (date) => {
        const originalDate = new Date(date);
        const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
            .toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours()
                .toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
        
        return formattedDate;
    }

    return (
        <div className="personal-orders-container">
            <div className="personal-orders-container-menu">
                <div className="personal-orders-container-menu-filter">
                    <div className="personal-orders-container-menu-filter-date">
                        <DateTimePicker
                            defaultDate={selectedDate}
                            onDateChange={handleDateChange}
                        />
                    </div>
                    <div className="personal-orders-container-menu-filter-status">
                        <CustomDropdown
                            options={listStatus}
                            onSelect={handleSelectStatus}
                            text="Статус..."
                            containerStyle={{ width: '140px' }}
                            selectedItem={selectStatus}
                        />
                    </div>
                </div>
                <div className="personal-orders-container-menu-sort">
                    <div className="personal-orders-container-menu-sort-price">
                        <ButtonItem
                            name={sortPrice}
                            onClick={sortedPrice}
                        />
                    </div>
                    <div className="personal-orders-container-menu-sort-date">
                        <ButtonItem
                            name={sortDate}
                            onClick={sortedDate}
                        />
                    </div>
                    <div className="personal-orders-container-menu-sort-reset">
                        <ButtonItem
                            name={<img src={Reset} alt="Грусть"/>}
                            onClick={sortedReset}
                        />
                    </div>
                </div>
            </div>
            <div className="personal-orders-container-list">
                {listOrdersSorted.length > 0 ? ( listOrdersSorted.map((item) => (
                    <div className="personal-orders-container-list-item" key={item.id} onClick={() => openModal(item.order_products)}>
                        <div className="personal-orders-container-list-item-name">
                            <div className="personal-orders-container-list-item-name-order-id">
                                Номер заказа: {item.id}
                            </div>
                            <div className="personal-orders-container-list-item-name-date">
                                {parseDate(item.date)}
                            </div>
                            <div className="personal-orders-container-list-item-name-delivery">
                                {item.delivery ? "С доставкой" : "Без доставки"}
                            </div>
                        </div>
                        <div className="personal-orders-container-list-item-status">
                            {item.status}
                        </div>
                        <div className="personal-orders-container-list-item-price">
                            {totalPrice(item.order_products)}₽
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
        </div>
    )
}

export default PersonalOrders;
