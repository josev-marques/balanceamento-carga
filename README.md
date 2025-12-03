# Balanceamento de Carga

Projeto demonstrando um balanceador de carga simples em Node.js usando round-robin para distribuir requisições entre múltiplos servidores HTTP.

O sistema contém:
- 3 servidores de aplicação (3001, 3002, 3003)
- 1 balanceador de carga (porta 3000)

**Requisitos**

- Node.js (v12+ recomendado)
- npm (opcional, apenas se for adicionar dependências)

**Balanceador (index.js)**

O arquivo index.js implementa um balanceador round-robin:
- Recebe requisições em http://localhost:3000
- Encaminha para 3001 → 3002 → 3003 → e reinicia o ciclo
- Repassa método, path, headers e o corpo da requisição
- Em caso de erro, responde com JSON indicando indisponibilidade

**Como executar**

Abra três terminais ou execute em background (Linux/macOS) e rode cada servidor:

```
node server-1.js
node server-2.js
node server-3.js
```

Ou em background (uma linha):

```
node server-1.js &
node server-2.js &
node server-3.js &
```

Cada comando iniciará um servidor que fica escutando na porta indicada.

Inicie o balanceador:

```
node index.js
```

**Testes rápidos**

Requisições simples via `curl`:

```
curl http://localhost:3000
```

As respostas devem alternar entre os três servidores.

**Teste de carga (opcional)**

```
ab -n 100 -c 20 http://localhost:3000/
```