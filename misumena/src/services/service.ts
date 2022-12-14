import axios from "axios";
const { REACT_APP_ConnectAPI, REACT_APP_AccessControl } = process.env;

export const apiClient = axios.create({
    baseURL: REACT_APP_ConnectAPI,
    timeout: 20000,
    responseType: "json",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": REACT_APP_AccessControl
    }
});

apiClient.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log(error);
    })