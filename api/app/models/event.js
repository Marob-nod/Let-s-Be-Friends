const CoreModel = require('./coremodel');
const db = require('../database');
const format = require('../services/formatSearchRequest')


/**
 * A entity representing a table event
 * @typedef Event
 * @property {number} id
 * @property {string} title
 * @property {string} img_url
 * @property {number} places_left
 * @property {string} description
 * @property {Date} starting_date
 * @property {Date} ending_date
 * @property {number} x.required longitude
 * @property {number} y.required latitude
 * @property {Date} created_at
 * @property {Date} updated_at
 */

/**
 * a model representing a class Event
 * @class Event
 */

class Event extends CoreModel {
	static tableName = 'event';
	/**
	 * The Event constructor
	 * @param {object} obj  a literal object with properties copied into the instance 
	 */
	constructor(obj) {
		super(obj)
		for (const propName in obj) {
			this[propName] = obj[propName];
		}
	}

	/**
	 * fetches a single id from the database
	 * @param {number} id.path.required id of the event we're looking for
	 * @returns {Event|null} null if no event matches the given in database
	 * @async
	 * @static
	 */

	static async findOneById(id) {

		try {

			const { rows } = await db.query(
				`SELECT event.id, event.title, event.description, event.starting_date AS "startingDate", event.ending_date AS "endingDate", 
				event.img_url AS "imgUrl",  event.places_left AS "placesLeft", event.address,event.longitude, event.latitude, event.user_id AS "ownerId",
				event.created_at AS "createdAt", event.updated_at AS "updatedAt",
				json_agg(
					DISTINCT jsonb_strip_nulls(
						jsonb_build_object(
						'id', language.id,
						'name', language.name
					))
				) AS languages,
				json_agg(
					DISTINCT jsonb_strip_nulls(
						jsonb_build_object(
						'id', tag.id,
						'name', tag.name,
						'color', tag.color
					))
				) AS tags,
				json_agg(
					DISTINCT jsonb_strip_nulls(
						jsonb_build_object(
						'id', "user".id,
						'firstname', "user".firstname,
						'lastname', "user".lastname,
						'gender', "user".gender,
						'email', "user".email,
						'bio', "user".description,
						'age', "user".age,
						'city', "user".city,
						'phoneNumber', "user".phone_number,
						'imgUrl', "user".img_url,
						'createdAt', "user".created_at,
						'updatedAt', "user".updated_at
					))
				) AS participants
				FROM event
				LEFT JOIN user_participate_event ON event.id = user_participate_event.event_id
				LEFT JOIN "user" ON "user".id = user_participate_event.user_id
				LEFT JOIN "event_has_tag" ON event.id = event_has_tag.event_id
				LEFT JOIN "tag" ON tag.id = event_has_tag.tag_id
				LEFT JOIN "event_has_language" ON event.id = event_has_language.event_id
				LEFT JOIN "language" ON language.id = event_has_language.language_id
				WHERE event.id = $1
				GROUP BY event.id`,
				[id]);

			if (rows[0]) return new Event(rows[0]);
			return { error: `Event with id ${id} doesn't exist` };

		} catch (error) {

			if (error.detail) throw new Error(error.detail)
			else throw error;

		}
	}

	/**
	 * fetches all events below on certain limit
	 * @param {number} limit.query.required
	 * @returns {Event|null} null if not event finded
	 * @static
	 * @async
	 */
	static async findAll(limit) {
		try {
			const { rows } = await db.query(
				`SELECT event.id, event.title, event.description, event.starting_date AS "startingDate", event.ending_date AS "endingDate", 
				event.img_url AS "imgUrl",  event.places_left AS "placesLeft", event.address,event.longitude, event.latitude, event.user_id AS "ownerId",
				event.created_at AS "createdAt", event.updated_at AS "updatedAt",
				json_agg(
					DISTINCT jsonb_strip_nulls(
						jsonb_build_object(
						'id', language.id,
						'name', language.name
					))
				) AS languages,
				json_agg(
					DISTINCT jsonb_strip_nulls(
						jsonb_build_object(
						'id', tag.id,
						'name', tag.name,
						'color', tag.color
					))
				) AS tags,
				json_agg(
					DISTINCT jsonb_strip_nulls(
						jsonb_build_object(
						'id', "user".id,
						'firstname', "user".firstname,
						'lastname', "user".lastname,
						'gender', "user".gender,
						'email', "user".email,
						'bio', "user".description,
						'age', "user".age,
						'city', "user".city,
						'phoneNumber', "user".phone_number,
						'imgUrl', "user".img_url,
						'createdAt', "user".created_at,
						'updatedAt', "user".updated_at
					))
				) AS participants
				FROM event
				LEFT JOIN user_participate_event ON event.id = user_participate_event.event_id
				LEFT JOIN "user" ON "user".id = user_participate_event.user_id
				LEFT JOIN "event_has_tag" ON event.id = event_has_tag.event_id
				LEFT JOIN "tag" ON tag.id = event_has_tag.tag_id
				LEFT JOIN "event_has_language" ON event.id = event_has_language.event_id
				LEFT JOIN "language" ON language.id = event_has_language.language_id
				GROUP BY event.id
				LIMIT $1`,
				[limit])

			return rows.map(row => new Event(row))
		} catch (error) {

			if (error.detail) throw new Error(error.detail)
			else throw error;
		}
	}
	/**
	 * add a new event
	 */
	async save() {
		try {
			if (this.id) {
				let count = 1;
				const properties = [];
				const values = [this.id];

				for (const key in this) {
					if (key == 'id') continue;
					properties.push(`"${key}"=$${++count}`)
					values.push(this[key])
				}

				const { rows } = await db.query(`UPDATE "event" SET ${properties} WHERE id=$1 RETURNING *`, values)
				if (rows.length) return new Event(rows[0])
				else return { error: `Event with id ${this.id} doesn't exist` }

			} else {
				const { rows } = await db.query('INSERT INTO event(title, starting_date, ending_date, img_url, places_left, description, longitude, latitude, user_id, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id', [
					this.title,
					this.starting_date,
					this.ending_date,
					this.img_url,
					this.places_left,
					this.description,
					this.longitude,
					this.latitude,
					this.user_id,
					this.address
				]);
				this.id = rows[0].id;
				return this
			}
		} catch (error) {

			if (error.detail) throw new Error(error.detail)
			else throw error;
		}
	}
	/**
	 * Fetches a event with a parameter
	 * @param {object} obj 
	 * @returns {Event|null} null if not event finded with a parameter
	 * @async
	 * @static
	}
	 */
	static async findByParameters(obj) {

		try {
			const finalObj = format(obj)
			console.log(finalObj)
			const { rows } = await db.query(`SELECT event.id, event.title, event.description, event.starting_date AS "startingDate", event.ending_date AS "endingDate", 
			event.img_url AS "imgUrl",  event.places_left AS "placesLeft", event.address,event.longitude, event.latitude, event.user_id AS "ownerId",
			event.created_at AS "createdAt", event.updated_at AS "updatedAt",
			json_agg(
				DISTINCT jsonb_strip_nulls(
					jsonb_build_object(
					'id', language.id,
					'name', language.name
				))
			) AS languages,
			json_agg(
				DISTINCT jsonb_strip_nulls(
					jsonb_build_object(
					'name', tag.name,
					'color', tag.color
				))
			) AS tags,
			json_agg(
				DISTINCT jsonb_strip_nulls(
					jsonb_build_object(
					'id', "user".id,
					'firstname', "user".firstname,
					'lastname', "user".lastname,
					'gender', "user".gender,
					'email', "user".email,
					'bio', "user".description,
					'age', "user".age,
					'city', "user".city,
					'phoneNumber', "user".phone_number,
					'imgUrl', "user".img_url,
					'createdAt', "user".created_at,
					'updatedAt', "user".updated_at
				))
			) AS participants
			FROM event
			FULL OUTER JOIN user_participate_event ON event.id = user_participate_event.event_id
			FULL OUTER JOIN "user" ON user_participate_event.user_id = "user".id
			FULL OUTER JOIN "event_has_tag" ON event.id = event_has_tag.event_id
			FULL OUTER JOIN "tag" ON event_has_tag.tag_id = tag.id
			FULL OUTER JOIN "event_has_language" ON event.id = event_has_language.event_id
			FULL OUTER JOIN "language" ON event_has_language.language_id = language.id
			${finalObj.query}
			GROUP BY event.id
			ORDER BY event.starting_date`, finalObj.values);

			if (rows.length) return rows.map(row => new Event(row));

			else return { error: `Event with doesn't exist` }

		} catch (error) {

			if (error.detail) throw new Error(error.detail)
			else throw error;
		}
	}
	/**
	 * Fetches a user who leave a event
	 * @param {number} user_id.path.required
	 * @param {number} event_id.path.required
	 * @returns {user|null} null if not user exist
	 * @returns {event|null} null if not event exist
	 * @static
	 * @async
	 */

	static async userLeaveEvent(user_id, event_id) {
		try {
			const { rowCount } = await db.query('DELETE FROM "user_participate_event" WHERE user_id=$1 AND event_id=$2', [user_id, event_id])
			if (rowCount >= 1) return { rowsDeleted: rowCount, user_id, event_id }
			else return { error: "Relation not found" }
		} catch (error) {
			if (error.detail) throw new Error(error.detail)
			else throw error;
		}
	}

	static async placesLeftDecrement(event_id) {
		try {
			const { rows } = await db.query('UPDATE event SET places_left=places_left-1 WHERE event.id = $1 RETURNING places_left', [event_id])
			let placesLeft = rows[0];
			placesLeft = placesLeft.places_left

			if (rows) return { placesLeft }
			else return { error: "Decrementation not allowed" }
		} catch (error) {
			if (error.detail) throw new Error(error.detail)
			else throw error;
		}
	}

	static async placesLeftIncrement(event_id) {
		try {
		const { rows } = await db.query('UPDATE event SET places_left=places_left+1 WHERE event.id = $1 RETURNING places_left', [event_id])
			let placesLeft = rows[0];
			placesLeft = placesLeft.places_left

			if (rows) return { placesLeft }
			else return { error: "Incrementation not allowed" }
		} catch (error) {
			if (error.detail) throw new Error(error.detail)
			else throw error;
		}
	}

}

module.exports = Event;
