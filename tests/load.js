import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const data = new SharedArray('Leitura do json', function() {
    let { crocodilos } = JSON.parse(open('../payload/payload.json'));
    return crocodilos;
});

const BASE_URL = 'http://test-api.k6.io/public/crocodiles/';

export default function() {
    const crocodilo = data[Math.floor(Math.random() * data.length)].id;
    const url = `${BASE_URL}${crocodilo}`;
    const res = http.get(url);
    check(res, {
        'is code 200': (r) => r.status === 200
    });
    sleep(1);
}