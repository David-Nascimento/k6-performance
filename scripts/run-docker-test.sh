docker-compose up -d influxdb grafana
echo "--------------------------------------------------------------------------------------"
echo "Load testing with Grafana dashboard http://localhost:3000/d/k6/k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"
docker-compose run --rm -v $PWD/:/scripts k6 run /scripts/main.js
