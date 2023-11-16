const assert = require("node:assert");
const { it, describe } = require("node:test");
const {
  getMovielistWinners,
  getSplitedGroupList,
  getProducersByMovieYear,
  getMovielistByProducers,
  getIntervalProducersByYear,
  getProducersByInterval,
  getMinAndMaxProducerWinnersByInterval,
} = require("../../../main/usecases/WorstMoviesUsecase");

describe("Given WorstMovies starts", () => {
  describe("When getMovielistWinners is called", () => {
    it("Then should return an empty list if there are no movies", () => {
      const result = getMovielistWinners([]);
      assert.deepEqual(result, []);
    });

    it("Then should return only winning films", () => {
      const movielist = [
        { title: "Movie1", winner: 0 },
        { title: "Movie2", winner: 1 },
        { title: "Movie3", winner: 1 },
        { title: "Movie4", winner: 0 },
      ];

      const result = getMovielistWinners(movielist);
      assert.deepEqual(result, [
        { title: "Movie2", winner: 1 },
        { title: "Movie3", winner: 1 },
      ]);
    });

    it("Then should not modify the original list", () => {
      const movielist = [
        { title: "Movie1", winner: 0 },
        { title: "Movie2", winner: 1 },
        { title: "Movie3", winner: 1 },
        { title: "Movie4", winner: 0 },
      ];

      getMovielistWinners(movielist);

      assert.deepEqual(movielist, [
        { title: "Movie1", winner: 0 },
        { title: "Movie2", winner: 1 },
        { title: "Movie3", winner: 1 },
        { title: "Movie4", winner: 0 },
      ]);
    });
  });

  describe("When getSplitedGroupList is called", () => {
    it("Then should return an empty array if the input string is empty", () => {
      const result = getSplitedGroupList("");
      assert.deepEqual(result, []);
    });

    it("Then should correctly process a simple comma-separated list", () => {
      const str = "item1, item2, item3";
      const result = getSplitedGroupList(str);
      assert.deepEqual(result, ["item1", "item2", "item3"]);
    });

    it('Then should correctly process a list separated by "and"', () => {
      const str = "item1 and item2 and item3";
      const result = getSplitedGroupList(str);
      assert.deepEqual(result, ["item1", "item2", "item3"]);
    });

    it("Then should handle extra spaces around values", () => {
      const str = "   item1,    item2   ,   item3   ";
      const result = getSplitedGroupList(str);
      assert.deepEqual(result, ["item1", "item2", "item3"]);
    });

    it('Then should handle a mix of "and" and commas', () => {
      const str = "item1, item2 and item3, item4 and item5";
      const result = getSplitedGroupList(str);
      assert.deepEqual(result, ["item1", "item2", "item3", "item4", "item5"]);
    });

    it("Then should remove empty values from the resulting list", () => {
      const str = "item1,, item2 and , item3";
      const result = getSplitedGroupList(str);
      assert.deepEqual(result, ["item1", "item2", "item3"]);
    });
  });

  describe("When getProducersByMovieYear is called", () => {
    it("Then should return an empty object if the movie list is empty", () => {
      const result = getProducersByMovieYear([]);
      assert.deepEqual(result, {});
    });

    it("Then should organize producers correctly by movie year", () => {
      const movielist = [
        { title: "Movie1", producer: "Producer1", year: 2000 },
        { title: "Movie2", producer: "Producer2", year: 2001 },
        { title: "Movie3", producer: "Producer1", year: 2000 },
        { title: "Movie4", producer: "Producer2", year: 2001 },
      ];

      const result = getProducersByMovieYear(movielist);
      assert.deepEqual(result, {
        Producer1: [2000, 2000],
        Producer2: [2001, 2001],
      });
    });

    it("Then should handle producers with only one movie", () => {
      const movielist = [
        { title: "Movie1", producer: "Producer1", year: 2000 },
        { title: "Movie2", producer: "Producer2", year: 2001 },
        { title: "Movie3", producer: "Producer1", year: 2002 },
      ];

      const result = getProducersByMovieYear(movielist);
      assert.deepEqual(result, {
        Producer1: [2000, 2002],
        Producer2: [2001],
      });
    });

    it("Then should return an empty object if there are no producers", () => {
      const movielist = [
        { title: "Movie1", year: 2000 },
        { title: "Movie2", year: 2001 },
        { title: "Movie3", year: 2002 },
      ];

      const result = getProducersByMovieYear(movielist);
      assert.deepEqual(result, {});
    });
  });

  describe("When getMovielistByProducers is called", () => {
    it("Then should return an empty array if the input movielist is empty", () => {
      const result = getMovielistByProducers([]);
      assert.deepEqual(result, []);
    });

    it("Then should transform movielist by separating movies based on producers", () => {
      const movielist = [
        { title: "Movie1", producers: "Producer1, Producer2" },
        { title: "Movie2", producers: "Producer3" },
        { title: "Movie3", producers: "Producer1, Producer2, Producer3" },
      ];

      const result = getMovielistByProducers(movielist);

      assert.deepEqual(result, [
        { title: "Movie1", producer: "Producer1" },
        { title: "Movie1", producer: "Producer2" },
        { title: "Movie2", producer: "Producer3" },
        { title: "Movie3", producer: "Producer1" },
        { title: "Movie3", producer: "Producer2" },
        { title: "Movie3", producer: "Producer3" },
      ]);
    });

    it("Then should handle a movie with a single producer", () => {
      const movielist = [{ title: "Movie1", producers: "Producer1" }];

      const result = getMovielistByProducers(movielist);

      assert.deepEqual(result, [{ title: "Movie1", producer: "Producer1" }]);
    });

    it("Then should handle an empty producers field by keeping the movie intact", () => {
      const movielist = [
        { title: "Movie1", producers: "" },
        { title: "Movie2", producers: "Producer1, Producer2" },
      ];

      const result = getMovielistByProducers(movielist);

      assert.deepEqual(result, [
        { title: "Movie2", producer: "Producer1" },
        { title: "Movie2", producer: "Producer2" },
      ]);
    });
  });

  describe("When getIntervalProducersByYear is called", () => {
    it("Then should return an empty object if the input producersByYear is empty", () => {
      const result = getIntervalProducersByYear({});
      assert.deepEqual(result, []);
    });

    it("Then should handle producers with only one win", () => {
      const producersByYear = {
        Producer1: [2000],
        Producer2: [2001],
      };

      const result = getIntervalProducersByYear(producersByYear);

      assert.deepEqual(result, []);
    });

    it("Then should handle producers with no wins", () => {
      const producersByYear = {
        Producer1: [],
        Producer2: [],
      };

      const result = getIntervalProducersByYear(producersByYear);

      assert.deepEqual(result, []);
    });

    it("Then should calculate intervals between consecutive wins for producers with two or more wins", () => {
      const producersByYear = {
        Producer1: [2000, 2002, 2005],
        Producer2: [2001, 2003, 2006, 2009],
        Producer3: [2004, 2007],
      };

      const result = getIntervalProducersByYear(producersByYear);

      assert.deepEqual(result, [
        {
          producer: "Producer1",
          interval: 2,
          previousWin: 2000,
          followingWin: 2002,
        },
        {
          producer: "Producer1",
          interval: 3,
          previousWin: 2002,
          followingWin: 2005,
        },
        {
          producer: "Producer2",
          interval: 2,
          previousWin: 2001,
          followingWin: 2003,
        },
        {
          producer: "Producer2",
          interval: 3,
          previousWin: 2003,
          followingWin: 2006,
        },
        {
          producer: "Producer2",
          interval: 3,
          previousWin: 2006,
          followingWin: 2009,
        },
        {
          producer: "Producer3",
          interval: 3,
          previousWin: 2004,
          followingWin: 2007,
        },
      ]);
    });
  });

  describe("When getProducersByInterval is called", () => {
    it("Then should return an empty object if the input producers array is empty", () => {
      const result = getProducersByInterval([]);
      assert.deepEqual(result, {});
    });

    it("Then should group producers correctly by interval", () => {
      const producers = [
        {
          producer: "Producer1",
          interval: 1,
          previousWin: 2000,
          followingWin: 2001,
        },
        {
          producer: "Producer2",
          interval: 2,
          previousWin: 2002,
          followingWin: 2004,
        },
        {
          producer: "Producer1",
          interval: 1,
          previousWin: 2005,
          followingWin: 2006,
        },
        {
          producer: "Producer2",
          interval: 2,
          previousWin: 2007,
          followingWin: 2009,
        },
      ];

      const result = getProducersByInterval(producers);

      assert.deepEqual(result, {
        1: [
          {
            producer: "Producer1",
            interval: 1,
            previousWin: 2000,
            followingWin: 2001,
          },
          {
            producer: "Producer1",
            interval: 1,
            previousWin: 2005,
            followingWin: 2006,
          },
        ],
        2: [
          {
            producer: "Producer2",
            interval: 2,
            previousWin: 2002,
            followingWin: 2004,
          },
          {
            producer: "Producer2",
            interval: 2,
            previousWin: 2007,
            followingWin: 2009,
          },
        ],
      });
    });

    it("Then should handle producers with different intervals", () => {
      const producers = [
        {
          producer: "Producer1",
          interval: 1,
          previousWin: 2000,
          followingWin: 2001,
        },
        {
          producer: "Producer2",
          interval: 3,
          previousWin: 2002,
          followingWin: 2005,
        },
        {
          producer: "Producer1",
          interval: 1,
          previousWin: 2006,
          followingWin: 2007,
        },
        {
          producer: "Producer2",
          interval: 3,
          previousWin: 2008,
          followingWin: 2011,
        },
      ];

      const result = getProducersByInterval(producers);

      assert.deepEqual(result, {
        1: [
          {
            producer: "Producer1",
            interval: 1,
            previousWin: 2000,
            followingWin: 2001,
          },
          {
            producer: "Producer1",
            interval: 1,
            previousWin: 2006,
            followingWin: 2007,
          },
        ],
        3: [
          {
            producer: "Producer2",
            interval: 3,
            previousWin: 2002,
            followingWin: 2005,
          },
          {
            producer: "Producer2",
            interval: 3,
            previousWin: 2008,
            followingWin: 2011,
          },
        ],
      });
    });

    it("Then should handle a single producer", () => {
      const producers = [
        {
          producer: "Producer1",
          interval: 1,
          previousWin: 2000,
          followingWin: 2001,
        },
      ];

      const result = getProducersByInterval(producers);

      assert.deepEqual(result, {
        1: [
          {
            producer: "Producer1",
            interval: 1,
            previousWin: 2000,
            followingWin: 2001,
          },
        ],
      });
    });
  });

  describe("When getMinAndMaxProducerWinnersByInterval is called", () => {
    it("Then should return an object with empty arrays if the input data is empty", () => {
      const result = getMinAndMaxProducerWinnersByInterval([]);
      assert.deepEqual(result, { min: [], max: [] });
    });

    it("Then should correctly determine producers with the minimum and maximum intervals", () => {
      const data = [
        {
          title: "Movie1",
          producers: "Producer1, Producer2 and Producer3",
          winner: 1,
          year: 2004,
        },
        {
          title: "Movie2",
          producers: "Producer4 and Producer1",
          winner: 1,
          year: 2005,
        },
        {
          title: "Movie3",
          producers: "Producer5 and Producer6",
          winner: 1,
          year: 2000,
        },
        {
          title: "Movie4",
          producers: "Producer6, Producer7 and Producer3",
          winner: 1,
          year: 2001,
        },
        {
          title: "Movie5",
          producers: "Producer1, Producer2 and Producer3",
          winner: 0,
          year: 2001,
        },
        {
          title: "Movie6",
          producers: "Producer4 and Producer5",
          winner: 0,
          year: 2001,
        },
        {
          title: "Movie7",
          producers: "Producer3",
          winner: 1,
          year: 2010,
        },
        {
          title: "Movie8",
          producers: "Producer3",
          winner: 1,
          year: 2016,
        },
      ];

      const result = getMinAndMaxProducerWinnersByInterval(data);

      assert.deepEqual(result, {
        min: [
          {
            producer: "Producer1",
            interval: 1,
            previousWin: 2004,
            followingWin: 2005,
          },
          {
            producer: "Producer6",
            interval: 1,
            previousWin: 2000,
            followingWin: 2001,
          },
        ],
        max: [
          {
            producer: "Producer3",
            interval: 6,
            previousWin: 2004,
            followingWin: 2010,
          },
          {
            producer: "Producer3",
            interval: 6,
            previousWin: 2010,
            followingWin: 2016,
          },
        ],
      });
    });
  });
});
