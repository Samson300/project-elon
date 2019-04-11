const pgp = require('pg-promise')({
    query: e => {
        console.log('QUERY: ', e.query);
    }
});

const options = {
    host: 'localhost',
    // Need to add database name
    database: 'ElonDB',
}

const db = pgp(options);

module.exports = db;