import { $host } from "./index";

export const addMaintenance = async (title, description, notes, status, dateBegin, dateEnd) => {
    const { data } = await $host.post('api/maintenance/addMaintenance', {title, description, notes, status, dateBegin, dateEnd});
    return data;
}

export const updateMaintenance = async (id, title, description, notes, status, dateBegin, dateEnd) => {
    const { data } = await $host.put(`api/maintenance/editMaintenance/${id}`, {title, description, notes, status, dateBegin, dateEnd});
    return data;
}

export const getMaintenance = async () => {
    const { data } = await $host.get('api/maintenance/getAll');
    return data;
}
