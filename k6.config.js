import { Trend, Rate, Counter } from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1500'], // 95% of requests must complete below 500ms and 99% of requests must complete below 1500ms
    errors: ['rate<0.1'], // Errors must be less than 10%
  },
};

export const myTrend = new Trend('my_trend');
export const myRate = new Rate('my_rate');
export const myCounter = new Counter('my_counter');

/*

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
*/