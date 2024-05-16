import React, { useEffect, useState } from "react";
import './ListMaintenance.css'
import { getMaintenance } from "../../http/maintenanceAPI";
import imgCat from '../../assets/img/cat.png';
import deleteImg from '../../assets/img/delete.png'
import CustomDropdown from "../../components/customDropdown/CustomDropdown";
import ButtonItem from "../../components/buttonItem/ButtonItem";

const ListMaintenance = () => {
    const [list, setList] = useState([])
    const [text, setText] = useState('')

    const [showModal, setShowModal] = useState(false)

    const listStatus = [
        {id: 1, name: "В работе"},
        {id: 2, name: "Запланирован"},
        {id: 3, name: "Выполнен"},
        {id: 4, name: "Отменен"},
    ]

    useEffect(() => {
        getMaintenance().then((item) => setList(item))
    }, [])

    const parseDate = (date) => {
        const originalDate = new Date(date);
        const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
            .toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours()
                .toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
        
        return formattedDate;
    }

    const openModal = (desc, note) => {
        setText(`Описание: ${desc}.\n\nПримечания: ${note}`)
        setShowModal(true)
    }

    return (
        <div className="list-maintenance">
            <div className="list-maintenance-filtr">
                <div className="list-maintenance-filtr-status">
                    <CustomDropdown
                        options={listStatus}
                        onSelect={() => console.log("Кнопка")}
                        text="Статус..."
                        containerStyle={{ width: '140px' }}
                    />
                </div>
                <div className="list-maintenance-filtr-date">
                    <ButtonItem
                        name={"По дате"}
                    />
                </div>
            </div>
            <div className="list-maintenance-list">
                {list && list.map((data, index) => (
                    <div key={index} className="list-maintenance-list-item" onClick={() => openModal(data.description, data.notes)}>
                        <div className="list-maintenance-list-item-title">
                            {data.title}
                        </div>
                        <div className="list-maintenance-list-item-date">
                            <div className="list-maintenance-list-item-date-from">
                                {parseDate(data.dateBegin)}
                            </div>
                            <div className="list-maintenance-list-item-date-before">
                                {parseDate(data.dateEnd)}
                            </div>
                        </div>
                        <div className="list-maintenance-list-item-status">
                            <CustomDropdown
                                options={listStatus}
                                onSelect={(value) => console.log(value)}
                                text="Статус..."
                                containerStyle={{ width: '100px' }}
                                selectedItem={data.status}
                            />
                        </div>
                        <div className="list-maintenance-list-item-delete">
                            <img src={deleteImg} alt="Нет изображения"/>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal">
                <div className="modal-content">
                    <div className="modal-content-message">
                        {text}
                    </div>
                    <ButtonItem
                        name="ОК"
                        onClick={() => setShowModal(false)}
                    />
                </div>
            </div>
            )}
        </div>
    )
}

export default ListMaintenance;
