/**
 * Filters a list of movies to retrieve only those marked as winners.
 *
 * @param {Array} movielist - The list of movies to be filtered.
 * @returns {Array} - A new array containing only the winning movies.
 */
const getMovielistWinners = (movielist) => {
  return movielist.filter((movie) => movie.winner === 1);
};

/**
 * Processes a string containing a list of values
 * separated by "and" or commas.
 *
 * @param {string} str - The input string to be processed.
 * @returns {Array} - An array of values extracted from the input string.
 */
const getSplitedGroupList = (str) => {
  return str
    .replace(/ and /g, ",")
    .split(",")
    .map((val) => val.trim())
    .filter((val) => val != "");
};

/**
 * Organizes a list of movies by grouping them based on their producers
 * and collecting the associated movie years.
 *
 * @param {Array} movielist - The list of movies to be processed.
 * @returns {Object} - An object where each producer is a key, and the associated value is an array of movie years.
 */
const getProducersByMovieYear = (movielist) => {
  const output = {};

  movielist.forEach((movie) => {
    if (movie.producer) {
      if (!output[movie.producer]) {
        output[movie.producer] = [];
      }

      output[movie.producer].push(movie.year);
    }
  });

  return output;
};

/**
 * Transforms a list of movies by separating each movie based on its producers.
 *
 * @param {Array} movielist - The list of movies to be processed.
 * @returns {Array} - A new list of movies, each entry representing a movie with a single producer.
 */
const getMovielistByProducers = (movielist) => {
  let output = [];

  movielist.forEach((movie) => {
    const movieProducers = getSplitedGroupList(movie.producers);

    movieProducers.forEach((producer) => {
      delete movie.producers;

      output.push({
        ...movie,
        producer,
      });
    });
  });

  return output;
};

/**
 * Processes a mapping of producers to their associated movie years
 * and calculates intervals between consecutive winning years.
 *
 * @param {Object} producersByYear - An object where keys are producer names and values are arrays of winning years.
 * @returns {Array} - An array containing objects with information about the intervals between consecutive wins for producers with two or more wins.
 */
const getIntervalProducersByYear = (producersByYear) => {
  const output = [];
  const producers = Object.keys(producersByYear);

  producers.forEach((producer) => {
    const years = producersByYear[producer].sort();

    if (years.length >= 2) {
      years.forEach((year, idx) => {
        const nextYear = years[idx + 1];

        if (nextYear) {
          output.push({
            producer,
            interval: nextYear - year,
            previousWin: year,
            followingWin: nextYear,
          });
        }
      });
    }
  });

  return output;
};

/**
 * Organizes a list of producers into groups based on their intervals.
 *
 * @param {Array} producers - The list of producers to be processed.
 * @returns {Object} - An object where keys are intervals and values are arrays of producers with the corresponding interval.
 */
const getProducersByInterval = (producers) => {
  const intervalGroups = {};

  producers.forEach((producer) => {
    if (!intervalGroups[producer.interval]) {
      intervalGroups[producer.interval] = [];
    }

    intervalGroups[producer.interval].push(producer);
  });

  return intervalGroups;
};

/**
 * Processes movie data to determine producers with the minimum
 * and maximum intervals between consecutive winning years.
 *
 * @param {Array} data - The input data representing a list of movies.
 * @returns {Object} - An object containing two arrays, `min` and `max`, each holding information about producers with the minimum and maximum intervals.
 */
const getMinAndMaxProducerWinnersByInterval = (data) => {
  let min = [],
    max = [];

  const movielistWinners = getMovielistWinners(data);
  const movielistByProducers = getMovielistByProducers(movielistWinners);
  const producersByMovieYear = getProducersByMovieYear(movielistByProducers);
  const producersByYear = getIntervalProducersByYear(producersByMovieYear);
  const producersByInterval = getProducersByInterval(producersByYear);

  const intervals = Object.keys(producersByInterval);
  const minInterval = 1;
  const maxInterval = intervals[intervals.length - 1];

  if (producersByInterval[minInterval]) {
    min = producersByInterval[minInterval];
  }

  if (producersByInterval[maxInterval] && maxInterval != minInterval) {
    max = producersByInterval[maxInterval];
  }

  return {
    min,
    max,
  };
};

module.exports = {
  getMovielistWinners,
  getSplitedGroupList,
  getProducersByMovieYear,
  getMovielistByProducers,
  getIntervalProducersByYear,
  getProducersByInterval,
  getMinAndMaxProducerWinnersByInterval,
};
