import React, { useState, useCallback, useEffect } from "react";
import './StatisticAdmin.css';
import CustomDropdown from '../../components/customDropdown/CustomDropdown';
import DateTimePicker from "../../components/dateTimePicker/DateTimePicker";
import { useTelegram } from '../../hooks/useTelegram';

const StatisticAdmin = () => {
    const [selectType, setSelectType] = useState("")
    const { tg } = useTelegram();

    const [selectedDateFrom, setSelectedDateFrom] = useState("")
    const [selectedDateBefore, setSelectedDateBefore] = useState("")

    const listType = [
        {id: 1, name: 'Продажи'},
        {id: 2, name: 'Продукты'},
        {id: 3, name: 'Клиенты'},
        {id: 4, name: 'Сотрудники'},
    ]

    const handleSelectType = (value) => {
        setSelectType(value)
    }

    const handleDateChangeFrom = (date) => {
        setSelectedDateFrom(date);
    };

    const handleDateChangeBefore = (date) => {
        setSelectedDateBefore(date);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSendData = useCallback(() => {
        const type = selectType
        const data = {
            type,
            from: selectedDateFrom,
            before: selectedDateBefore,
        }
        tg.sendData(JSON.stringify(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectType])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectType])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Выслать отчет',
            color: '#24cc12'
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!selectType) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectType])

    return (
        <div className="statistic">
            <div className="statistic-date">
                <div className="statistic-date-from">
                    <DateTimePicker
                        defaultDate={selectedDateFrom}
                        onDateChange={handleDateChangeFrom}
                        label="От: "
                    />
                </div>
                <div className="statistic-date-before">
                    <DateTimePicker
                        defaultDate={selectedDateBefore}
                        onDateChange={handleDateChangeBefore}
                        label="До: "
                    />
                </div>
            </div>
            <div className="statistic-type">
                <CustomDropdown
                    options={listType}
                    onSelect={handleSelectType}
                    text="Тип..."
                    containerStyle={{ width: '240px' }}
                />
            </div>
        </div>
    )
}

export default StatisticAdmin;
