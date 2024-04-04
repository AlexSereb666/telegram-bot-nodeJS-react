import { $host } from "./index";

export const getOneType = async (id) => {
    const { data } = await $host.get(`api/type/getOneType/${id}`);
    return data;
}

export const getAllType = async () => {
    const { data } = await $host.get('api/type/getAllTypes');
    return data;
}

export const updateType = async (id, name) => {
    const { data } = await $host.put(`api/type/updateType/${id}`, { name });
    return data;
}

export const deleteType = async (id) => {
    const { data } = await $host.delete(`api/type/deleteType/${id}`);
    return data;
}

export const addType = async (name) => {
    const { data } = await $host.post('api/type/create', { name });
    return data;
}
