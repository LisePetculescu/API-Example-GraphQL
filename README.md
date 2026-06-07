# LOTR GraphQL Wiki API

GraphQL API example for a Lord of the Rings wiki. The backend uses Node.js, Express, Apollo Server, Prisma 7, PostgreSQL, and Docker Compose.

## Database models

The database models are written in:

```txt
lotr-graphql-wiki/server/prisma/schema.prisma
```

The GraphQL SDL schema is written in:

```txt
lotr-graphql-wiki/server/src/graphql/schema.graphql
```

So there are two different schemas:

```txt
schema.prisma   = database tables/models
schema.graphql  = GraphQL API contract
```


## Start the project with Docker Compose

Go to the server folder:

```bash
cd lotr-graphql-wiki/server
```

Start PostgreSQL and the GraphQL server:

```bash
docker compose up --build -d
```

Check that both containers are running:

```bash
docker ps
```

You should see:

```txt
lotr_graphql_postgres
lotr_graphql_server
```

The API runs at:

```txt
http://localhost:4000/graphql
```

## Run database migrations

After the containers are running, apply the Prisma migrations inside the server container:

```bash
docker compose exec server npx prisma migrate deploy
```

This creates the database tables from the committed Prisma migration files.

For local development, if you change `prisma/schema.prisma` and need to create a new migration, run this from the host machine while the database container is running:

```bash
npx prisma migrate dev --name your_migration_name
```

## Seed the database

Seed the database with LOTR character data:

```bash
docker compose exec server npm run seed
```

The seed file is here:

```txt
lotr-graphql-wiki/server/prisma/seed.js
```

## Useful Docker commands

Start containers:

```bash
docker compose up --build -d
```

Stop containers:

```bash
docker compose down
```

Stop containers and delete the PostgreSQL volume/data:

```bash
docker compose down -v
```

Open a shell inside the server container:

```bash
docker compose exec server sh
```

Open PostgreSQL CLI inside the database container:

```bash
docker compose exec postgres psql -U lotr_user -d lotr_wiki_db
```

## Test the API manually

Use Postman with:

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

Example query:

```json
{
  "query": "query { characters { id name race shortDescription } }"
}
```

Example expected response after seeding:

```json
{
  "data": {
    "characters": [
      {
        "id": "1",
        "name": "Aragorn",
        "race": "Man",
        "shortDescription": "The heir of Isildur and rightful king of Gondor."
      }
    ]
  }
}
```

## Postman test collection

The Postman collection is included here:

```txt
lotr-graphql-wiki/server/LOTR_GraphQL_API_Postman_Collection.json
```

Import it into Postman:

```txt
Postman → Import → File → select LOTR_GraphQL_API_Postman_Collection.json
```

Set or verify the collection variable:

```txt
baseUrl = http://localhost:4000
```

The collection contains positive and negative tests.

Positive tests include:

```txt
Query all characters
Query character by ID
Create character
Update created character
Delete created character
```

Negative/security tests include:

```txt
Query non-existing character
Create character with missing required field
Create character with invalid image URL
XSS-like input attempt
SQL injection-like search attempt
```

## Security notes

### SQL injection prevention

The API uses Prisma ORM query methods such as:

```js
prisma.character.findMany()
prisma.character.findUnique()
prisma.character.create()
prisma.character.update()
prisma.character.delete()
```

The code does not build SQL queries by concatenating user input into raw SQL strings.

### XSS prevention

The API validates user input with Zod. Important fields have minimum and maximum lengths, and `imageUrl` must be a valid URL.

### CSRF prevention

Apollo Server has CSRF prevention enabled:

```js
csrfPrevention: true
```

The Express CORS setup only allows POST requests and requires expected headers.
