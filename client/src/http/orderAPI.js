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

module.exports = {
    getOrderOne,
    getUnassignedAndBaristaOrders,
    updateStatusOrder,
};
