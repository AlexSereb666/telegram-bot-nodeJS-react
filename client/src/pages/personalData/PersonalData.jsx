import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import './PersonalData.css';
import ButtonItem from '../../components/buttonItem/ButtonItem';
import CustomInput from '../../components/customInput/CustomInput'
import { getUserById, updateUserAddress, getOneFeedbackUser } from '../../http/userAPI';
import MessageBoxList from "../../components/messageBoxList/MessageBoxList";

const PersonalData = () => {
    const { idUser } = useParams();

    const [user, setUser] = useState({});
    const [listFeedback, setListFeedback] = useState([]);

    const [address, setAddress] = useState('');
    const [hasFocus, setHasFocus] = useState(false);

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getUserById(idUser).then((item) => setUser(item.user))
    }, [idUser])

    useEffect(() => {
        setAddress(user.address)
        getOneFeedbackUser(idUser).then((item) => setListFeedback(item.Feedbacks))
    }, [user])

    useEffect(() => {
        if (!hasFocus) {
          if (address && address !== user.address) {
            updateUserAddress(idUser, address).then(item => console.log(item.message))
          } else {
            setAddress(user.address)
          }
        }
    }, [hasFocus]);

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div className="personal-data-container">
            <div className="personal-data-container-info">
                <div className="personal-data-container-info-tl">
                    Личные данные пользователя
                </div>
                <div className="personal-data-container-info">
                    <div className="personal-data-container-info-name">
                        <div className="personal-data-container-info-title">
                            Имя:
                        </div>
                        <div className="personal-data-container-info-description">
                            {user.name};
                        </div>
                    </div>
                    <div className="personal-data-container-info-telegram">
                        <div className="personal-data-container-info-title">
                            id телеграмма:
                        </div>
                        <div className="personal-data-container-info-description">
                            {user.telegramId};
                        </div>
                    </div>
                    <div className="personal-data-container-info-role">
                        <div className="personal-data-container-info-title">
                            Роль:
                        </div>
                        <div className="personal-data-container-info-description">
                            {user.role};
                        </div>
                    </div>
                    <div className="personal-data-container-info-address">
                        <CustomInput
                            value={address}
                            setValue={setAddress}
                            label={"Адрес доставки"}
                            onFocus={() => setHasFocus(true)}
                            onBlur={() => setHasFocus(false)}
                        />
                    </div>
                </div>
                <div className="personal-data-container-info-edit-feedback">
                    <ButtonItem
                        name={"Мои обращения в Тех. поддержку"}
                        onClick={openModal}
                    />
                </div>
            </div>
            {showModal && (
                <MessageBoxList
                    onOk={closeModal}
                    textOk={"Закрыть"}
                    list={listFeedback}
                />
            )} 
        </div>
    )
}

export default PersonalData;
