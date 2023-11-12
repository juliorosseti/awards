const MovielistModel = require("../databases/models/Movielist");
const WorstMoviesUsecase = require("../usecases/WorstMoviesUsecase");

module.exports = WorstMoviesController = {
  home: async (req, res) => {
    const movies = await MovielistModel.getAll();

    const response =
      WorstMoviesUsecase.getMinAndMaxProducerWinnersByInterval(movies);

    res.json(response);
  },
};
