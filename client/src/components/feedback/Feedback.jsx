import React, { useState } from "react";
import './Feedback.css';
import CustomDropdown from "../customDropdown/CustomDropdown";

const Feedback = () => {
    const listThemes = [
        {id: 1, name: 'Технические ошибки'},
        {id: 2, name: 'Оплата'},
        {id: 3, name: 'Личные данные'},
        {id: 4, name: 'Оплата'},
        {id: 4, name: 'Другое'},
    ]

    const [message, setMessage] = useState('');
    const [selectProblem, setSelectProblem] = useState("")

    const handleSelectProblem= (value) => {
        setSelectProblem(value)
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
