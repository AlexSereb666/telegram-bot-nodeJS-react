import React, { useState } from "react";
import './ScheduleMaintenance.css'
import CustomInput from "../../components/customInput/CustomInput";
import DateTimePicker from "../../components/dateTimePicker/DateTimePicker";
import ButtonItem from "../../components/buttonItem/ButtonItem";
import { addMaintenance } from "../../http/maintenanceAPI";
import { useNavigate } from 'react-router-dom';

const ScheduleMaintenance = () => {
    const [heading, setHeading] = useState('')
    const [from, setFrom] = useState('')
    const [before, setBefore] = useState('')
    const [desc, setDesc] = useState('')
    const [notes, setNotes] = useState('')

    const navigate = useNavigate()

    const addHistory = () => {
        addMaintenance(heading, desc, notes, 'Запланирован', from, before).then((item) => console.log(item))
    }

    return (
        <div className="scheduleMaintenance">
            <div className="scheduleMaintenance-heading">
                <CustomInput
                    label="Заголовок"
                    value={heading}
                    setValue={setHeading}
                />
            </div>
            <div className="scheduleMaintenance-from">
                <DateTimePicker
                    defaultDate={from}
                    onDateChange={(date) => setFrom(date)}
                    label="От: "
                />
            </div>
            <div className="scheduleMaintenance-before">
                <DateTimePicker
                    defaultDate={before}
                    onDateChange={(date) => setBefore(date)}
                    label="До: "
                />
            </div>
            <div className="scheduleMaintenance-description">
                <textarea
                    className="scheduleMaintenance-description-textarea"
                    placeholder="Описание"
                    value={desc}
                    onChange={(e) => {
                        setDesc(e.target.value);
                    }}
                />
            </div>
            <div className="scheduleMaintenance-notes">
                <textarea
                    className="scheduleMaintenance-notes-textarea"
                    placeholder="Примечания"
                    value={notes}
                    onChange={(e) => {
                        setNotes(e.target.value);
                    }}
                />
            </div>
            <div className="scheduleMaintenance-btns">
                <div className="scheduleMaintenance-btns-message">
                    <ButtonItem
                        name="Массовая рассылка"
                        onClick={() => navigate('/messageWork')}
                    />
                </div>
                <div className="scheduleMaintenance-btns-save">
                    <ButtonItem
                        name="Запланировать"
                        onClick={addHistory}
                    />
                </div>
            </div> 
        </div>
    )
}

export default ScheduleMaintenance;
