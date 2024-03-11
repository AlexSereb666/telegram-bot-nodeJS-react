import React, { useEffect, useMemo, useState } from "react";
import { useParams } from 'react-router-dom';
import './PersonalOrders.css';
import CustomDropdown from "../../components/customDropdown/CustomDropdown";
import { getOrderOne } from '../../http/orderAPI';
import ButtonItem from "../../components/buttonItem/ButtonItem";
import DateTimePicker from "../../components/dateTimePicker/DateTimePicker";

const PersonalOrders = () => {
    const { idUser } = useParams()

    const [listStatus, setListStatus] = useState([])
    const [selectStatus, setSelectStatus] = useState("")

    const [listOrders, setListOrders] = useState([])

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleSelectStatus= (value) => {
        setSelectStatus(value)
    };

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    // получаем заказы и всю инфу о них //
    useEffect(() => {
        getOrderOne(idUser).then((item) => setListOrders(item))
    }, [])

    // уникальные статусы, для фильтров //
    useMemo(() => {
        const uniqueStatus = [...new Set(listOrders.map(order => order.status))];
        setListStatus([{ id: 0, name: 'Все' }, ...uniqueStatus.map((item, index) => ({ id: index + 1, name: item }))]);
    }, [listOrders])

    const totalPrice = (items) => { 
        let sum = 0;
        for (let item of items) {
            sum += item.currentPrice;
        }

        return sum;
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
                            name={"💰 ⬆"}
                        />
                    </div>
                    <div className="personal-orders-container-menu-sort-date">
                        <ButtonItem
                            name={"📆 ⬇"}
                        />
                    </div>
                </div>
            </div>
            <div className="personal-orders-container-list">
                {listOrders && listOrders.map((item) => (
                    <div className="personal-orders-container-list-item" key={item.id}>
                        <div className="personal-orders-container-list-item-name">
                            <div className="personal-orders-container-list-item-name-date">
                                {item.date}
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
                ))}
            </div>
        </div>
    )
}

export default PersonalOrders;
