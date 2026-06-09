# First Run Guide - LOTR GraphQL Wiki API

## Full first-time setup command list

Use this when setting up from scratch:

```bash
cd lotr-graphql-wiki/server

docker compose up --build -d

docker compose exec server npx prisma migrate deploy

npm run seed
```

Then test:

```txt
POST http://localhost:4000/graphql
```

## 1. Navigate to the server folder

```bash
cd lotr-graphql-wiki/server
```

---

## 2. Start PostgreSQL and GraphQL containers

```bash
docker compose up --build -d
```

Verify containers are running:

```bash
docker ps
```

Expected containers:

```txt
lotr_graphql_postgres
lotr_graphql_server
```

---

## 3. Run Prisma migrations

Create/update the database tables:

```bash
docker compose exec server npx prisma migrate deploy
```

---

## 4. Seed the database

Populate the database with LOTR characters and quotes:

```bash
docker compose exec server npm run seed
```

---

## 5. Test the GraphQL API

GraphQL endpoint:

```txt
http://localhost:4000/graphql
```

### Postman

Method:

```txt
POST
```

URL:

```txt
http://localhost:4000/graphql
```

Headers:

```txt
Content-Type: application/json
Apollo-Require-Preflight: true
```

Body:

```json
{
  "query": "query { characters { id name race quotes { text } } }"
}
```

---

## 6. Connect to PostgreSQL using DataGrip

Create a new PostgreSQL data source.

Connection settings:

```txt
Host: localhost
Port: 5432
Database: lotr_wiki_db
User: lotr_user
Password: lotr_password
Schema: public
```

JDBC URL:

```txt
jdbc:postgresql://localhost:5432/lotr_wiki_db
```

Expected tables:

```txt
Character
Quote
_prisma_migrations
```

---

## Useful Commands

### Stop containers

```bash
docker compose down
```

### Stop containers and delete database data

```bash
docker compose down -v
```

### Open PostgreSQL CLI

```bash
docker compose exec postgres psql -U lotr_user -d lotr_wiki_db
```

### Open shell inside server container

```bash
docker compose exec server sh
```

---

## Full Reset

Delete everything and start fresh:

```bash
docker compose down -v

docker compose up --build -d

docker compose exec server npx prisma migrate deploy

docker compose exec server npm run seed
```
