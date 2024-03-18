import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useTelegram } from '../../hooks/useTelegram';
import './MessageBot.css';
import { getUserById } from '../../http/userAPI';
import btnBack from '../../assets/img/button-back.png'

const MessageBot = () => {
    const { idUser } = useParams()
    const { idWorker } = useParams()
    const { tg } = useTelegram();

    const navigate = useNavigate()

    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')

    useEffect(() => {
        getUserById(idUser).then((item) => setUser(item.user))
    }, [])

    const backPage = () => {
        navigate(-1)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSendData = useCallback(() => {
        const type = 'message'
        const data = {
            type,
            idUser,
            message
        }
        tg.sendData(JSON.stringify(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить сообщение',
            color: '#24cc12'
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!message) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])

    const userRole = (role) => {
        switch (role) {
            case 'USER':
                return 'Пользователь';
            case 'BARISTA':
                return 'Бариста';
            case 'COURIER':
                return 'Курьер';
            case 'ADMIN':
                return 'Администратор';
            default:
                return 'Неизвестная роль';
        }
    }

    return (
        <div className="message-bot-container">
            <div className="message-bot-container-button-back" onClick={backPage}>
                <img src={btnBack} alt="Ой, тут должна быть кнопка назад!" />
            </div>
            <div className="message-bot-container-info-user">
                <div className="message-bot-container-info-user-name">
                    <span>Имя пользователя:</span> {user.name}
                </div>
                <div className="message-bot-container-info-user-role">
                    <span>Роль пользователя:</span> {userRole(user.role)}
                </div>
            </div>
            <div className="message-bot-container-textarea">
                <textarea
                    className="message-bot-container-textarea-ui"
                    placeholder="Введите сообщение..."
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
            </div>
        </div>
    )
}

export default MessageBot;
