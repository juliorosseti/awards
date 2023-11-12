const fs = require("node:fs");

/**
 * Reads data from a CSV file and returns an array of rows.
 *
 * @param {string} filePath - The path to the CSV file.
 * @param {boolean} withHeader - A flag indicating whether to include the header row. Default is false.
 * @returns {Promise<Array>} - A promise that resolves to an array of rows.
 */
const getRows = async (filePath, withHeader = false) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const rows = data.split("\n").map((row) => row.split(";"));

  if (!withHeader) {
    rows.shift(); // remove header
  }

  return rows;
};

module.exports = { getRows };
