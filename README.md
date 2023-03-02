[![CI Checks & Build](https://github.com/David-Nascimento/k6-performance/actions/workflows/main.yml/badge.svg)](https://github.com/David-Nascimento/k6-performance/actions/workflows/main.yml)
# Cenários dos tipos de testes

# Smoke Test
Smoke test é um teste de aceitação rápido e superficial que tem como objetivo garantir que as principais funcionalidades do sistema estejam funcionando corretamente. 
Esse tipo de teste é executado com uma carga mínima e cenários simples para verificar a funcionalidade central do sistema. É ideal para garantir a estabilidade do sistema em condições básicas.

1. carga mínima
2. cenários simples
3. funcionalidade core
4. rápido resultado

Benefícios do teste
* Permite verificar se as funcionalidades centrais do sistema estão funcionando corretamente.
* É útil para verificar se o sistema está pronto para testes mais avançados.
* É rápido e fácil de executar.

Exemplo de teste
```javascript
vus: 100
duration: '20m'
```

Cenário:
```lua
  Public API:
    Buscar todos os crocodilos
  Critérios:
    smoke test
      1 usuário por 30s
  Limites:
    Requisição com sucesso > 99%
```

# Teste de Carga (Load Test)
O teste de carga mede o desempenho do sistema sob diferentes condições de carga e ajuda a identificar gargalos e problemas relacionados à escalabilidade. 
Esse tipo de teste é realizado com uma quantidade crescente de tráfego para garantir que o sistema continue funcionando de maneira estável e com bom desempenho.

Benefícios do teste
* Permite que o sistema aqueça ou redimensione automaticamente para lidar com o tráfego
* Permite que você compare o tempo de resposta entre os estágios de carga baixa e carga nominal

1. Quantidade de tráfego
2. Condiçoes normais e de pico
3. Garantir funcionamento

Exemplo de teste
```javascript
duration: '5m', target: 100
duration: '10m', target: 100
duration: '5m', target: 0
```

Beneficios do teste
* Permite que seu sistema aqueça ou redimensione automaticamente para lidar com o tráfego.
* Permite que você compare o tempo de resposta entre os estágios de carga baixa e carga nominal.

Cenário:
```lua
  Public API:
    Buscar todos os crocodilos
  Critérios:
    performance test
      100 VU por 10s
  Limites:
    Requisição com falha inferior a 1%
    Duração da requisição p(95) < 250>
```

# Teste de Estresse e de Pico (Stress e Spike Test)
Os testes de estresse e de pico medem como o sistema se comporta sob alta carga e em condições extremas. 
Eles ajudam a identificar a capacidade máxima do sistema em termos de usuários ou taxa de transferência, o ponto de ruptura do sistema e a recuperação do sistema sem intervenção manual após o teste de estresse.

Como o sistema se comporta sobre alta carga?
1. Como seu sistema se comporta em condições extremas?
2. Qual é a capacidade máxima do seu sistema em termos de usuários ou tava de transferência?
3. O ponto de ruptura do seu sistema?
4. O sistema se recupera sem intervenção manual após o término do teste de estresse?

Exemplo de teste Stress
```javascript
    duration: '2m', target: 100
    duration: '5m', target: 100
    duration: '2m', target: 200
    duration: '5m', target: 200
    duration: '2m', target: 300
    duration: '5m', target: 300
    duration: '2m', target: 400
    duration: '5m', target: 400
    duration: '10m', target: 0
```
Reação do Sistema:
- Excelente
- Bom
- Insatisfatório
- Ruim

Exemplo de Spike Test
O spike test é um tipo de teste de estresse que envolve um aumento rápido e significativo no tráfego do sistema. 
Ele ajuda a identificar como o sistema se comporta em condições extremas.

```javascript
    duration: '10m', target: 100
    duration: '1m', target: 100
    duration: '10s', target: 1400
    duration: '3m', target: 1400
    duration: '10s', target: 100
    duration: '3m', target: 100
    duration: '10s', target: 0
```
Perguntas a serem Respondidas
* Como seu sistema se comporta em condições extremas?
* Qual é a capacidade máxima do seu sistema em termos de usuários ou tráfego?
* Qual é o ponto de ruptura do seu sistema?
* O sistema se recupera sem intervenção manual após o término do teste de estresse?

Cenário:
```lua
  Registration e auth: login
    Relizar o login com um novo usuário
  Critérios:
    Stress test
      Ramp up 5 VU em 5s
      Carga 5 VU por 5s
      Ramp up 50 VU em 2s
      Carga 50 VU em 2s
      Ramp down 0 VU em 5s
  Limites:
    Requisição com falha inferior a 1%      
```

Cenário:
```lua
  Registration e auth: Register
    Realizar o registro de um novo usuário
  Critérios:
    Spike Test
      Carga 10 VU por 10s
  Limites:
    Requisição com falaha inferior a 1%
    Duração da requisição p(95) < 500
    Requisição com sucesso superior a 95%
```

# Soak Test
O Soak Test é utilizado para avaliar a confiabilidade do sistema em longos períodos de tempo.

Objetivos do Teste
* Verificar se o sistema não sofre de bugs ou vazamentos de memória.
* Verificar se as reinicializações inesperadas do aplicativo não perdem solicitações.
* Encontrar bugs relacionados a condições de corrida que aparecem esporadicamente.
* Certificar que o banco de dados não esgota o espaço de armazenamento alocado e pare.
* Certificar-se de que os logs não esgotam o armazenamento em disco alocado.

Confiabilidade em logos períodos de tempo.

1. O sistema não sofre de bugs ou vazamentos de memória.
2. Verifique se as reinicializações inesperadas do aplicativo não perdem solicitações.
3. Encontre bugs relacionados a condições de corrida que aparecem esporadicamente.
4. Certificar que se banco de dados não esgote o espaço de armazenamento alocado e pare.
5. Certifique-se de que seus logs não esgotam o armazenamento em disco alocado.
6. Certifique-se de que os serviços externos dos quais você depende não parem de funcionar após a execução de uma certa quantidade de solicitações.

Exemplo de Soak test
```javascript
    duration: '2m', target: 400
    duration: '3h56m', target: 400
    duration: '2m', target: 0
```
Pontos importantes:

1. Quantidade de usuarios
2. Requisitos de infraestrutura.

## Estrutura de teste em K6
A estrutura básica de um teste em K6 consiste em quatro seções principais:

1. **Inicialização:** nessa seção, você pode importar bibliotecas necessárias e executar outras tarefas de configuração.
2. **Configuração:** aqui você define as opções e configurações do K6, como o número de usuários virtuais (VUs) e a duração do teste.
3. **Execução:** é nesta seção que você escreve o código que será executado pelos VUs durante o teste.
4. **Desmontagem:** na seção final, você pode incluir código para limpar e finalizar o teste.

## Exemplo de estrutura de teste em K6
Suponha que você queira executar um teste de carga em uma API REST simples que retorna um JSON. O teste pode ser estruturado da seguinte forma:

Pastas
```lua
k6-performance/
├── package.json
├── k6.js
├── tests/
│   ├── smoke.js
│   ├── load.js
│   ├── stress.js
│   ├── performance.js
│   └── soak.js
├── results/
│   └── report.html
└── payload/
    └── payload.json

```
# K6 com Docker e Grafana
![1_fTPa8w2jMmQNDdWW5PJ9HQ](https://user-images.githubusercontent.com/53004819/222304770-ef1e7caf-968f-4066-a6e3-828e14e65450.png)
