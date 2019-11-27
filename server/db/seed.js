const { db, Event } = require('./index.js');

const eventsToBe = [
    {
        title: 'Senior Checkpoint',
        date: '12-9-2019',
    },
    {
        title: 'Thanksgiving',
        date: '11-28-2019',
    }
];


const seed = async () => {

    try {
       const [senior, thanksgiving] = await Promise.all(eventsToBe.map(event => Event.create(event)));

    }
    catch (e){
        console.log('whoops', e)
    }

}

// db.sync({force: true})
//     .then(() => seed())



module.exports = { seed, db };