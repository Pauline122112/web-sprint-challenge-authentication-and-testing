const request = require("supertest")
const db = require("../data/dbConfig")
const server = require("./server")
const Users = require("./users/users-model")

test("sanity", () => {
	expect(true).toBe(true);
});
test("correct environment", () => {
	expect(process.env.NODE_ENV).toBe("testing");
})
beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});
beforeEach(async () => {
	await db("users").truncate();
})
afterAll(async () => {
	await db.destroy();
})
test("this is an empty test", () => {
	//empty test
})

