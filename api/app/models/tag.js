const CoreModel = require('./coremodel');
const db = require('../database');

/**
 * An entity representing a table Tag
 * @typedef Tag
 * @property {number} id
 * @property {string} name
 * @property {string} color
 * @property {Date} created_at
 * @property {Date} updated_at
 */


/**
 * A model representing a class Tag
 * @class Tag
 */
class Tag extends CoreModel {
    static tableName = 'tag';

    /**
     * The Tag constructor
     * @param {object} obj a literal object with properties copied into the instance
     */

    constructor(obj) {
        super(obj)
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }
    /**
     * Fetches all tags from the database
     * @returns {Tag|null} null if not tags in database
     * @async
     * @static
     */

    static async findAll() {
        try {

            const { rows } = await db.query('SELECT tag.id, tag.name FROM tag')
            return rows.map(row => new Tag(row))

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
     * Add a new event with a tag
     * @param {number} event_id.path.required
     * @param {number} tag_id.path.required
     * @returns {Tag|null} null if tag not exist
     * @static
     * @async
     */
    static async newEventHasTag(event_id, tag_id) {
        try {
            const { rows } = await db.query('INSERT INTO "event_has_tag"(event_id, tag_id) VALUES($1, $2) RETURNING event_id AS "eventId", tag_id AS "tagId"', [event_id, tag_id]);

            if (rows[0]) return new Tag(rows[0]);
            else return { error: "Couldn't insert data into event_has_tag" };
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
     * Delete a event with a tag
     * @param {number} event_id.path.required
     * @param {number} tag_id 
     * @returns {string} -An event is deleted
     * @async
     * @static
     */

    static async deleteEventHasTag(event_id, tag_id) {
        try {
            const { rowCount } = await db.query('DELETE FROM "event_has_tag" WHERE event_id=$1', [event_id])

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


};

module.exports = Tag;