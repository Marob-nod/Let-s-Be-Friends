const CoreModel = require('./coremodel');
const db = require('../database');

/**
 * An entity representing a table language
 * @typedef Language
 * @property {number} id
 * @property {string} name
 * @property {string} img_url
 * @property {Date} created_at
 * @property {Date} updated_at
*/

/**
 * a model representing a class language
 * @class Language
 */

class Language extends CoreModel {
    static tableName = 'language';
    /**
     * The Language constructor
     * @param {Object} obj a literal object with properties copied into the instance 
     */

    constructor(obj) {
        super(obj)
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }
    /**
     * Fetches a id of user and id of language
     * @param {number} user_id 
     * @param {number} language_id 
     * @returns {user|null} null if user not exist
     * @returns {Language|null} null if language not exist
     * @static
     * @async
     */


    static async newUserSpeakLanguage(user_id, language_id) {
        try {
            const { rows } = await db.query('INSERT INTO "user_speak_language"(user_id, language_id) VALUES($1, $2) RETURNING user_id AS "userId", language_id AS "languageId"', [user_id, language_id]);

            if (rows[0]) return new Language(rows[0]);
            else return { error: "Couldn't insert data into user_speak_language" };
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
     * Delete a id of user and id of language
     * @param {number} user_id.query.required
     * @param {number} language_id 
     * @returns {string}
     * @static
     * @async
     */

    static async deleteUserSpeakLanguage(user_id) {
        try {
            const { rowCount } = await db.query('DELETE FROM "user_speak_language" WHERE user_id=$1', [user_id])

            if (rowCount >= 1) return { rowsDeleted: rowCount, user_id }
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
     * Add a new user who want learn a language
     * @param {number} user_id.path.required user_id
     * @param {number} language_id.path.required language_id
     * @returns {language|null} null if no language exist
     * @async
     * @static
     */

    static async newUserLearnLanguage(user_id, language_id) {
        try {
            const { rows } = await db.query('INSERT INTO "user_learn_language"(user_id, language_id) VALUES($1, $2) RETURNING user_id AS "userId", language_id AS "languageId"', [user_id, language_id]);

            if (rows[0]) return new Language(rows[0]);
            else return { error: "Couldn't insert data into user_learn_language", user_id, language_id };
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
     * Delete a id of user and id of language
     * @param {number} user_id.query.required user_id
     * @param {number} language_id language_id
     * @returns {string}
     * @static
     * @async
     */

    static async deleteUserLearnLanguage(user_id) {
        try {
            console.log(user_id)
            const { rowCount } = await db.query('DELETE FROM "user_learn_language" WHERE user_id=$1', [user_id]);
            if (rowCount >= 1) return { rowsDeleted: rowCount, user_id }
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
     * Add language in a event
     * @param {number} event_id.query.required event_id
     * @param {number} language_id.query.required language_id
     * @returns {Language|null} null if language is not rxist
     * @async
     * @static
     */
    static async newEventHasLanguage(event_id, language_id) {
        try {
            const { rows } = await db.query('INSERT INTO "event_has_language"(event_id, language_id) VALUES($1, $2) RETURNING event_id AS "eventId", language_id AS "languageId"', [event_id, language_id])

            if (rows[0]) return new Language(rows[0]);
            else return { error: "Couldn't insert data into event_has_language", event_id, language_id };
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
     * Delete a event who has language
     * @returns {string}  an event is deleted
     * @static
     * @async
     */

    static async deleteEventHasLanguage(event_id) {
        try {
            const { rowCount } = await db.query('DELETE FROM "event_has_language" WHERE event_id=$1', [event_id]);

            if (rowCount >= 1) return { rowsDeleted: rowCount, event_id }
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
     * Fetches all languages in the database
     * @returns {Language|null} null if not language in database
     * @async
     * @static
     */

    static async findAll() {
        try {
            const { rows } = await db.query('SELECT language.id, language.name FROM language')

            if (rows) return rows.map(row => new Language(row));
            else return { error: "Couldn't find any data" };
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

module.exports = Language;