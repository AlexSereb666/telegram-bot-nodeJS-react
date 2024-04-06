import React, { useState, useEffect } from "react";
import './AdminFeedback.css';
import { useParams, useNavigate } from 'react-router-dom';
import ButtonItem from "../../components/buttonItem/ButtonItem"
import { getAllFeedbacks } from '../../http/feedback';
import imgCat from '../../assets/img/cat.png';
import msgImg from '../../assets/img/message.png';

const AdminFeedback = () => {
    const { idUser } = useParams()
    const navigate = useNavigate()

    const [textBtn, setTextBtn] = useState("Активные")

    const [listFeedback, setListFeedback] = useState([])
    const [sortListFeedback, setSortListFeedback] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        getAllFeedbacks().then((item) => setListFeedback(item.feedbacks))
    }, [])

    useEffect(() => {
        setSortListFeedback(listFeedback)
    }, [listFeedback])

    const sorted = () => {
        if (textBtn === "Активные") {
            setTextBtn("Все")
        } else {
            setTextBtn("Активные")
        }
    }

    const parseDate = (date) => {
        const originalDate = new Date(date);
        const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
            .toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours()
                .toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
        
        return formattedDate;
    }

    const openModal = (message) => {
        setMessage(message)
        setShowModal(true)
    }

    return (
        <div className="admin-feedback">
            <div className="admin-feedback-menu">
                <ButtonItem
                    name={textBtn}
                    onClick={sorted}
                />
            </div>
            <div className="admin-feedback-menu-list">
                {sortListFeedback.length > 0 ? (
                    sortListFeedback.map((item) => (
                        <div className="admin-feedback-menu-list-item" key={item.id} onClick={() => openModal(item.message)}>
                            <div className="admin-feedback-menu-list-item-title">
                                {item.title}
                            </div>
                            <div className="admin-feedback-menu-list-item-date">
                                {parseDate(item.date)}
                            </div>
                            <div className="admin-feedback-menu-list-item-message" onClick={(e) => e.stopPropagation()}>
                                <img src={msgImg} alt="OMG" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="personal-orders-cat">
                        <div className="menu-list-img-cat">
                            <img src={imgCat} alt="Тут должно быть изображение:("/>
                            <div className="menu-list-img-cat-name">Обращений нет</div>
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-content-message">
                            {message}
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

export default AdminFeedback;
