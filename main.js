import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import {myTrend, myRate, myCounter } from "./utils/k6.config.js";

import GetCrocodilos from "./tests/load.js";
import { group } from "k6";

let VUS = 10

export const options = {
    vus: VUS * 2,
    duration: '5s',
};


export default () => {
    group('Deve realizar testes de carga', () => {
        const res = GetCrocodilos();
        
        myTrend.add(res.timings.duration);
        myRate.add(res.status === 200);
        myCounter.add(1);
    })
}

export const handleSummary = data => {
    return { "./results/report.html": htmlReport(data) };
};
