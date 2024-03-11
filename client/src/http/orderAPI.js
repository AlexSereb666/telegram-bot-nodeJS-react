const { $host } = require("./index");

const getOrderOne = async (userId) => {
    const {data} = await $host.get(`api/order/getOrderOne/${userId}`);
    return data;
}

module.exports = {
    getOrderOne,
};
