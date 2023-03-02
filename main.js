// 1. Inicialização
import { group } from 'k6';
import GetCrocodilos from "./tests/load.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// 2. Configuração
export const options = {
    scenarios: {
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
    },
    thresholds: {
        'http_req_duration{test_type:api}':['p(95) < 200']
    }
};

// 3. Execução
export function getCrocodilos() {
    group("Deve executar uma ramp up de teste de carga", () => {
        GetCrocodilos();
    });
};

export function handleSummary(data) {
    return {
      "./results/report": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true })
    };
}