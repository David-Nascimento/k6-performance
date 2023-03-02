import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = { 
    vus: 100,
    duration: '10s',
    threshoulds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 250']
    }
}

const BASE_URL = 'http://test-api.k6.io';
export function setup() {
    const loginRes = http.post(`${BASE_URL}/auth/token/login/`, {
        username: '0.2405037192902699@mail.com',
        password: 'user123'
    });

    const token = loginRes.json('access');
    return token;
}

export default function(token) {

    const params = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    const res = http.get(`${BASE_URL}/my/crocodiles`, params)
    check(res, {
        'is code 200': (r) => r.status === 200
    });
    sleep(1)
}