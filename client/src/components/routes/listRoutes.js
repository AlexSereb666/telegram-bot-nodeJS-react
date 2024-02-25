import { FEEDBACK_ROUTE, LIST_MENU_ROUTE, BASKET_USER_ROUTE } from "./constPath"
import Feedback from '../feedback/Feedback'
import ListMenu from "../listMenu/ListMenu"
import Basket from '../basket/Basket'

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
    }
]
