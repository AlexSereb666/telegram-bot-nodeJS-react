import React, { useState, useEffect, useCallback } from "react";
import { useTelegram } from '../../hooks/useTelegram';
import CustomDropdown from "../customDropdown/CustomDropdown";
import './ListMenu.css'
import ItemMenu from "../itemMenu/ItemMenu";
import { getAll } from '../../http/productAPI'
import { getOneType } from '../../http/typeAPI'
import { getOneView } from '../../http/viewAPI'
import imgCat from '../../assets/img/cat.png'

const ListMenu = () => {
    const { tg } = useTelegram();

    const [selectType, setSelectType] = useState("")
    const [selectView, setSelectView] = useState("")

    const [cartItems, setCartItems] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [sortListProducts, setSortListProducts] = useState([])
    const [listType, setListType] = useState([])
    const [listView, setListView] = useState([])

    const [userId, setUserId] = useState(new URLSearchParams(window.location.search).get('idUser'))

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.count * item.price;
        });
        return totalPrice;
    }

    const onSendData = useCallback(() => {
        const type = 'menuProducts'
        const data = { type, cartItems }
        tg.sendData(JSON.stringify(data))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems])

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
        sortedProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectView, selectType])

    const sortedProduct = async () => {
        // Получаем id выбранных фильтров
        const idType = listType.find(type => type.name === selectType)?.id;
        const idView = listView.find(view => view.name === selectView)?.id;
    
        // Фильтруем продукты в соответствии с выбранными фильтрами
        const filteredProducts = listProduct.filter(product => {
            // Если выбран тип и он не "Все", проверяем соответствие по типу
            const typeCondition = idType ? product.productTypeId === idType : true;
            // Если выбран вид и он не "Все", проверяем соответствие по виду
            const viewCondition = idView ? product.productViewId === idView : true;
            // Возвращаем true только если оба условия выполняются
            return typeCondition && viewCondition;
        });
    
        setSortListProducts(filteredProducts)
    };

    useEffect(() => {
        tg.MainButton.setParams({
            text: `Добавить в корзину ${calculateTotalPrice()} ₽`,
            color: '#24cc12'
        })

        if (cartItems.length > 0) {
            tg.MainButton.show()
        } else {
            tg.MainButton.hide()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems])

    const handleSelectType= (value) => {
        setSelectType(value)
    };

    const handleSelectView= (value) => {
        setSelectView(value)
    };

    useEffect(() => {
        try {
            getAll().then((items) => {
                setListProduct(items.filter(item => !item.block));
                setSortListProducts(items.filter(item => !item.block))
            });
        } catch (e) {
            console.log("Ошибка запроса к серверу")
        }
        setSelectType('Все')
        setSelectView('Все')
    }, []);
    
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

    return (
        <div className="menu-container">
            <div className="menu-panel-button">
                <div className="menu-panel-button-type">
                    <CustomDropdown
                        options={listType}
                        onSelect={handleSelectType}
                        text="Тип..."
                        containerStyle={{ width: '155px' }}
                        selectedItem={selectType}
                    />
                </div>
                <div className="menu-panel-button-view">
                    <CustomDropdown
                        options={listView}
                        onSelect={handleSelectView}
                        text="Вид..."
                        containerStyle={{ width: '155px' }}
                        selectedItem={selectView}
                    />
                </div>
            </div>
            <div className="menu-list-product">
                {sortListProducts.length > 0 ? (
                    sortListProducts
                        .filter(item => !item.block)
                        .map((item, index) => (
                            <ItemMenu
                                key={index}
                                img={item.img}
                                name={item.name}
                                price={item.price}
                                id={item.id}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                initialPrice={item.price}
                                userId={userId}
                            />
                        ))
                ) : (
                    <div className="menu-list-img-cat">
                        <img src={imgCat} alt="Тут должно быть изображение:("/>
                        <div className="menu-list-img-cat-name">Продукты не найдены</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListMenu
