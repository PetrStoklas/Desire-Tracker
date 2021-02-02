import { matchPath } from "react-router";
import { history } from "./index";

export const home = () => "/"

export const baseUrl = (categoryId = ":categoryId") => `/${categoryId}`

export const login = () => "/login"
export const voting = (categoryId) => `${baseUrl(categoryId)}/voting`
export const manage = (categoryId = ":categoryId") => `${baseUrl(categoryId)}/manage`
export const createCategory = () => "/create/category"
export const addDesire = (categoryId) => `${manage(categoryId)}/add`
export const desireDetail = (categoryId, desireId = ":desireId") => `${manage(categoryId)}/${desireId}/detail`

const switchableRoutes = {
    login,
    createCategory,
    manage,
    voting
}

export const selectCategory = (categoryId) => {
    // const isCateogoryIdWildCard = categoryId === ":categoryId"

    const route = Object.keys(switchableRoutes).find(route => matchPath(history.location.pathname, { path: switchableRoutes[route]() }))
    const urlToPush = route ? switchableRoutes[route] : voting

    return history.push(urlToPush(categoryId))
}