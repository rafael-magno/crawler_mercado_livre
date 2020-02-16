# Crawler Mercado Livre

Retorna informações dos produtos de acordo com o termo a pesquisar.

# Como instalar

1. Instale as dependências

```npm install```

2. Inicie o servidor 

```npm start```

# Rota

| Metodo | Caminho | Exemplo corpo |
| ----- | ----- | ----- |
| POST  | localhost:3000/products | {"search": "cadeado", "limit": 10} |