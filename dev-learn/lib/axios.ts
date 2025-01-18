import axios, { CreateAxiosDefaults } from "axios";

const config: CreateAxiosDefaults = {
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
};

const axiosClient = axios.create(config);

export { axiosClient };
