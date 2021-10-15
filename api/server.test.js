const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

test("sanity", () => {
	expect(true).toBe(true);
});
test("correct environment", () => {
	expect(process.env.NODE_ENV).toBe("testing");
})