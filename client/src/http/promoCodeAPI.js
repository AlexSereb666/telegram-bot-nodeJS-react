import { $host } from "./index";

export const addPromoCode = async (code, discount, status, validUntilDate) => {
    const { data } = await $host.post(`api/promocode/create`, {code, discount, status, validUntilDate})
    return data
}

export const editPromoCode = async (id, code, discount, status, validUntilDate) => {
    const { data } = await $host.put(`api/promocode/edit/${id}`, {code, discount, status, validUntilDate})
    return data
}

export const getPromoCodeById = async (id) => {
    const { data } = await $host.get(`api/promocode/${id}`)
    return data
}

export const getPromoCodeByCode = async (code) => {
    const { data } = await $host.get(`api/promocode/code/${code}`)
    return data
}

export const getPromoCodesByProduct = async (id) => {
    const { data } = await $host.get(`api/promocode/product/${id}`)
    return data
}

export const getAllPromoCodesCurrent = async (current) => {
    const { data } = await $host.get(`api/promocode/current/${current}`)
    return data
}

export const deletePromoCode = async (id) => {
    const { data } = await $host.delete(`api/promocode/delete/${id}`)
    return data
}

export const addPromoCodeToProduct = async (promoCodeId, productId) => {
    const { data } = await $host.post(`api/promocode/addPromoCodeToProduct`, {promoCodeId, productId})
    return data
}

export const deletePromoCodeProduct = async (promoCodeId, productId) => {
    const { data } = await $host.delete(`api/promocode/deletePromoCodeProduct/${promoCodeId}/${productId}`)
    return data;
}
