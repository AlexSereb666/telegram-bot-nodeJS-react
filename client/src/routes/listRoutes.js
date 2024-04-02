import { FEEDBACK_ROUTE, LIST_MENU_ROUTE, BASKET_USER_ROUTE, 
    PRODUCT_CARD_ROUTE, MENU_PROMO_CODE_ROUTE, PERSONAL_DATA, 
    PERSONAL_ORDERS, ORDERS_BARISTA, MESSAGE_USER_BOT,
    LIST_COURIER_BARISTA, ORDERS_COURIER, ADMIN_EDIT_USER,
    ADMIN_LIST_USER, ADMIN_LIST_PRODUCT} from "./constPath"
import Feedback from '../pages/feedback/Feedback'
import ListMenu from "../pages/listMenu/ListMenu"
import Basket from '../pages/basket/Basket'
import ProductCard from "../pages/productCard/ProductCard"
import MenuPromoCode from "../pages/menuPromoCode/MenuPromoCode"
import PersonalData from "../pages/personalData/PersonalData"
import PersonalOrders from "../pages/personalOrders/PersonalOrders"
import OrdersBarista from "../pages/ordersBarista/OrdersBarista"
import MessageBot from "../pages/messageBot/MessageBot"
import ListCourier from "../pages/listCourier/ListCourier"
import OrdersCourier from "../pages/ordersCourier/OrdersCourier"
import AdminMenuEditUser from "../pages/adminMenuEditUser/AdminMenuEditUser"
import AdminMenuListUser from "../pages/adminMenuListUser/AdminMenuListUser"
import AdminMenuListProduct from "../pages/adminMenuListProduct/AdminMenuListProduct"

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
    },
    {
        path: MESSAGE_USER_BOT,
        component: MessageBot
    },
    {
        path: LIST_COURIER_BARISTA,
        component: ListCourier
    },
    {
        path: ORDERS_COURIER,
        component: OrdersCourier
    },
    {
        path: ADMIN_EDIT_USER,
        component: AdminMenuEditUser
    },
    {
        path: ADMIN_LIST_USER,
        component: AdminMenuListUser
    },
    {
        path: ADMIN_LIST_PRODUCT,
        component: AdminMenuListProduct
    }
]
