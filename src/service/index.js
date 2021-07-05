import axios from "axios";
import md5 from "md5";

export var request = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
});

const getHashAndTs = () => {
    const time = Date.now();
    return {
        hash: md5(
            time +
            process.env.VUE_APP_API_PRIVATE_KEY +
            process.env.VUE_APP_API_PUBLIC_KEY
        ),
        ts: time,
    };
};

export const _getCharacterById = (id, data) =>
    request.get(`/v1/public/characters/${id}`, {
        params: {
            ...data,
            apikey: process.env.VUE_APP_API_PUBLIC_KEY,
            ...getHashAndTs(),
        },
    });

export const _getCharacters = (data) =>
    request.get("/v1/public/characters", {
        params: {
            ...data,
            apikey: process.env.VUE_APP_API_PUBLIC_KEY,
            ...getHashAndTs(),
        },
    });