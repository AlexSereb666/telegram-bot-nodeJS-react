import React, { useEffect, useState } from "react";
import './AddProduct.css';
import CustomInput from "../../components/customInput/CustomInput";
import ToggleCheckbox from "../../components/toggleCheckbox/ToggleCheckbox";
import CustomDropdown from "../../components/customDropdown/CustomDropdown";
import ImageUploader from '../../components/imageUploader/ImageUploader';
import ButtonItem from "../../components/buttonItem/ButtonItem"
import { getAllType } from "../../http/typeAPI";
import { getAllView } from "../../http/viewAPI";
import btnBack from '../../assets/img/button-back.png'
import MessageBox from "../../components/messageBox/MessageBox";
import { useNavigate } from 'react-router-dom';
import { addProduct } from "../../http/productAPI";

const AddProduct = () => {
    const navigate = useNavigate()

    const [nameProduct, setNameProduct] = useState("")
    const [priceProduct, setPriceProduct] = useState(0)

    const [selectedType, setSelectedType] = useState("")
    const [selectedView, setSelectedView] = useState("")

    const [listType, setListType] = useState([])
    const [listView, setListView] = useState([])

    const [uploadedImage, setUploadedImage] = useState(null);
    const [isCheckedBlock, setIsCheckedBlock] = useState(false)

    const [message, setMessage] = useState("")
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getAllView().then((items) => {
            setListView((prev) => [
                ...prev,
                ...items.map((item) => ({ id: item.id, name: item.name }))
            ]);
        });
    }, []);

    useEffect(() => {
        getAllType().then((items) => {
            setListType((prev) => [
                ...prev,
                ...items.map((item) => ({id: item.id, name: item.name }))
            ]);
        });
    }, []);

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

    const addNewProduct = () => {
        if (nameProduct === '') {
            setMessage("Введите имя продукта")
            setShowModal(true)
            return
        }

        const formData = new FormData()
        formData.append('name', nameProduct)
        formData.append('price', priceProduct)
        formData.append('block', isCheckedBlock)

        if (uploadedImage === null) {
            setMessage("Добавьте изображение продукта")
            setShowModal(true)
            return
        }
        formData.append('img', uploadedImage)

        const selectedTypeObject = listType.find(option => option.name === selectedType);
        if (selectedTypeObject) {
            const selectedTypeId = selectedTypeObject.id;
            formData.append('productTypeId', selectedTypeId)
        } else {
            setMessage("Выберите тип продукта")
            setShowModal(true)
            return
        }

        const selectedViewObject = listView.find(option => option.name === selectedView);
        if (selectedViewObject) {
            const selectedViewId = selectedViewObject.id;
            formData.append('productViewId', selectedViewId)
        } else {
            setMessage("Выберите вид продукта")
            setShowModal(true)
            return
        }

        addProduct(formData).then((item) => console.log.item)

        setMessage("Продукт успешно добавлен")
        setShowModal(true)

        setNameProduct("")
        setPriceProduct("0")
    }

    return (
        <div className="add-product-container">
            <div className="product-card-container-btn-back" onClick={() => navigate(-1)}>
                <img src={btnBack} alt="Ой, тут должна быть кнопка назад!" />
            </div>
            <CustomInput
                value={nameProduct}
                setValue={setNameProduct}
                label={"Имя продукта"}
            />
            <CustomInput
                value={priceProduct}
                setValue={setPriceProduct}
                label={"Цена продукта"}
                min={0}
                type="number"
            />
            <ToggleCheckbox
                label="Блокировка"
                isChecked={isCheckedBlock} 
                onToggle={() => setIsCheckedBlock(!isCheckedBlock)}
            />
            <CustomDropdown
                options={listType}
                onSelect={handleSelectType}
                text="Тип продукта"
                containerStyle={{ width: '320px' }}
            />
            <CustomDropdown
                options={listView}
                onSelect={handleSelectView}
                text="Вип продукта"
                containerStyle={{ width: '320px' }}
            />
            <ImageUploader
                onUpload={handleImageUpload}
            />
            <ButtonItem
                name="Добавить продукт"
                onClick={addNewProduct}
            />
            {showModal && (
                <MessageBox
                    onYes={closeModal}
                    textYes={"Ок"}
                    check={true}
                    oneButton={true}
                    message={message}
                />
            )}
        </div>
    )
}

export default AddProduct;
