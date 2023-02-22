import http from 'k6/http';
import { check } from 'k6';

export const options = { 
    vus: 1,
    duration: '30s',
    threshoulds: {
        checks: ['rate > 0.99']
    }
}

export default function() {
    const BASE_URL = 'http://test-api.k6.io/public/crocodiles/';

    const res = http.get(BASE_URL)
    check(res, {
        'is code 200': (r) => r.status === 200
    });
}