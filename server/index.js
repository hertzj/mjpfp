const { app } = require('./app.js');
const { db } = require('./db/index.js');
const PORT = 3000;

db.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log('listening on port: ', PORT)
            console.log(`http://localhost:${PORT}`)
        });
    })
    .catch(e => {
        console.log('error with connection: ', e)
    });