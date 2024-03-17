import { FEEDBACK_ROUTE, LIST_MENU_ROUTE, BASKET_USER_ROUTE, 
    PRODUCT_CARD_ROUTE, MENU_PROMO_CODE_ROUTE, PERSONAL_DATA, 
    PERSONAL_ORDERS, ORDERS_BARISTA } from "./constPath"
import Feedback from '../pages/feedback/Feedback'
import ListMenu from "../pages/listMenu/ListMenu"
import Basket from '../pages/basket/Basket'
import ProductCard from "../pages/productCard/ProductCard"
import MenuPromoCode from "../pages/menuPromoCode/MenuPromoCode"
import PersonalData from "../pages/personalData/PersonalData"
import PersonalOrders from "../pages/personalOrders/PersonalOrders"
import OrdersBarista from "../pages/ordersBarista/OrdersBarista"

export const listRoutes = [
    {
        path: FEEDBACK_ROUTE,
        component: Feedback
    },
    {
        path: LIST_MENU_ROUTE,
        component: ListMenu
    },
    {
        path: BASKET_USER_ROUTE,
        component: Basket
    },
    {
        path: PRODUCT_CARD_ROUTE,
        component: ProductCard
    },
    {
        path: MENU_PROMO_CODE_ROUTE,
        component: MenuPromoCode
    },
    {
        path: PERSONAL_DATA,
        component: PersonalData
    },
    {
        path: PERSONAL_ORDERS,
        component: PersonalOrders
    },
    {
        path: ORDERS_BARISTA,
        component: OrdersBarista
    }
]
