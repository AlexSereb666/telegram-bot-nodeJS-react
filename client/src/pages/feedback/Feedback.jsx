import React, { useEffect, useState, useCallback } from "react";
import './Feedback.css';
import CustomDropdown from "../../components/customDropdown/CustomDropdown";
import { useTelegram } from '../../hooks/useTelegram'

const Feedback = () => {
    const listThemes = [
        {id: 1, name: 'Технические ошибки'},
        {id: 2, name: 'Личные данные'},
        {id: 3, name: 'Оплата'},
        {id: 4, name: 'Другое'},
    ]

    const { tg } = useTelegram();

    const [message, setMessage] = useState('');
    const [selectProblem, setSelectProblem] = useState("")

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSendData = useCallback(() => {
        const type = 'feedback'
        const data = {
            type,
            selectProblem,
            message
        }
        tg.sendData(JSON.stringify(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, selectProblem])

    // пример передачи данных через url //
    /*useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userDataParam = params.get('userData');
        if (userDataParam) {
            const userData = JSON.parse(decodeURIComponent(userDataParam));
            setMessage(userData);
        }
    }, []);*/

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, selectProblem])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить сообщение',
            color: '#24cc12'
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!message || !selectProblem) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, selectProblem])

    const handleSelectProblem= (value) => {
        setSelectProblem(value)
        console.log(selectProblem)
    };

    return (
        <div className="feedback-container">
            <div className="feedback-container__title">
                Обратная связь
            </div>
            <div className="feedback-container__title-input">
                <CustomDropdown
                    options={listThemes}
                    onSelect={handleSelectProblem}
                    text="Выберите тему..."
                />
            </div>
            <div className="feedback-container__message-textarea">
                <textarea
                    className="feedback-container__message-textarea__textarea"
                    placeholder="Опишите проблему..."
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
            </div>
        </div>
    )
}

export default Feedback;
