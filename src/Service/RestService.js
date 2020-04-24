import {
    ACCESS_TOKEN,
    ADMIN_URL,
    AUTH_BASE_URL,
    FEATURES_URL,
    ITEMS_PER_PAGE,
    RUN_CODE_URL,
    RUNINFO_URL,
    SEND_CODE_URL
} from "../constants";
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

export function requestRestore(restoreRequest) {
    return request({
        url: AUTH_BASE_URL + "/requestRestore",
        method: 'POST',
        body: JSON.stringify(restoreRequest)
    });
}

export function confirmRestore(confirmRestore) {
    return request({
        url: AUTH_BASE_URL + "/confirmRestore",
        method: 'POST',
        body: JSON.stringify(confirmRestore)
    });
}

export function applyFeatures(featuresRequest) {
    return request({
        url: FEATURES_URL + "/apply",
        method: 'POST',
        body: JSON.stringify(featuresRequest)
    });
}

export function setTask(task) {
    return request({
        url: ADMIN_URL + "/setTask",
        method: 'POST',
        body: task
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

export function sendCode(data) {
    return request({
        url: SEND_CODE_URL,
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export function getFeatures() {
    return request({
        url: FEATURES_URL + "/get",
        method: 'GET'
    });
}

export function getRunInfo() {
    return request({
        url: RUNINFO_URL,
        method: 'GET'
    });
}

export function getTask() {
    return request({
        url: ADMIN_URL + "/getTask",
        method: 'GET'
    });
}

export function getResults(data) {
    return request({
        url: ADMIN_URL + "/results?page=" + data.page + "&size=" + ITEMS_PER_PAGE + "&username=" + encodeURIComponent(data.search),
        method: 'GET'
    });
}

export function deleteResult(data) {
    return request({
        url: ADMIN_URL + "/deleteResult",
        method: 'DELETE',
        body: JSON.stringify(data)
    });
}
