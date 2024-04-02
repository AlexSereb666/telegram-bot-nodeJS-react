import React, { useState, useEffect } from "react";
import './AdminMenuListProduct.css';
import { useNavigate } from 'react-router-dom';
import CustomInput from "../../components/customInput/CustomInput";
import CustomDropdown from '../../components/customDropdown/CustomDropdown';
import imgCat from '../../assets/img/cat.png'
import { getAll, deleteProduct } from '../../http/productAPI'
import { getOneType } from '../../http/typeAPI'
import { getOneView } from '../../http/viewAPI'
import deleteImg from '../../assets/img/delete.png'
import ButtonItem from "../../components/buttonItem/ButtonItem"
import MessageBox from "../../components/messageBox/MessageBox";

const AdminMenuListProduct = () => {
    const navigate = useNavigate()

    const [listType, setListType] = useState([])
    const [listView, setListView] = useState([])

    const [selectType, setSelectType] = useState("")
    const [selectView, setSelectView] = useState("")

    const [searchName, setSearchName] = useState("")

    const [listProduct, setListProduct] = useState([])
    const [sortListProduct, setSortListProduct] = useState([])

    const [selectedIdProductDelete, setSelectedIdProductDelete] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const initList = () => {
        try {
            getAll().then((items) => {
                setListProduct(items);
                setSortListProduct(items)
            });
        } catch (e) {
            console.log("Ошибка запроса к серверу")
        }
        setSelectType('Все')
        setSelectView('Все')
    }

    useEffect(() => {
        initList()
    }, []);

    const handleSelectType= (value) => {
        setSelectType(value)
    };

    const handleSelectView= (value) => {
        setSelectView(value)
    };

    useEffect(() => {
        setListView([])
        if (selectType === 'Все') {
            const fetchData = async () => {
                try {
                    const items = await getAll();
                    setListProduct(items.filter(item => !item.block));
    
                    const uniqueViews = [...new Set(items.map(product => product.productViewId))];
                    const viewsPromises = uniqueViews.map(getOneView);
                    const views = await Promise.all(viewsPromises);
    
                    setListView([{ id: 0, name: 'Все' }, ...views.map(item => ({ id: item.id, name: item.name }))]);
                } catch (error) {
                    console.error("Ошибка загрузки данных:", error);
                }
            };
    
            fetchData();
        } else {
            setListView([{id: 0, name: 'Все'}]);
            const item = listType.find(type => type.name === selectType);
            const filteredProducts = listProduct.filter(product => product.productTypeId === item.id);
            const uniqueProductViewIds = [...new Set(filteredProducts.map(product => product.productViewId))];
    
            Promise.all(uniqueProductViewIds.map(getOneView))
                .then(views => {
                    const newListViewItems = views.map(view => ({ id: view.id, name: view.name }));
                    setListView(prevListView => [...prevListView, ...newListViewItems]);
                })
                .catch(error => {
                    console.error("Ошибка загрузки данных:", error);
                });
        }
        setSelectView('Все')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectType]);

    useEffect(() => {
        setListView([{id: 0, name: 'Все'}])
        const fetchData = async () => {
            try {
                const items = await getAll();
                setListProduct(items.filter(item => !item.block));

                const uniqueTypes = [...new Set(items.map(product => product.productTypeId))];
                const typesPromises = uniqueTypes.map(getOneType);
                const types = await Promise.all(typesPromises);
    
                setListType([{ id: 0, name: 'Все' }, ...types.map(item => ({ id: item.id, name: item.name }))]);
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };
    
        fetchData();
    }, []);

    const sortedProduct = async () => {
        const idType = listType.find(type => type.name === selectType)?.id;
        const idView = listView.find(view => view.name === selectView)?.id;
    
        const filteredProducts = listProduct.filter(product => {
            const typeCondition = idType ? product.productTypeId === idType : true;
            const viewCondition = idView ? product.productViewId === idView : true;
            const nameCondition = searchName ? product.name.toLowerCase().includes(searchName.toLowerCase()) : true;
            return typeCondition && viewCondition && nameCondition;
        });
    
        setSortListProduct(filteredProducts)
    };

    useEffect(() => {
        sortedProduct()
    }, [selectView, selectType, searchName])

    const deleteProductOnClick = (id) => {
        setSelectedIdProductDelete(id)
        setShowModal(true)
    }

    const deleteProductFunc = () => {
        deleteProduct(selectedIdProductDelete).then((item) => console.log(item))
        setShowModal(false)
        window.location.reload()
    }

    return (
        <div className="admin-menu-list-product-container">
            <div className="admin-menu-list-product-container-menu">
                <div className="admin-menu-list-product-container-menu-search">
                    <CustomInput
                        value={searchName}
                        setValue={setSearchName}
                        label={"Имя продукта"}
                    />
                </div>
                <div className="admin-menu-list-product-container-menu-filter">
                    <div className="admin-menu-list-product-container-menu-filter-type">
                        <CustomDropdown
                            options={listType}
                            onSelect={handleSelectType}
                            text="Тип..."
                            containerStyle={{ width: '155px' }}
                            selectedItem={selectType}
                        />
                    </div>
                    <div className="admin-menu-list-product-container-menu-filter-view">
                        <CustomDropdown
                            options={listView}
                            onSelect={handleSelectView}
                            text="Вид..."
                            containerStyle={{ width: '155px' }}
                            selectedItem={selectView}
                        />
                    </div>
                </div>
                <div className="admin-menu-list-product-container-menu-button">
                    <div className="admin-menu-list-product-container-menu-button-type">
                        <ButtonItem
                            name="Типы"
                        />
                    </div>
                    <div className="admin-menu-list-product-container-menu-button-view">
                        <ButtonItem
                            name="Виды"
                        />
                    </div>
                    <div className="admin-menu-list-product-container-menu-button-product">
                        <ButtonItem
                            name="Добавить продукт"
                        />
                    </div>
                </div>
            </div>
            <div className="admin-menu-list-product-container-list">
                {sortListProduct.length > 0 ? (
                    sortListProduct.map((item) => (
                        <div className="admin-menu-list-product-container-list-item" key={item.id}>
                            <div className="admin-menu-list-product-container-list-item-img">
                                <img src={process.env.REACT_APP_API_URL + item.img} alt="not found img" />
                            </div>
                            <div className="admin-menu-list-product-container-list-item-name">
                                {item.name}
                            </div>
                            <div className="admin-menu-list-product-container-list-item-block">
                                {item.block ? 'Закрыт' : 'Открыт'}
                            </div>
                            <div className="admin-menu-list-product-container-list-item-price">
                                {item.price}₽
                            </div>
                            <div className="admin-menu-list-product-container-list-item-delete" onClick={(e) => e.stopPropagation()}>
                                <img src={deleteImg} alt="Нет изображения" onClick={() => deleteProductOnClick(item.id)}/>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="personal-orders-cat">
                        <div className="menu-list-img-cat">
                            <img src={imgCat} alt="Тут должно быть изображение:("/>
                            <div className="menu-list-img-cat-name">Продукты не найдены</div>
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <MessageBox
                    message="Вы уверены, что хотите удалить продукт?"
                    check={true}
                    onYes={deleteProductFunc}
                    onNo={() => setShowModal(false)}
                    textNo={"Нет"}
                    textYes={"Да"}
                />
            )}
        </div>
    )
}

export default AdminMenuListProduct;
