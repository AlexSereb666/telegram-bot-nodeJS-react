const { $host } = require("./index");

const getUserById = async (id) => {
    const {data} = await $host.get(`api/user/getUserById/${id}`);
    return data;
}

module.exports = {
    getUserById,
};
