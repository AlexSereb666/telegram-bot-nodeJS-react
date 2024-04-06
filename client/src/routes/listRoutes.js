import { FEEDBACK_ROUTE, LIST_MENU_ROUTE, BASKET_USER_ROUTE, 
    PRODUCT_CARD_ROUTE, MENU_PROMO_CODE_ROUTE, PERSONAL_DATA, 
    PERSONAL_ORDERS, ORDERS_BARISTA, MESSAGE_USER_BOT,
    LIST_COURIER_BARISTA, ORDERS_COURIER, ADMIN_EDIT_USER,
    ADMIN_LIST_USER, ADMIN_LIST_PRODUCT, ADD_PRODUCT, ADMIN_LIST_TYPE, ADMIN_LIST_VIEW, ADMIN_EDIT_PRODUCT,
    ADMIN_LIST_PROMO,
    ADMIN_EDIT_PROMO,
    ADMIN_ORDERS,
    MESSAGE_ALL,
    ADMIN_FEEDBACK} from "./constPath"
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
import AddProduct from "../pages/addProduct/AddProduct"
import AdminMenuListType from "../pages/adminMenuListType/AdminMenuListType"
import AdminMenuListView from "../pages/adminMenuListView/AdminMenuListView"
import AdminMenuEditProduct from '../pages/adminEditProduct/AdminEditProduct'
import AdminMenuListPromo from "../pages/adminMenuListPromo/AdminMenuListPromo"
import AdminMenuEditPromo from "../pages/adminMenuEditPromo/AdminMenuEditPromo"
import AdminOrders from "../pages/adminOrders/AdminOrders"
import MessageAll from "../pages/messageAll/MessageAll"
import AdminFeedback from "../pages/adminFeedback/AdminFeedback"

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
    },
    {
        path: ADD_PRODUCT,
        component: AddProduct
    },
    {
        path: ADMIN_LIST_TYPE,
        component: AdminMenuListType
    },
    {
        path: ADMIN_LIST_VIEW,
        component: AdminMenuListView
    },
    {
        path: ADMIN_EDIT_PRODUCT,
        component: AdminMenuEditProduct
    },
    {
        path: ADMIN_LIST_PROMO,
        component: AdminMenuListPromo
    },
    {
        path: ADMIN_EDIT_PROMO,
        component: AdminMenuEditPromo
    },
    {
        path: ADMIN_ORDERS,
        component: AdminOrders
    },
    {
        path: MESSAGE_ALL,
        component: MessageAll
    },
    {
        path: ADMIN_FEEDBACK,
        component: AdminFeedback
    }
]
