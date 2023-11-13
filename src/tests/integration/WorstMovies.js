const request = require("supertest");
const application = require("../../../application");
const port = process.env.PORT || 3030;
const assert = require("chai").assert;

describe("Given WorstMovies starts", () => {
  let server;

  before(() => {
    server = application.listen(port);
  });

  after(() => {
    process.exit(5);
  });

  describe('When access "/" url with get method', () => {
    let wrapper;

    before(() => {
      wrapper = request(server).get("/");
    });

    it("Then status code should be 200", () => {
      wrapper.expect(200);
    });

    it("Then content-type should be json", () => {
      wrapper.expect("Content-Type", /json/);
    });
  });
});
