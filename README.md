# Docker + Node + Nginx + MySQL

The main idea is that when a user accesses nginx, they make a call to our node.js application. This application will then add a record to our mysql database, registering a name in the people table.

The return from the node.js application to nginx should be:

<h1>Full Cycle Rocks!</h1>

- List of names registered in the database.

## How to Use

```bash
docker-compose up --build -d
```

Visit http://localhost:8080/ to see the output.