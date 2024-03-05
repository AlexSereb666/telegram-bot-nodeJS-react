import { $host } from "./index";

export const addProduct = async (product) => {
    const {data} = await $host.post('api/product/create', product)
    return data
}

export const getOne = async (id) => {
    const {data} = await $host.get(`api/product/getOneProduct/${id}`)
    return data
}

export const getAllPage = async () => {
    const {data} = await $host.get('api/product/getAllPageProducts')
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/product/getAllProducts')
    return data
}

export const editProduct = async (product, id) => {
    const {data} = await $host.put(`api/product/updateProduct/${id}`, product)
    return data
}

export const deleteProduct = async (id) => {
    const {data} = await $host.delete(`api/product/deleteProduct/${id}`)
    return data
}
