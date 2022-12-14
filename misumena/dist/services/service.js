"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiClient = void 0;
const axios_1 = require("axios");
const { REACT_APP_ConnectAPI, REACT_APP_AccessControl } = process.env;
exports.apiClient = axios_1.default.create({
    baseURL: REACT_APP_ConnectAPI,
    timeout: 20000,
    responseType: "json",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": REACT_APP_AccessControl
    }
});
exports.apiClient.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
});
//# sourceMappingURL=service.js.map