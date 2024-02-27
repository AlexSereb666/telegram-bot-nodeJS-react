import { FEEDBACK_ROUTE, LIST_MENU_ROUTE, BASKET_USER_ROUTE, 
    PRODUCT_CARD_ROUTE, MENU_PROMO_CODE_ROUTE } from "./constPath"
import Feedback from '../feedback/Feedback'
import ListMenu from "../listMenu/ListMenu"
import Basket from '../basket/Basket'
import ProductCard from "../productCard/ProductCard"
import MenuPromoCode from "../menuPromoCode/MenuPromoCode"

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
    }
]
