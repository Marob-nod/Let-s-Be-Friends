const CoreModel = require('./coremodel');
const db = require('../database');
/**
 * A entity represent a request
 * @typedef Request
 */

/**
 * A model representing a class request
 */
class Request extends CoreModel {
    static tableName = 'request';
    /**
     * The request constructor
     * @param {object} obj a literal object
     */
    constructor(obj) {
        super(obj)
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }
    /**
     * Fetches an user
     * @param {number} user_id.path.required user_id
     * @param {number} event_id.path.required event_id
     * @returns {Request|null} null if not user or not event
     * @async
     * @static
     */
    static async newUserAskEvent(user_id, event_id) {
        try {
            const { rows } = await db.query('INSERT INTO "user_ask_event"(user_id, event_id) VALUES($1, $2) RETURNING user_id AS "userId", event_id AS "eventId"', [user_id, event_id])

            if (rows[0]) return new Request(rows[0]);
            else return { error: "Couldn't insert data into user_ask_event" };
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
    /**
     * Delete an user who ask an event
     * @param {number} user_id.path.required user_id
     * @param {number} event_id event_id 
     * @static
     * @async
     */

    static async deleteUserAskEvent(user_id, event_id) {
        try {
            const { rowCount } = await db.query('DELETE FROM "user_ask_event" WHERE user_id=$1 AND event_id=$2', [user_id, event_id])
            if (rowCount >= 1) return { rowsDeleted: rowCount, user_id, event_id }
            else return { error: "Relation not found" }
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
    /**
     * Fetches all users who joining event
     * @param {number} user_id.path.required user_id
     * @param {number} event_id.path.required event_id
     * @returns {Request|null} null if not user or not event
     * @async
     * @static
     */
    static async findAllJoiningRequest(event_id) {
        try {
            const { rows } = await db.query('SELECT * FROM "user_ask_event" WHERE event_id=$1', [event_id])

            if (rows) return rows.map(row => new Request(row));
            else return { error: `No request for event ${event_id}` };
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw new Error(error);
            }
        }
    }
    /**
     * Add an user in a event
     * @param {number} user_id.path.required user_id
     * @param {number} event_id.path.required event_id
     * @returns {Request|null} null if not user or not event find
     * @async
     * @static
     */

    static async newUserInEvent(user_id, event_id) {
        try {
            const { rows } = await db.query('INSERT INTO "user_participate_event"(user_id, event_id) VALUES($1, $2) RETURNING user_id AS "userId", event_id AS "eventId"', [user_id, event_id])
            if (rows[0]) return new Request(rows[0]);
            else return { error: "Couldn't insert data into user_participate_event" };
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
    /**
     * Fetches all users who
     * @param {number} user_id 
     * @returns {Request|null} null if not event find
     * @async
     * @static
     */

    static async findAllJoiningRequestByOwnerID(user_id) {
        try {
            console.log("debut de la requete", user_id)
            const { rows } = await db.query(`SELECT user_ask_event.event_id AS "eventId", json_agg(DISTINCT event.title) AS "title", json_agg(DISTINCT places_left) AS placesLeft,
            json_agg(
                DISTINCT jsonb_build_object(
                    'id', "user".id,
                    'firstname', "user".firstname,
                    'lastname', "user".lastname,
                    'description', "user".description,
                    'imgUrl', "user".img_url,
                    'email', "user".email,
                    'gender', "user".gender
                )
            ) AS "participants"
            FROM user_ask_event
            LEFT JOIN "event" ON user_ask_event.event_id = event.id
            LEFT JOIN "user" ON user_ask_event.user_id = "user".id
            WHERE event.user_id = $1
            GROUP BY user_ask_event.event_id`
                , [user_id])
            if (rows[0]) return rows.map(row => new Request(row));
            else return { error: `No request for event owned by the user ${user_id}` };
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }
};

module.exports = Request;