const { $host } = require("./index");

const addToBasket = async (userId, productId) => {
    const {data} = await $host.post('api/basket', { userId, productId });
    return data;
}

const getBasket = async (userId) => {
    const {data} = await $host.get(`api/basket/getBasket/` + userId );
    return data;
}

const removeFromBasket = async (userId, id) => {
    const { data } = await $host.delete(`api/basket/${id}`, { data: { userId } });
    return data;
}

const getAllProductsInBasket = async (userId) => {
    const { data } = await $host.get('api/basket/getProducts/' + userId)
    return data
}

module.exports = {
    addToBasket,
    getBasket,
    removeFromBasket,
    getAllProductsInBasket
};
