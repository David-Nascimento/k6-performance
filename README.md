# Cenários dos tipos de testes

# Smoke Test
1. carga mínima
2. cenários simples
3. funcionalidade core
4. rápido resultado

Exemplo de teste
```javascript
vus: 100
duration: '20m'
```
# Load Test
1. Quantidade de tráfego
2. Condiçoes normais e de pico
3. Garantir funcionamento

Exemplo de teste
```javascript
duration: '5m', target: 100
duration: '10m', target: 100
duration: '5m', target: 0
```

### Beneficios do teste
Permite que seu sistema aqueça ou redimensione automaticamente para lidar com o tráfego.
Permite que você compare o tempo de resposta entre os estágios de carga baixa e carga nominal.

# Stress e Spike Test
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
```javascript
    duration: '10m', target: 100
    duration: '1m', target: 100
    duration: '10s', target: 1400
    duration: '3m', target: 1400
    duration: '10s', target: 100
    duration: '3m', target: 100
    duration: '10s', target: 0
```

# Soak Test
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