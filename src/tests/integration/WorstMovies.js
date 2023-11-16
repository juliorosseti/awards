const request = require("supertest");
const application = require("../../../application");
const migration = require("../../../src/main/databases/migration");
const expect = require("chai").expect;

describe("Given WorstMovies starts", () => {
  before(async () => {
    await migration.up();
  });

  describe('When access "/" url with get method', () => {
    it("Then status code should be 200", async () => {
      await request(application).get("/").expect(200);
    });

    it("Then content-type should be json", async () => {
      await request(application).get("/").expect("Content-Type", /json/);
    });

    it("Then response body should be a valid json", async () => {
      const res = await request(application).get("/");

      expect(res.body).to.eql({
        min: [
          {
            producer: "Joel Silver",
            interval: 1,
            previousWin: 1990,
            followingWin: 1991,
          },
        ],
        max: [
          {
            producer: "Matthew Vaughn",
            interval: 13,
            previousWin: 2002,
            followingWin: 2015,
          },
        ],
      });
    });
  });
});
