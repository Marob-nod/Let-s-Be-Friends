require('dotenv').config();
const { Event } = require('../app/models/index');
const db = require('../app/database.js');

//Test model Event
const testFindAllEvents = async () => {
    const events = await Event.findAll();
    console.log('Test model Event.findAll ==> nb d\'events: ', events.length);
}
testFindAllEvents()

const testFindOneEvent = async (id) => {
    const event = await Event.findOneById(id);
    console.log('test numéro1 model Event.findOne ==> Existe: ', event ? true : false);
    console.log(event)
    return event
}
const event = testFindOneEvent(20)


const mock = {
    id: 10000,
    title: 'TestTestTest',
    starting_date: '2021-10-20 08:55:30+02',
    ending_date: '2021-11-09 02:34:36+01',
    img_url: 'http://dummyimage.com/108x100.png/ff4444/ffffff',
    places_left: 4,
    description: 'oizehfôziaefhẑeahfiuzaehfgipuzehagfpiuh',
    longitude: 12.12,
    latitude: 69.69,
    user_id: 3,
}

// const testSaveEvent = async (mock) => {
//     console.log(event)
// }
// // testSaveEvent();


db.end();




// ! SELECT * FROM "user" JOIN "user_participate_event" ON ("user".id = user_id);

//! SELECT * FROM "user","event" JOIN "user_participate_event" ON ("event".id = event_id);

//! SELECT "user".firstname , language.name FROM "user","language" JOIN "user_learn_language" ON ("language".id = language_id);