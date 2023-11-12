const MovielistModel = require("../database/models/Movielist");
const WorstMoviesUsecase = require("../usecase/WorstMoviesUsecase");

module.exports = WorstMoviesController = {
  home: async (req, res) => {
    const movies = await MovielistModel.getAll();

    const response =
      WorstMoviesUsecase.getMinAndMaxProducerWinnersByInterval(movies);

    res.json(response);
  },
};
