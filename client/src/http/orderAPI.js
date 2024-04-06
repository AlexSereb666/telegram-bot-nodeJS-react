const { $host } = require("./index");

const getOrderOne = async (userId) => {
    const {data} = await $host.get(`api/order/getOrderOne/${userId}`);
    return data;
}

const getUnassignedAndBaristaOrders = async (userId) => {
    const {data} = await $host.get(`api/order/ordersBarista/${userId}`);
    return data;
}

const updateStatusOrder = async (id, idUser, status) => {
    const {data} = await $host.put(`api/order/updateStatus/${id}`, {idUser, status});
    return data;
}

const updateStatusOrderCourier = async (id, idUser, status) => {
    const {data} = await $host.put(`api/order/updateStatusCourier/${id}`, {idUser, status});
    return data;
}

const getBaristaOrdersWithStatus = async (baristaId, status) => {
    const {data} = await $host.get(`api/order/getBaristaOrdersWithStatus/${baristaId}/${status}`);
    return data;
}

const getCourierOrdersWithStatus = async (courierId, status) => {
    const {data} = await $host.get(`api/order/getCourierOrdersWithStatus/${courierId}/${status}`);
    return data;
}

const getCourierOrdersWithStatusFree = async (status) => {
    const {data} = await $host.get(`api/order/getCourierOrdersWithStatusFree/${status}`);
    return data;
}

const getAll = async () => {
    const { data } = await $host.get('api/order/getOrdersAll');
    return data;
}

const deleteOrder = async (id) => {
    const { data } = await $host.delete(`api/order/deleteOrder/${id}`);
    return data;
}

const updateStatusAdmin = async (id, status) => {
    const { data } = await $host.put(`api/order/updateStatusOrderAdmin/${id}`, { status });
    return data;
}

module.exports = {
    getOrderOne,
    getUnassignedAndBaristaOrders,
    updateStatusOrder,
    getBaristaOrdersWithStatus,
    getCourierOrdersWithStatus,
    getCourierOrdersWithStatusFree,
    updateStatusOrderCourier,
    getAll,
    deleteOrder,
    updateStatusAdmin,
};
