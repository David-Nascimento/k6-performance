import http from "k6/http";
import { check, sleep } from "k6";


export const options = {
    stages: [{ duration: '2s', target: 10}],
    thresholds: {
        checks: ['rate < 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 500']
    }
};



export default function() {
    const BASE_URL = "http://test-api.k6.io";

    const USER = `${Math.random()}@mail.com`;
    const PASSWORD = "user123";

    const res = http.post(`${BASE_URL}/user/register/`, {
        username: USER,
        password: PASSWORD,
        first_name: "crocodilo",
        last_name: "dino",
        email: USER
    });

    check(res, {
        'register success': (r) => r.status === 201
    });

    sleep(1)
}