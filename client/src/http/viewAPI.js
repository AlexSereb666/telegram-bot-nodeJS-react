import { $host } from "./index";

export const getOneView = async (id) => {
    const { data } = await $host.get(`api/view/getOneView/${id}`)
    return data
}
