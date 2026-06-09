# First Run Guide

---

## 1. Go to the server folder

From the project root, go into the backend/server folder:

```bash
cd lotr-graphql-wiki/server
```

All commands below should be run from this folder.

---

## 2. Start PostgreSQL and the GraphQL server with Docker Compose

```bash
docker compose up --build -d
```

Check that the containers are running:

```bash
docker ps
```

You should see containers similar to:

```txt
lotr_graphql_postgres
lotr_graphql_server
```

The GraphQL API should run on:

```txt
http://localhost:4000/graphql
```

PostgreSQL should be available on:

```txt
localhost:5432
```

---

## 3. Create the first Prisma migration

Because this is the first time running the project and there are no migrations yet, create the initial migration.

Run this from the host machine, inside the `server` folder:

```bash
npx prisma migrate dev --name init
```

This command does three things:

1. Reads prisma/schema.prisma
2. Creates a new migration folder in prisma/migrations
3. Applies the migration to the PostgreSQL database

After this command, you should have a folder like:

```txt
prisma/migrations/2026xxxxxxxxxx_init/
```

If migrations already exist create/update the database tables with:

```bash
docker compose exec server npx prisma migrate deploy
```

This runs the migrations from the migrations folder and apply them in the db container.

---

## 4. Seed the database

Run the seed script to insert LOTR characters and quotes:

```bash
npm run seed
```

If you want to run the seed command inside the server container instead, use:

```bash
docker compose exec server npm run seed
```

---

## 5. Test the GraphQL API in Postman

Use this request:

```txt
Method: POST
URL: http://localhost:4000/graphql
```

Headers:

```txt
Content-Type: application/json
Apollo-Require-Preflight: true
```

Body type:

```txt
raw JSON
```

Body:

```json
{
  "query": "query { characters { id name race quotes { text } } }"
}
```

Expected result:

```txt
You should get a list of seeded LOTR characters and their quotes.
```

---

## 6. Connect to the database in DataGrip

Create a new PostgreSQL data source.

Use these settings:

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

After connecting, you should see tables like:

```txt
Character
Quote
_prisma_migrations
```

---

## 7. Useful Docker commands

### Start containers

```bash
docker compose up --build -d
```

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

### Open shell inside the server container

```bash
docker compose exec server sh
```

---

## 8. Full first-time setup command list

Use this when setting up from scratch:

```bash
cd lotr-graphql-wiki/server

docker compose up --build -d

npx prisma migrate dev --name init

npx prisma generate

npm run seed
```

Then test:

```txt
POST http://localhost:4000/graphql
```

---

## 9. Full reset and rerun from scratch

Use this if you want to delete all containers, delete the database volume, and recreate everything:

```bash
docker compose down -v

docker compose up --build -d

npx prisma migrate dev --name init

npx prisma generate

npm run seed
```

Warning:

```txt
docker compose down -v deletes the PostgreSQL volume.
All database data will be removed.
```

---

## 10. Difference between migrate dev and migrate deploy

### `npx prisma migrate dev --name init`

Use this when developing and creating migrations.

It:

```txt
- Creates a new migration
- Applies it to the database
- Updates Prisma Client
```

Use this the first time if no migrations exist.

### `npx prisma migrate deploy`

Use this when migrations already exist.

It:

```txt
- Does not create new migrations
- Only applies existing migration files
```

This is what teammates or production deployments use after the migration files have been committed to Git.
