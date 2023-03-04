import { Trend, Rate, Counter } from 'k6/metrics';


export const myTrend = new Trend('my_trend');
export const myRate = new Rate('my_rate');
export const myCounter = new Counter('my_counter');