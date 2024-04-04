import React, { useEffect, useState } from "react";
import './AdminMenuListView.css';
import CustomInput from "../../components/customInput/CustomInput";
import { useNavigate } from 'react-router-dom';
import btnBack from '../../assets/img/button-back.png'
import imgCat from '../../assets/img/cat.png'
import deleteImg from '../../assets/img/delete.png'
import ButtonItem from "../../components/buttonItem/ButtonItem"
import MessageBox from "../../components/messageBox/MessageBox";
import { getAllView, updateView, deleteView, addView } from "../../http/viewAPI";

const AdminMenuListView = () => {
    const navigate = useNavigate()

    const [searchName, setSearchName] = useState("")
    const [name, setName] = useState("")

    const [listView, setListView] = useState([])
    const [sortListView, setSortListView] = useState([])

    const [selectId, setSelectId] = useState(0)

    const [showModal, setShowModal] = useState(false)

    const [flag, setFlag] = useState(0)

    useEffect(() => {
        getAllView().then((item) => setListView(item))
    }, [])

    useEffect(() => {
        setSortListView(listView)
    }, [listView])

    useEffect(() => {
        const filteredViews = listView.filter(product => {
            const nameCondition = searchName ? product.name.toLowerCase().includes(searchName.toLowerCase()) : true;
            return nameCondition;
        });
    
        setSortListView(filteredViews)
    }, [searchName])

    const addViewModal = () => {
        setFlag(1)
        setShowModal(true)
    }

    const editViewModal = (id) => {
        setName("")
        setSelectId(id)
        setFlag(0)
        setShowModal(true)
    }

    const addNewView = () => {
        if (name !== '') {
            addView(name).then((item) => console.log(item))
        }
        setShowModal(false)
        window.location.reload()
    } 

    const editView = () => {
        if (name !== '') {
            updateView(selectId, name)
            .then((item) => console.log(item))
        }
        setShowModal(false)
        window.location.reload()
    }

    const deleteViewById = (id) => {
        deleteView(id).then((item) => console.log(item))
        window.location.reload()
    }

    return (
        <div className="admin-menu-list-view">  
            <div className="admin-menu-list-view-menu">
                <div className="product-card-container-btn-back" onClick={() => navigate(-1)}>
                    <img src={btnBack} alt="Ой, тут должна быть кнопка назад!" />
                </div>
                <CustomInput
                    value={searchName}
                    setValue={setSearchName}
                    label={"Вид продукта"}
                />
                <ButtonItem
                    name="Добавить вид"
                    onClick={addViewModal}
                />
            </div>
            <div className="admin-menu-list-view-list">
                {sortListView.length > 0 ? (
                    sortListView.map((item) => (
                        <div className="admin-menu-list-view-list-item" onClick={() => editViewModal(item.id)}>
                            <div className="admin-menu-list-view-list-item-name">
                                {item.name}
                            </div>
                            <div className="admin-menu-list-view-list-item-delete" onClick={(e) => e.stopPropagation()}>
                                <img src={deleteImg} alt="Нет изображения" onClick={() => deleteViewById(item.id)} />
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
                    onYes={flag ? addNewView : editView}
                    onNo={() => setShowModal(false)}
                    textNo={"Нет"}
                    textYes={"Да"}
                    inputValue={name}
                    setInputValue={setName}
                    label="Наименование вида"
                />
            )}
        </div>
    )
}

export default AdminMenuListView;
