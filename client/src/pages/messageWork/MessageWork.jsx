import React, { useEffect, useState, useCallback } from "react";
import './MessageWork.css';
import { useTelegram } from '../../hooks/useTelegram';

const MessageWork = () => {
    const [message, setMessage] = useState("")
    const { tg } = useTelegram();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSendData = useCallback(() => {
        const type = 'messageWork'
        const data = {
            type,
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
            text: 'Сделать рассылку',
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

    return (
        <div className="message-bot-container">
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

export default MessageWork;
