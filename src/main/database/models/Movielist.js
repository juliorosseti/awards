const Movielist = require("../schemas/Movielist");

/**
 * Inserts new movie data into the Movielist model or schema.
 *
 * @param {Object} data - The data representing a new movie entry.
 * @returns {Promise} - A promise that resolves to the newly created movie entry.
 */
async function insert(data) {
  return await Movielist.create(data);
}

/**
 * Retrieves all movie entries from the Movielist model or schema.
 *
 * @returns {Promise} - A promise that resolves to an array of movie entries.
 */
async function getAll() {
  return await Movielist.findAll({ raw: true });
}

module.exports = { insert, getAll };
