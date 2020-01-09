import {ACCESS_TOKEN, AUTH_BASE_URL, RUN_CODE_URL} from "../constants";
import * as Cookies from "js-cookie";


const request = (options) => {
    const headers = {};

    headers['Content-Type'] = 'application/json';

    if (Cookies.get(ACCESS_TOKEN)) {
        headers['Authorization'] = 'Bearer ' + Cookies.get(ACCESS_TOKEN);
    }

    const defaults = {headers: headers};

    let body = options.body;
    if (body instanceof FormData) {
        delete defaults.headers['Content-Type'];
    }

    return fetch(options.url, {...defaults, ...options})
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};


export function login(loginRequest) {
    return request({
        url: AUTH_BASE_URL + "/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: AUTH_BASE_URL + "/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function executeCode(data) {
    return request({
        url: RUN_CODE_URL,
        method: 'POST',
        body: JSON.stringify(data)
    });
}
