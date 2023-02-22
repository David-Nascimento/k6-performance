import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

export const options = { 
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0  }
    ],
    threshoulds: {
        checks: ['rate > 0.99'],
        http_request_duration: ['p(95) < 200']
    }
}

const data = new SharedArray('Leitura do json', function() {
    return JSON.parse(open('./payload/payload.json')).crocodilos
});

export default function() {
    const crocodilo = data[Math.floor(Math.random() * data.length)].id

    const BASE_URL = `http://test-api.k6.io/public/crocodiles/${crocodilo}`;

    const res = http.get(BASE_URL)
    check(res, {
        'is code 200': (r) => r.status === 200
    });
    sleep(1);
}