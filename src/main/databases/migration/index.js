const path = require("node:path");
const sequelize = require("../Database");
const csvHelper = require("../../helpers/csv");
const MovielistModel = require("../models/Movielist");

const importCsv = async (csvPath) => {
  const rows = await csvHelper.getRows(csvPath);

  for (const row of rows) {
    if (row.length === 5) {
      const [year, title, studios, producers, winner] = row;

      MovielistModel.insert({
        title,
        studios,
        producers,
        year: parseInt(year),
        winner: winner === "yes" ? 1 : 0,
      });
    }
  }
};

module.exports = {
  up: async () => {
    const csvPath = path.join(__dirname, "data/movielist.csv");

    await sequelize.sync({ force: true });
    await importCsv(csvPath);
  },
};
