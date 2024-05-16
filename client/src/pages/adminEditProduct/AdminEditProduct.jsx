import React, { useEffect, useState } from "react";
import './AdminEditProduct.css';
import { useParams, useNavigate } from "react-router-dom";
import btnBack from '../../assets/img/button-back.png'
import { getOne, editProduct, getDesc, editDesc, deleteDesc, createDescription } from "../../http/productAPI";
import CustomInput from "../../components/customInput/CustomInput";
import ToggleCheckbox from "../../components/toggleCheckbox/ToggleCheckbox";
import CustomDropdown from "../../components/customDropdown/CustomDropdown";
import ImageUploader from '../../components/imageUploader/ImageUploader';
import ButtonItem from "../../components/buttonItem/ButtonItem"
import { getAllType, getOneType } from "../../http/typeAPI";
import { getAllView, getOneView } from "../../http/viewAPI";
import MessageBox from "../../components/messageBox/MessageBox";
import deleteImg from '../../assets/img/delete.png'

const AdminEditProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState({})

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)

    const [selectedType, setSelectedType] = useState("")
    const [selectedView, setSelectedView] = useState("")

    const [listType, setListType] = useState([])
    const [listView, setListView] = useState([])

    const [uploadedImage, setUploadedImage] = useState(null);
    const [isCheckedBlock, setIsCheckedBlock] = useState(false)

    const [message, setMessage] = useState("")
    const [showModal, setShowModal] = useState(false)

    const [listDesc, setListDesc] = useState([])
    const [showDescModal, setShowDescModal] = useState(false)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [selectDesc, setSelectDesc] = useState(0)

    const initDesc = () => {
        getDesc(id).then((item) => setListDesc(item))
    }

    useEffect(() => {
        initDesc()
    }, [])

    useEffect(() => {
        getOne(id).then((item) => setProduct(item))
    }, [])

    useEffect(() => {
        getAllType().then((items) => {
            setListType((prev) => [
                ...prev,
                ...items.map((item) => ({id: item.id, name: item.name }))
            ]);
        });
    }, []);

    useEffect(() => {
        getAllView().then((items) => {
            setListView((prev) => [
                ...prev,
                ...items.map((item) => ({ id: item.id, name: item.name }))
            ]);
        });
    }, []);

    useEffect(() => {
        if (product && product.id) {
            setName(product.name)
            setPrice(product.price)
            getOneType(product.productTypeId).then((item) => setSelectedType(item.name))
            getOneView(product.productViewId).then((item) => setSelectedView(item.name))
        }
    }, [product]);   

    const handleSelectType = (value) => {
        setSelectedType(value)
    }

    const handleSelectView = (value) => {
        setSelectedView(value)
    }

    const handleImageUpload = (imageData) => {
        setUploadedImage(imageData);
    };

    const closeModal = () => {
        setShowModal(false)
    }

    const updateProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('block', isCheckedBlock)
        formData.append('img', uploadedImage)

        const selectedTypeObject = listType.find(option => option.name === selectedType);
        if (selectedTypeObject) {
            const selectedTypeId = selectedTypeObject.id;
            formData.append('productTypeId', selectedTypeId)
        }

        const selectedViewObject = listView.find(option => option.name === selectedView);
        if (selectedViewObject) {
            const selectedViewId = selectedViewObject.id;
            formData.append('productViewId', selectedViewId)
        }

        editProduct(formData, id).then((item) => console.log(item))

        setMessage("Продукт успешно изменен")
        setShowModal(true)
    }

    const editDeskModal = (_id, _title, _desc) => {
        setSelectDesc(_id)
        setTitle(_title)
        setDesc(_desc)

        setShowDescModal(true)
    }

    const editDesk = () => {
        editDesc(id, selectDesc, title, desc).then((item) => initDesc())

        setShowDescModal(false)
    }

    const closeModalFunc = () => {
        setSelectDesc(0)
        setShowDescModal(false)
    }

    const addNewDescModal = () => {
        setTitle("")
        setDesc("")
        setShowDescModal(true)
    }

    const addNewDesc = () => {
        createDescription(id, title, desc).then((item) => initDesc())
        setShowDescModal(false)
    }

    const delDesc = (id) => {
        deleteDesc(id).then((item) => initDesc())
    }

    return (
        <div className="admin-edit-product-container">
            <div className="admin-edit-product-container-info">
                <div className="product-card-container-btn-back" onClick={() => navigate(-1)}>
                    <img src={btnBack} alt="Ой, тут должна быть кнопка назад!" />
                </div>
                <div className="admin-edit-product-container-info-img">
                    <img src={process.env.REACT_APP_API_URL + product.img} alt="Ой, тут должна быть картинка продукта!" />
                </div>
                <div className="admin-edit-product-container-info-name">
                    <CustomInput
                        value={name}
                        setValue={setName}
                        label={"Имя продукта"}
                    />
                </div>
                <div className="admin-edit-product-container-info-price">
                    <CustomInput
                        value={price}
                        setValue={setPrice}
                        label={"Цена продукта"}
                        min={0}
                        type="number"
                    />
                </div>
                <div className="admin-edit-product-container-info-type">
                    <CustomDropdown
                        options={listType}
                        onSelect={handleSelectType}
                        text="Тип продукта"
                        containerStyle={{ width: '320px' }}
                        selectedItem={selectedType}
                    />
                </div>
                <div className="admin-edit-product-container-info-view">
                    <CustomDropdown
                        options={listView}
                        onSelect={handleSelectView}
                        text="Вид продукта"
                        containerStyle={{ width: '320px' }}
                        selectedItem={selectedView}
                    />
                </div>
                <div className="admin-edit-product-container-info-block">
                    <ToggleCheckbox
                        label="Блокировка"
                        isChecked={isCheckedBlock} 
                        onToggle={() => setIsCheckedBlock(!isCheckedBlock)}
                    />
                </div>
                <div className="admin-edit-product-container-info-img-loader">
                    <ImageUploader
                        onUpload={handleImageUpload}
                    />
                </div>
                <div className="admin-edit-product-container-info-buttons">
                    <ButtonItem
                        name="Сохранить изменения"
                        onClick={updateProduct}
                    />
                    <ButtonItem
                        name="Добавить описание"
                        onClick={addNewDescModal}
                    />
                </div>
            </div>
            <div className="admin-edit-product-container-list-desc">
                {listDesc.length > 0 && (
                    listDesc.map((item) => (
                        <div className="admin-edit-product-container-list-desc-item" key={item.id} onClick={() => editDeskModal(item.id, item.title, item.description)}>
                            <div className="admin-edit-product-container-list-desc-item-title">
                                {item.title}
                            </div>
                            <div className="admin-menu-list-product-container-list-item-delete" onClick={(e) => e.stopPropagation()}>
                                <img src={deleteImg} alt="Нет изображения" onClick={() => delDesc(item.id)}/>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {showModal && (
                <MessageBox
                    onYes={closeModal}
                    textYes={"Ок"}
                    check={true}
                    oneButton={true}
                    message={message}
                />
            )}
            {showDescModal && (
                <div className="modal-desc">
                    <div className="modal-content-desc">
                        <CustomInput
                            value={title}
                            setValue={setTitle}
                            label={"Заголовок описания"}
                        />
                        <div className="modal-content-desc-textarea">
                            <textarea
                                placeholder="Описание"
                                value={desc}
                                onChange={(e) => {
                                    setDesc(e.target.value);
                                }}
                            />
                        </div>
                        <div className="modal-content-desc-button">
                            <ButtonItem
                                name="Отмена"
                                onClick={closeModalFunc}
                            />
                            <ButtonItem
                                name={selectDesc ? "Сохранить изменения" : "Добавить"}
                                onClick={selectDesc 
                                    ? () => editDesk() 
                                    : () => addNewDesc()
                                }
                            />
                        </div>
                    </div>
              </div>
            )}
        </div>
    )
}

export default AdminEditProduct;
