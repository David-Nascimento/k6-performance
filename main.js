// 1. Inicialização
import { group, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

import GetCrocodilos from "./tests/load.js";
import { options, myTrend, myRate, myCounter } from "./k6.config.js"

options.scenarios = {
    loadTest: {
        executor: 'ramping-arrival-rate',
        startRate: 50,
        timeUnit: '1s',
        stages: [
            { target: 50, duration: '15s' },
            { target: 100, duration: '10s' },
            { target: 0, duration: '5s'  }
        ],
        preAllocatedVUs: 50,
        maxVUs: 100,
        tags: { test_type: 'api' },
        exec: 'getCrocodilos'
    }
};

options.thresholds = {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
    http_req_duration:['p(95) < 200']
};



// 3. Execução
export default () => {
    group("Deve executar uma ramp up de teste de carga", () => {
        let res = GetCrocodilos();

        myTrend.add(res.timings.duration);
        myRate.add(res.status === 200);
        myCounter.add(1);
        sleep(options.duration / 4);
    });
};

export function handleSummary(data) {
    return {
      "./results/report.html": htmlReport(data)
    };
}