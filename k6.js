// 1. Inicialização
import http from 'k6/http';

// 2. Configuração
export let options = {
  vus: 50,
  duration: '30s',
  rps: 100
};

// 3. Execução
export default function () {
  const res = http.get('https://test.k6.io/');
};

// 4. Desmontagem
export function teardown(data) {
  console.log("Test finished.");
}