import http from 'k6/http';

import { SharedArray } from 'k6/data';

const data = new SharedArray('Leitura do json', function() {
    let { crocodilos } = JSON.parse(open('../payload/payload.json'));
    return crocodilos;
});

const BASE_URL = 'http://test-api.k6.io/public/crocodiles/';

export default function() {
    let { id } = data[Math.floor(Math.random() * data.length)];
    const url = `${BASE_URL}${id}`;
    const res = http.get(url);

    return res;
}