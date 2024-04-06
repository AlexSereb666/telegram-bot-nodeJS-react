import { $host } from "./index";

/*
export const addPromoCode = async (code, discount, status, validUntilDate) => {
    const { data } = await $host.post(`api/promocode/create`, {code, discount, status, validUntilDate})
    return data
}*/

export const getAllFeedbacks = async () => {
    const { data } = await $host.get('api/feedback/getAllFeedback');
    return data;
}