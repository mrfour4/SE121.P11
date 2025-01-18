import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PISTON_API_URL!,
    headers: {
        "Content-Type": "application/json",
    },
});

export { axiosClient };
