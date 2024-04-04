import { $host } from "./index";

export const getOneView = async (id) => {
    const { data } = await $host.get(`api/view/getOneView/${id}`);
    return data;
}

export const getAllView = async () => {
    const { data } = await $host.get('api/view/getAllViews')
    return data;
}

export const updateView = async (id, name) => {
    const { data } = await $host.put(`api/view/updateView/${id}`, { name });
    return data;
}

export const deleteView = async (id) => {
    const { data } = await $host.delete(`api/view/deleteView/${id}`);
    return data;
}

export const addView = async (name) => {
    const { data } = await $host.post('api/view/create', { name });
    return data;
}
