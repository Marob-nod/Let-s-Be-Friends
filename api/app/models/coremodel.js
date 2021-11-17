const db = require('../database');
/**
 * An entity representing a class coremodel
 */


/**
 * A model rrepresenting a class coreModel
 * @class CoreModel
 */

class CoreModel {
	id;
	/**
	 * The coreModel constructor
	 * @param {object} obj a literal object with properties copied into the instance
	 */
	constructor(obj) {
		if (this.id) {
			this.id = obj.id;
		}
	}

	get id() {
		return this.id;
	}

	set id(id) {
		if (typeof id !== 'number') throw Error('id doit être un nombre !');
		this.id = id;
	}

	/**
	 * Delete a instance of the model or to target one specify id
	 */

	static async delete(id) {
		const tableName = this.tableName;
		//Allow to delete the actual instance of the model or to target one specify id
		try {
			await db.query(`DELETE FROM "${tableName}" WHERE id=$1`, [id])
		} catch (error) {
			if (error.detail) {
				throw new Error(error.detail)
			} else {
				throw error;
			}
		}
	}
}

module.exports = CoreModel