const express = require('express');
const router = express.Router();

const { requestController, imageController, eventController, languageController, tagController, userController } = require('./controllers/index')

const { newUserSchema, updateUserSchema, updateUserSecuritySchema } = require('./schemas/user')
const { newEventSchema, updateEventSchema } = require('./schemas/event')
const { validateBody, validateQuery, validateParams } = require('./middlewares/validator')
const checkJwt = require('../app/middlewares/checkJwt')

// --- EVENT
router.post('/events/search', eventController.search)

/**
 * Respond with one event from database
 * @route GET /events/{id}
 * @group Event
 * @summary Responds with event from database
 * @param {number} id.path.required id
 * @returns {Event.model} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
 * @returns {string} 500 - An error message
 * 
 */

router.get('/events/:id', eventController.findOneById);

router
    .route('/events')
    /**
     * Responds with all events in database
     * @route GET /events
     * @group Event
     * @summary Responds with all events in database
     * @returns {Array<Event>} 200 -An array of events
     * @returns {string} 500 - An error message
     */
    .get(eventController.findAll)
    /**
     * Add a new form of event
     * @route POST /events
     * @group Event
     * @summary Add a new event in database
     * @param {ReqEventJson.model | Event.model} object.body.required Object containing the properties to insert a event
     * @returns {Event.model} 201 - The newly created event
     * @returns {string} 500 - An error message
     * @returns {string} 400 - A validation error message
     */
    .post(validateBody(newEventSchema), eventController.create)
    /**
     * Updade a existing event
     * @route PUT /events
     * @group Event
     * @summary Update a existing event
     * @param {ReqEventJson | Event.model} object.body.required Object containing the properties to update a event
     * @returns {Event.model} 204 - the updating event
     * @returns {string} 500 - an error message
     * @returns {string} 404 - A validation error message
     * 
     */
    .patch(validateBody(updateEventSchema), eventController.update)
    /**
     * Delete an existing event
     * @route DELETE /events
     * @group Event
     * @summary Delete a existing event
     * @param {number} id.path.required id necessary for delete event
     * @returns {string} 200 - the event deleted
     * @returns {string} 500 - An error message
     * @returns {string} 404 - A validation error message
     */
    .delete(eventController.delete)

router
    .route('/events/quit')
    .delete(eventController.userLeaveEvent)

//? --- JOINING REQUEST
// router
//     .route('/events/request/:id')
//     .get(requestController.findAllJoiningRequest)

router
    .route('/events/request/:ownerId')
    /**
     * Find all Joining rtequest by Owner ID
     * @route GET /events/request/:id
     * @group Event
     * @summary Find all Joining Request by Owner ID
     * @param {number} id.path.required id necessary for search event
     * @returns {string} 201 - the event finded 
     * @returns {string} 500 - an error server
     * @returns {string} 404 - A validation error message
     */
    .get(requestController.findAllJoiningRequestByOwner)

router
    .route('/events/request/new')
    /**
     * Do a request on new event
     * @route POST /events
     * @group Event
     * @summary Add a new event in database
     * @param {ReqEventJson.model | Event.model} object.body.required Object containing the properties to insert a event
     * @returns {Event.model} 201 - The newly created event
     * @returns {string} 500 - An error message
     * @returns {string} 400 - A validation error message
     */
    .post(requestController.makeJoiningRequest)

router
    .route('/events/request/confirm')
    /**
     * confirm a new form of event
     * @route POST /events/request/confirm
     * @group Event
     * @summary Add a new event in database
     * @param {ReqEventJson.model | Event.model} object.body.required Object containing the properties to insert a event
     * @returns {Event.model} 201 - The newly created event
     * @returns {string} 500 - An error message
     * @returns {string} 400 - A validation error message
     */
    .post(requestController.confirmJoiningRequest)
    /**
     * Request of refuse a user on a event
     * @route DELETE /events/request/confirm
     * @group Event
     * @summary Delete a existing event
     * @param {number} id.path.required id necessary for delete event
     * @returns {string} 200 - the event deleted
     */
    .delete(requestController.refuseJoiningRequest)


//? --- LANGUAGE
router
    .route('/languages')
    /**
     * Responds with all events in database
     * @route GET /languages
     * @group Language
     * @summary Responds with all events in database
     * @returns {Array<Language>} 200 -An array of events
     * @returns {string} 500 - An error message
     */
    .get(languageController.findAll)
router
    .route('/speak')
    /**
     * Add a form for a new user who speak a language
     * @route POST /speak
     * @group Language
     * @summary Add a form for a new user who speak a language
     * @param {ReqUserJson.model | User.model} object.body.required Object containing the properties of user
     * @param {ReqLanguageJson.model | Language.model} object.body.requird Object containing the properties of language
     * @returns {Array<Language>} 200 - An array of language
     * @returns {string} 500 - An error message
     */
    .post(languageController.newUserSpeakLanguage)
    /**
    * Delete a user who learn a language
    * @route DELETE /speak
    * @group Language
    * @summary Delete a user who learn a language
    * @param {number} id.path.required the id of user who deleted
    * @returns {string} 200 - An user is deleted
    * @returns {string} 500 - an error message
    */
    .delete(languageController.deleteUserSpeakLanguage)
router
    .route('/learn')
    /**
     * Add a form for a new user who speak a language
     * @route POST /speak
     * @group Language
     * @summary Add a form for a new user who speak a language
     * @param {ReqUserJson.model | User.model} object.body.required Object containing the properties of user
     * @param {ReqLanguageJson.model | Language.model} object.body.requird Object containing the properties of language
     * @returns {Array<Language>} 200 - An array of language
     * @returns {string} 500 - An error message
     */
    .post(languageController.newUserLearnLanguage)
    /**
     * Delete a user who learn a language
     * @route DELETE /learn
     * @group Language
     * @summary Delete a user who learn a language
     * @param {number} id.path.required the id of user who deleted
     * @returns {string} 200 - An user is deleted
     * @returns {string} 500 - an error message
     */
    .delete(languageController.deleteUserLearnLanguage)

// router
//     .route('/speak')
//     .post(languageController.newUserSpeakLanguage)
//     .delete(languageController.deleteUserSpeakLanguage)

// router
//     .route('/learn')
//     .post(languageController.newUserLearnLanguage)
//     .delete(languageController.deleteUserLearnLanguage)

//? --- TAG
router
    .route('/tags')
    /**
    * Responds with all events in database
    * @route GET /tags
    * @group Tag
    * @summary Responds with all events in database
    * @returns {Array<Tag>} 200 -An array of events
    * @returns {string} 500 - An error message
    */
    .get(tagController.findAll)
    .delete(tagController.deleteEventHasTag)


//? --- USER
router
    .route('/users')
    /**
 * Responds with all users in database
 * @route GET /users
 * @group User
 * @summary Responds with all users in database
 * @returns {Array<User>} 200 -An array of users
 * @returns {string} 500 - An error message
 */
    .get(userController.findAll)
    /**
 * Add a new form of user
 * @route POST /users
 * @group User
 * @summary Add a new user in database
 * @param {ReqEventJson.model | Event.model} object.body.required Object containing the properties to insert a user
 * @returns {Event.model} 201 - The newly created user
 * @returns {string} 500 - An error message
 * @returns {string} 400 - A validation error message
 */
    .post(validateBody(newUserSchema), userController.create)
    /**
 * Updade a existing user
 * @route PUT /users
 * @group User
 * @summary Update a existing user
 * @param {ReqEventJson | Event.model} object.body.required Object containing the properties to update a user
 * @returns {Event.model} 204 - the updating user
 * @returns {string} 500 - an error message
 * @returns {string} 404 - A validation error message
 * 
 */
    .patch(validateBody(updateUserSchema), userController.update)
    /**
 * Delete an existing event
 * @route DELETE /users
 * @group User
 * @summary Delete a existing user
 * @param {number} id.path.required id necessary for delete user
 * @returns {string} 200 - the user deleted
 * @returns {string} 500 - An error message
 * @returns {string} 404 - A validation error message
 */
    .delete(userController.delete)

router
    .route('/imageprofil')
    /**
 * Respond with one user from database
 * @route POST /imageprofil
 * @group User
 * @summary Responds with one user from database
 * @param {number} id.path.required The id of the user to fetch
 * @param {string}  - email
 * @param {string}  -password user
 * @returns {User.model} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
 * @returns {string} 500 - An error message
 */
    .post(imageController.uploadProfil)

router
    .route('/resetpassword')
    .get(userController.findOneByEmail)
    /**
    * Modify a user's password with a email
    * @route PUT /resetpassword
    * @group User
    * @summary modify a user's password with a email
    * @param {number} id.path.required The id of user
    * @param {string} email.query.required the email of the user for modify password
    * @returns {Array<User>} 200 -An array of events
    * @returns {string} 500 - An error message
    */
    .patch(validateBody(updateUserSecuritySchema), userController.update)

router.post('/users/login', userController.login)

// GET /users/:id

/**
 * Respond with one user from database
 * @route GET /users/{id}
 * @group User
 * @summary Responds with one user from database
 * @param {number} id.path.required The id of the user to fetch
 * @param {string}  - email
 * @param {string}  -password user
 * @returns {User.model} 200 - A single post identified by its id
 * @returns {string} 404 - An error message
 * @returns {string} 500 - An error message
 */

router.get('/users/:id', userController.findOneById);

// POST/users/:id

//router.post('/users', userController.create)

//router.patch('/users', userController.update)

//router.delete('/users', userController.delete)




module.exports = router;
