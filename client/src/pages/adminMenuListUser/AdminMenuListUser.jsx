import React, { useEffect, useState } from "react";
import './AdminMenuListUser.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getAll } from '../../http/userAPI'
import CustomInput from "../../components/customInput/CustomInput";
import CustomDropdown from '../../components/customDropdown/CustomDropdown';
import imgCat from '../../assets/img/cat.png'

const AdminMenuListUser = () => {
    const { idUser } = useParams()
    const navigate = useNavigate()

    const [listUser, setListUser] = useState([])
    const [sortedListUser, setSortedListUser] = useState([])

    const [searchName, setSearchName] = useState("")
    const [searchId, setSearchId] = useState("")

    const [selectedRole, setSelectedRole] = useState("")
    const listRole = [
        { id: 1, name: 'Все' },
        { id: 2, name: 'USER' },
        { id: 3, name: 'BARISTA' },
        { id: 4, name: 'COURIER' },
        { id: 5, name: 'ADMIN' }
    ]

    const handleSelectRole = (value) => {
        setSelectedRole(value)
    }

    useEffect(() => {
        getAll().then((item) => setListUser(item.users))
    }, [])

    useEffect(() => {
        setSortedListUser(listUser)
    }, [listUser])

    useEffect(() => {
        let filteredUsers = listUser;
    
        if (selectedRole !== "Все") {
            filteredUsers = filteredUsers.filter(user => user.role === selectedRole);
        }
    
        if (searchName !== "") {
            filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()));
        }
    
        if (searchId !== "") {
            filteredUsers = filteredUsers.filter(user => user.telegramId.includes(searchId));
        }
    
        setSortedListUser(filteredUsers);
    }, [searchName, searchId, selectedRole])

    return (
        <div className="admin-menu-list-user-container">
            <div className="admin-menu-list-user-container-menu">
                <div className="admin-menu-list-user-container-menu-search-name">
                    <CustomInput
                        value={searchName}
                        setValue={setSearchName}
                        label={"Имя пользователя"}
                    />
                </div>
                <div className="admin-menu-list-user-container-menu-search-telegram">
                    <CustomInput
                        value={searchId}
                        setValue={setSearchId}
                        label={"Id telegram"}
                    />
                </div>
                <div className="admin-menu-list-user-container-menu-search-role">
                    <CustomDropdown
                        options={listRole}
                        onSelect={(value) => handleSelectRole(value)}
                        text="Роль"
                        containerStyle={{ width: '320px' }}
                    />
                </div>
            </div>
            <div className="admin-menu-list-user-container-list">
                {sortedListUser.length > 0 ? (sortedListUser.map((item, index) => (
                        <div className="admin-menu-list-user-container-list-item" key={index} onClick={() => navigate(`/adminEditUser/${idUser}/${item.id}`)}>
                            <div className="admin-menu-list-user-container-list-item-name">
                                {item.name}
                            </div>
                            <div className="admin-menu-list-user-container-list-item-telegramId">
                                {item.telegramId}
                            </div>
                            <div className="admin-menu-list-user-container-list-item-role">
                                {item.role}
                            </div>
                        </div>
                    )) 
                ) : (
                    <div className="personal-orders-cat">
                        <div className="menu-list-img-cat">
                            <img src={imgCat} alt="Тут должно быть изображение:("/>
                            <div className="menu-list-img-cat-name">Пользователи не найдены</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminMenuListUser;
