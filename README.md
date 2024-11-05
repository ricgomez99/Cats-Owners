# REST API for managing cats and owner data

### Description

- REST API with CRUD operations to manage data for `cats` and their `owners`, enabling efficient creation, retrieval, updating, and deletion of records.

### Technologies

1. **NestJS**
2. **TypeScript**
3. **MongoDB**

### Features

- **CRUD Operations**: Create, read, update, and delete records for cats and owners.
- **Dependency Injection**: Ensures modularity and scalability.
- **Testing**: Includes automated tests to verify functionality and performance.

### Setup

1. Clone the repository:

```shell
git clone url
```

2. Install dependencies:

```shell
npm install
```

3. Add the env variable `API_URI`:

```env
API_URI='your mongoDB atlas cluster url'
```

4. Start server:

```shell
npm run start:dev
```

### API Endpoints

| Method | Endpoint  | Description           |
| ------ | --------- | --------------------- |
| GET    | /cats     | Get all cats          |
| POST   | /cats     | Create a cat          |
| GET    | /cats:id  | Get a cat by id       |
| PATCH  | /cats:id  | Update a cat by id    |
| DELETE | /cats:id  | Delete a cat by id    |
| GET    | /owner    | Get all owners        |
| POST   | /owner    | Create an owner       |
| GET    | /owner:id | Get an owner by id    |
| PATCH  | /owner:id | Update an owner by id |
| DELETE | /owner:id | Delete an owner by id |
