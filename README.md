# Greenbook

Caderno de estudos do curso de [Fitoterapia da USP](https://fitoterapiausp.com.br/) para fins de consulta e aprendizado. A ideia é criar uma estruturação do conteúdo abordado em um banco de dados relacional para que assim tenhamos uma fácil busca de conteúdo para prática clínica.

## Comandos importantes no desenvolvimento

Criando migration no banco de dados e iniciando prisma client

```sh
npx prisma migrate dev --name init 
```

## Habilitando CMS para edição

```sh
docker run \
-p 8055:8055 \
-e SECRET=replace-with-secure-random-value \
directus/directus
```

## Roadmap

- Cópia de prescrição