const { app } = require('./app.js');
const { db } = require('./db/seed.js');
const PORT = 3000;;
const { seed } = require('./db/seed.js')

db.sync({force: true})
    .then(() => seed())
    .then(() => {
        app.listen(PORT, () => {
            console.log('listening on port: ', PORT)
            console.log(`http://localhost:${PORT}`)
        });
    })
    .catch(e => {
        console.log('error with connection: ', e)
    });