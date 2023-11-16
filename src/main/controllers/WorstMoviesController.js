const MovielistModel = require("../databases/models/Movielist");
const WorstMoviesUsecase = require("../usecases/WorstMoviesUsecase");

module.exports = WorstMoviesController = {
  home: async (req, res) => {
    try {
      const movies = await MovielistModel.getAll();

      const response =
        WorstMoviesUsecase.getMinAndMaxProducerWinnersByInterval(movies);

      res.json(response);
    } catch (error) {
      console.error(
        `[WorstMoviesController.js:home] Error on getting producers: ${error}`
      );

      res.status(500).json({ error: "An error has occurred" });
    }
  },
};
