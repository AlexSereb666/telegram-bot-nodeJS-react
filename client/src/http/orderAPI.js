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

module.exports = {
    getOrderOne,
    getUnassignedAndBaristaOrders,
    updateStatusOrder,
    getBaristaOrdersWithStatus,
    getCourierOrdersWithStatus,
    getCourierOrdersWithStatusFree,
    updateStatusOrderCourier,
};
