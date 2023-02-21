//1. Inicialização
import sleep from 'k6'

//2. Configuração
export const options = {
  vus: 1,
  duration: '10s'
}

//3. execução // codigo vu
export default function() {
  sleep(1)
}

//4. desmontagem
export function teardown(data) { 
  console.log(data)
}