# Balanceamento de Carga

Projeto de demonstração de conceitos básicos de balanceamento de carga usando múltiplos servidores HTTP em Node.js.

Este repositório contém três pequenos servidores (cada um escutando em uma porta diferente) usados para exemplificar como clientes podem ser distribuídos entre múltiplas instâncias.

**Arquivos principais**

- `server-1.js`: servidor de exemplo ouvindo em `localhost:3001`
- `server-2.js`: servidor de exemplo ouvindo em `localhost:3002`
- `server-3.js`: servidor de exemplo ouvindo em `localhost:3003`

**Visão Geral**

Cada servidor responde com uma string simples identificando qual instância respondeu. A ideia é que um balanceador (ou um teste manual) direcione requisições para as diferentes portas para simular distribuição de carga.

**Requisitos**

- Node.js (v12+ recomendado)
- npm (opcional, apenas se for adicionar dependências)

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

**Testes rápidos**

Requisições simples via `curl`:

```
curl http://localhost:3001
curl http://localhost:3002
curl http://localhost:3003
```

Simular várias requisições alternando portas (exemplo de loop bash):

```
for i in {1..9}; do
	port=$((3000 + (i % 3) + 1))
	curl -s http://localhost:$port && echo
done
```

Isso irá enviar requisições alternadas para as três instâncias.

**Testes de carga simples**

Você pode usar ferramentas como `ab` (ApacheBench) ou `wrk` para gerar carga. Exemplo com `ab` apontando para uma instância:

```
ab -n 100 -c 10 http://127.0.0.1:3001/
```

Para testar um balanceador real, implemente um proxy (Nginx, HAProxy) ou um script de balanceamento em Node.js que encaminhe requisições entre as portas.

Exemplo mínimo (ideia): um proxy HTTP que receba em `:3000` e reencaminhe em round-robin para as portas `3001`, `3002`, `3003`.

**Sugestões / Próximos passos**

- Implementar um pequeno balanceador em Node.js (round-robin, least-connections).
- Testar comportamento com instâncias que respondem lentamente para observar timeouts.
- Adicionar scripts npm para facilitar execução (`npm start:all`, etc.).
- Criar um Dockerfile para cada servidor e um `docker-compose` com balanceador para demonstração portátil.

**Contribuição**

Pull requests são bem-vindos. Para mudanças grandes, abra uma issue primeiro para discutir o design.

**Licença**

Sinta-se à vontade para usar este código para fins educacionais. Adicione uma licença se quiser compatibilizar com requisitos formais.
