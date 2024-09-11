const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
    host: 'mysql',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || 'root',
    database: process.env.MYSQL_DATABASE || 'fullcycledb'
};

const connection = mysql.createConnection(config);

connection.query(`
  CREATE TABLE IF NOT EXISTS people (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  )
`);

app.get('/', (req, res) => {
    const name = `Person ${Math.floor(Math.random() * 1000)}`;

    connection.query(`INSERT INTO people(name) VALUES('${name}')`, (err, _) => {
        if (err) throw err;

        connection.query('SELECT name FROM people', (err, rows) => {
            if (err) throw err;

            let namesList = '<ul>';
            rows.forEach(row => {
                namesList += `<li>${row.name}</li>`;
            });
            namesList += '</ul>';

            res.send(`<h1>Full Cycle Rocks!</h1> ${namesList}`);
        });
    });
});

app.listen(port, () => {
    console.log(`Node.js app running on port ${port}`);
});