## Full stack test - Backend

### Support

This application is hosted on `hostname` and give a support to front end applications

### Documentation

The full Documentation may be viewed <a href="https://github.com/hick97/bossabox-backend/blob/master/Documentation.md">here</a>

### Servers

| Server     | Api Url   | Branch (GitHub) |
| ---------- | --------- | --------------- |
| production | `api url` | production      |

## API Directories

- Routes `./src/routes`
- Models `./src/app/models`
- Auth middleware `./src/app/middlewares`
- Services `./src/app/services`
- Database configurations `.src/config/database.js`
- Server configurations `./server.js`

## Configuring the API locally

- Download or clone the project access the project folder with the terminal and execute the CLI <code>npm install</code> or <code>yarn</code>
- Create an `.env` file similar to `.env.example` and add `mongodb://localhost/yourDatabaseName` in DB_MONGO_URI
- Run the server in development mode <code>npm run dev</code> or <code>yarn dev </code>
- Access in your browser on port 3000 <a href="http://localhost:3000">http://localhost:3000</a>

By: <a href="https://github.com/hick97">Henrique Augusto</a>
