import { $host } from "./index";

export const getOneType = async (id) => {
    const { data } = await $host.get(`api/type/getOneType/${id}`)
    return data
}
