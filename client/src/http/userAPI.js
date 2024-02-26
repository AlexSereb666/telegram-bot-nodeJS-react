const { $host } = require("./index");

const getUserById = async (id) => {
    const {data} = await $host.get(`api/user/getUserById/${id}`);
    return data;
}

const updateUserAddress = async (id, address) => {
    const {data} = await $host.put(`api/user/updateAddress/${id}`, {address});
    return data;
}

const getUserProductRating = async (userId, productId) => {
    const {data} = await $host.get(`api/user/users/${userId}/products/${productId}/rating`);
    return data;
}

const addRating = async (userId, productId, rate) => {
    const {data} = await $host.post(`api/user/ratings`, {userId, productId, rate});
    return data;
}

module.exports = {
    getUserById,
    updateUserAddress,
    getUserProductRating,
    addRating
};
