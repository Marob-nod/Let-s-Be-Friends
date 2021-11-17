const request = require('supertest');
const app = require('../index')

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const id = getRandomIntInclusive(1, 50);
const email = `test14${getRandomIntInclusive(3, 999)}@daube.com`
const age = `${getRandomIntInclusive(18, 58)}`

//==================== user API test ====================
/**
 * Testing get all user endpoint
 */
describe('GET v1/users', function () {
    it('should respond with json containing a list of all users (with a limit of 10)', function (done) {
        request(app)
            .get('/v1/users')
            .query({ limit: 10 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});

/**
 * Testing get a user endpoint by giving an existing user id
 */
describe('GET v1/users/:id', function () {
    it('should respond with json containing a single user', function (done) {
        request(app)
            .get('/v1/users/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing post user endpoint
 */
describe('POST /users', function () {
    let data = {
        "firstname": "test-first-name",
        "lastname": "test_last_name",
        "email": email,
        "password": "fvzefgzefzerf",
        "confirmPassword": "fvzefgzefzerf",
        "gender": "male",
        "phone_number": "04546574984"
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/v1/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
/**
 * Testing get a user endpoint by giving a non-existing user
 */
describe('GET /v1/user/:id', function () {
    it('should respond with json user not found', function (done) {
        request(app)
            .get('/v1/users/176877')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"user not found"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post user endpoint
 */
describe('POST /users', function () {
    let data = {
        //no id
        "name": "dummy",
        "contact": "dummy",
        "address": "dummy"
    }
    it('respond with 400 not created', function (done) {
        request(app)
            .post('/v1/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing patch user endpoint
 */
describe('PATCH /users', function () {
    let data = {
        "id": 2,
        "age": age,
    }
    it('Update the profil of a user, and return 200 and the profil updated', function (done) {
        request(app)
            .patch('/v1/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('PATCH /users', function () {
    let data = {
        "id": id,
        "age": age,
        "fakedata": "Riendutous"
    }
    it('should be refused, return 400, and the data that has not been allowed', function (done) {
        request(app)
            .patch('/v1/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"\\"fakedata\\" is not allowed"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing DELETE user endpoint
 */
describe('DELETE /users', function () {
    let data = {
        id: id,
    }
    it('Delete one user by ID', function (done) {
        request(app)
            .delete('/v1/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(`"DELETE user with id ${id} : ok"`)
            .end(done)
    });
});

/**
 * Testing bad login user 
 */
describe('GET /users/login bad login', function () {
    let data = {
        "email": "test89@gmail.com",
        "password": "1234"
    }
    it('should be refused, return 401 and a message', function (done) {
        request(app)
            .post('/v1/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .expect('"email or password not correct"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
/**
 * Testing good login user 
 */
describe('GET /users/login', function () {
    let data = {
        "email": email,
        "password": "fvzefgzefzerf"
    }
    it('should be accepted, return 200 and user', function (done) {
        request(app)
            .post('/v1/users/login')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});



//==================== event API test ====================
/**
 * Testing get all event endpoint
 */
describe('GET /v1/events', function () {
    it('should respond with json containing a list of all events (with a limit of 10)', function (done) {
        request(app)
            .get('/v1/events')
            .query({ limit: 10 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});

/**
 * Testing get a event endpoint by giving an existing event id
 */
describe('GET /v1/events/:id', function () {
    it('should respond with json containing a single event', function (done) {
        request(app)
            .get('/v1/events/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a event endpoint by giving a non-existing user
 */
describe('GET /v1/event/:id Failing', function () {
    it('should respond with json event not found and 404 code', function (done) {
        request(app)
            .get('/v1/events/176877')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(418)
            .expect({ "error": "Event with id 176877 doesn't exist" }) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});


/**
 * Testing post event endpoint
 */
describe('POST /events', function () {
    let data = {
        "title": "efefefef",
        "starting_date": "2021-10-20T06:00:26.000Z",
        "ending_date": "2021-11-09T15:35:03.000Z",
        "img_url": "http://dummyimage.com/103x100.png/5fa2dd/ffffff",
        "places_left": 6,
        "description": "V, tempus sit amet, sem.",
        "address": "11 rue du parc, bron",
        "user_id": 1
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/v1/events')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post event endpoint
 */
describe('POST /events', function () {
    let data = {
        //no id
        "name": "dummy",
        "contact": "dummy",
        "address": "dummy"
    }
    it('respond with 400 not created', function (done) {
        request(app)
            .post('/v1/events')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});


/**
 * Testing patch event endpoint
 */
describe('PATCH /events', function () {
    let data = {
        "id": 1,
        "title": "BBQ saucisse"
    }
    it('Update an event, return 200 and the event updated', function (done) {
        request(app)
            .patch('/v1/events')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing patch event endpoint
 */
describe('PATCH /events', function () {
    let data = {
        "fakedata": id,
        "kjbkjb": age,
        "fakedata": "Riendutous"
    }
    it('should be refused, return 400, and the data that has not been allowed', function (done) {
        request(app)
            .patch('/v1/events')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"\\"fakedata\\" is not allowed"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing DELETE event endpoint
 */
describe('DELETE /events', function () {
    let data = {
        id: id,
    }
    it('Delete one event by ID', function (done) {
        request(app)
            .delete('/v1/events')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(`"DELETE event with id ${id} : ok"`)
            .end(done)
    });
});

//==================== event API test ====================

/**
 * Testing new relation user_speak_language
 */
describe('POST /v1/speak', function () {
    let data = {
        "userId": "1",
        "languageId": "2"
    }
    it('should return 201 and the relation created', function (done) {
        request(app)
            .post('/v1/speak')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});
/**
 * Testing new relation user_learn_language
 */
describe('POST /v1/learn', function () {
    let data = {
        "userId": "1",
        "languageId": "2"
    }
    it('should return 200 and the relation created', function (done) {
        request(app)
            .post('/v1/learn')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});

/**
 * Testing delete relation user_speak_language
 */
describe('DELETE /v1/speak', function () {
    let data = {
        "userId": "1",
        "languageId": "2",
    }
    it('should return 200', function (done) {
        request(app)
            .delete('/v1/speak')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});
/**
 * Testing delete relation user_learn_language
 */
describe('DELETE /v1/learn', function () {
    let data = {
        "userId": "1",
        "languageId": "2",
    }
    it('should return 200', function (done) {
        request(app)
            .delete('/v1/learn')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    });
});
