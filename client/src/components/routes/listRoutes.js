import { FEEDBACK_ROUTE, LIST_MENU_ROUTE } from "./constPath"
import Feedback from '../feedback/Feedback'
import ListMenu from "../listMenu/ListMenu"

export const listRoutes = [
    {
        path: FEEDBACK_ROUTE,
        component: Feedback
    },
    {
        path: LIST_MENU_ROUTE,
        component: ListMenu
    }
]
