import React, { useEffect, useState } from "react";
import './AdminMenuEditUser.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, deleteUserById, updateData } from '../../http/userAPI';
import CustomInput from "../../components/customInput/CustomInput";
import CustomDropdown from '../../components/customDropdown/CustomDropdown';
import ButtonItem from "../../components/buttonItem/ButtonItem";
import btnBack from '../../assets/img/button-back.png'
import MessageBox from "../../components/messageBox/MessageBox";

const AdminMenuEditUser = () => {
    const { idUser, idUserEdit } = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState({})
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [role, setRole] = useState("")

    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState("")

    const listRole = [
        { id: 1, name: 'USER' },
        { id: 2, name: 'BARISTA' },
        { id: 3, name: 'COURIER' },
        { id: 4, name: 'ADMIN' }
    ]

    const initParam = () => {
        getUserById(idUserEdit).then((item) => setUser(item.user))
    }

    useEffect(() => {
        initParam()
    }, [])

    useEffect(() => {
        setName(user.name)
        setAddress(user.address)
        setRole(user.role)
    }, [user])

    const parseDate = (date) => {
        const originalDate = new Date(date);
        const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
            .toString().padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} ${originalDate.getHours()
                .toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}`;
        
        return formattedDate;
    }

    const handleSelectRole = (value) => {
        setRole(value)
    }

    const saveData = () => {
        updateData(user.telegramId, name, role, user.chatId, address)
        .then((item) => console.log(item))
    }

    const deleteUser = () => {
        deleteUserById(user.id).then((item) => console.log(item))
        navigate(-1)
    }

    const navigateMessage = (id) => {
        navigate(`/messageBot/${id}/${idUser}`)
    }

    return (
        <div className="admin-menu-edit-user">
            <div className="admin-menu-edit-user-btn-back" onClick={() => navigate(-1)}>
                <img src={btnBack} alt="Ой, тут должна быть кнопка назад!" />
            </div>
            <div className="admin-menu-edit-user-info">
                <div className="admin-menu-edit-user-info-telegramId">
                    id telegram: {user.telegramId}
                </div>
                <div className="admin-menu-edit-user-info-chatId">
                    id чата с ботом: {user.chatId}
                </div>
                <div className="admin-menu-edit-user-info-date-registration">
                    Дата регистрации: {parseDate(user.dateRegistration)}
                </div>
                <div className="admin-menu-edit-user-info-name">
                    <CustomInput
                        value={name}
                        setValue={setName}
                        label={"Имя пользователя"}
                    />
                </div>
                <div className="admin-menu-edit-user-info-address">
                    <CustomInput
                        value={address}
                        setValue={setAddress}
                        label={"Адрес доставки"}
                    />
                </div>
                <div className="admin-menu-edit-user-info-role">
                    <CustomDropdown
                        options={listRole}
                        onSelect={(value) => handleSelectRole(value)}
                        text="Роль"
                        containerStyle={{ width: '320px' }}
                        selectedItem={user.role}
                    />
                </div>
            </div>
            <div className="admin-menu-edit-user-menu-top">
                <div className="admin-menu-edit-user-message">
                    <ButtonItem
                        name="Отправить сообщение"
                        onClick={() => navigateMessage(user.id)}
                    />
                </div>
                <div className="admin-menu-edit-user-delete">
                    <ButtonItem
                        name="Удалить пользователя"
                        onClick={() => setShowModal(true)}
                    />
                </div>
            </div>
            <div className="admin-menu-edit-user-menu-bottom">
                <div className="admin-menu-edit-user-save">
                    <ButtonItem
                        name="Сохранить изменения"
                        onClick={saveData}
                    />
                </div>
                <div className="admin-menu-edit-user-reset">
                    <ButtonItem
                        name="Сбросить параметры"
                        onClick={initParam}
                    />
                </div>
            </div>
            {showModal && (
                <MessageBox
                    message="Вы уверены, что хотите удалить пользователя?"
                    check={true}
                    onYes={deleteUser}
                    onNo={() => setShowModal(false)}
                    textNo={"Нет"}
                    textYes={"Да"}
                />
            )}
        </div>
    )
}

export default AdminMenuEditUser;
