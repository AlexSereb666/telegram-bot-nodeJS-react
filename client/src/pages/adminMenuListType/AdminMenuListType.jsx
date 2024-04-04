import React, { useEffect, useState } from "react";
import './AdminMenuListType.css';
import CustomInput from "../../components/customInput/CustomInput";
import { useNavigate } from 'react-router-dom';
import btnBack from '../../assets/img/button-back.png'
import imgCat from '../../assets/img/cat.png'
import deleteImg from '../../assets/img/delete.png'
import ButtonItem from "../../components/buttonItem/ButtonItem"
import MessageBox from "../../components/messageBox/MessageBox";
import { getAllType, updateType, deleteType, addType } from "../../http/typeAPI";

const AdminMenuListType = () => {
    const navigate = useNavigate()

    const [searchName, setSearchName] = useState("")
    const [name, setName] = useState("")

    const [listType, setListType] = useState([])
    const [sortListType, setSortListType] = useState([])

    const [selectId, setSelectId] = useState(0)

    const [showModal, setShowModal] = useState(false)

    const [flag, setFlag] = useState(0)

    useEffect(() => {
        getAllType().then((item) => setListType(item))
    }, [])

    useEffect(() => {
        setSortListType(listType)
    }, [listType])

    useEffect(() => {
        const filteredTypes = listType.filter(item => {
            const nameCondition = searchName ? item.name.toLowerCase().includes(searchName.toLowerCase()) : true;
            return nameCondition;
        });
    
        setSortListType(filteredTypes)
    }, [searchName])

    const addTypeModal = () => {
        setFlag(1)
        setShowModal(true)
    }

    const editTypeModal = (id) => {
        setName("")
        setSelectId(id)
        setFlag(0)
        setShowModal(true)
    }

    const addNewType = () => {
        if (name !== '') {
            addType(name).then((item) => console.log(item))
        }
        setShowModal(false)
        window.location.reload()
    } 

    const editType = () => {
        if (name !== '') {
            updateType(selectId, name)
            .then((item) => console.log(item))
        }
        setShowModal(false)
        window.location.reload()
    }

    const deleteTypeById = (id) => {
        deleteType(id).then((item) => console.log(item))
        window.location.reload()
    }

    return (
        <div className="admin-menu-list-type">  
            <div className="admin-menu-list-type-menu">
                <div className="product-card-container-btn-back" onClick={() => navigate(-1)}>
                    <img src={btnBack} alt="Ой, тут должна быть кнопка назад!" />
                </div>
                <CustomInput
                    value={searchName}
                    setValue={setSearchName}
                    label={"Тип продукта"}
                />
                <ButtonItem
                    name="Добавить тип"
                    onClick={addTypeModal}
                />
            </div>
            <div className="admin-menu-list-type-list">
                {sortListType.length > 0 ? (
                    sortListType.map((item) => (
                        <div className="admin-menu-list-type-list-item" onClick={() => editTypeModal(item.id)}>
                            <div className="admin-menu-list-type-list-item-name">
                                {item.name}
                            </div>
                            <div className="admin-menu-list-type-list-item-delete" onClick={(e) => e.stopPropagation()}>
                                <img src={deleteImg} alt="Нет изображения" onClick={() => deleteTypeById(item.id)} />
                            </div>
                        </div>
                    ))
                ): (
                    <div className="personal-orders-cat">
                        <div className="menu-list-img-cat">
                            <img src={imgCat} alt="Тут должно быть изображение:("/>
                            <div className="menu-list-img-cat-name">Типы не найдены</div>
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <MessageBox
                    check={false}
                    onYes={flag ? addNewType : editType}
                    onNo={() => setShowModal(false)}
                    textNo={"Нет"}
                    textYes={"Да"}
                    inputValue={name}
                    setInputValue={setName}
                    label="Наименование типа"
                />
            )}
        </div>
    )
}

export default AdminMenuListType;
