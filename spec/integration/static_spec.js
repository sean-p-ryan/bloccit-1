// const request = require("request");
// const server = require("../../src/server");
// const base = "http://localhost:3000/";
// const marco = "http://localhost:3000/marco";

// describe("routes : static", () => {

//   //#1
//   describe("GET /", () => {

//     //#2
//     it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", (done) => {

//       //#3
//       request.get(base, (err, res, body) => {
//         expect(res.statusCode).toBe(200);
//         expect(body).toContain("Welcome to Bloccit");
//         //#4
//         done();
//       });
//     });

//   });

//   describe("GET /", () => {
//     it("should return status code 200", (done) => {
//       request.get(marco, (err, res, body) => {
//         expect(res.statusCode).toBe(200);
//         done();
//       });
//     });

//     it("should return string 'Polo'", (done) => {
//       request.get(marco, (err, res, body) => {
//         expect(body).toContain('Polo');
//         done();
//       });
//     });
//   });
// });