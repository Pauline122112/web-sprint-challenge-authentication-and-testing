const router = require("express").Router()
const bcrypt = require("bcryptjs")
const Users = require("../users/users-model")
const { tokenBuilder } = require("./token-builder");
const { JWT_SECRET } = require("../../data/dbConfig");


// const jwt = require("jsonwebtoken")

router.post("/register", (req, res, next) => {
	const { username, password } = req.body;
	const { role_name } = req;
	const hash = bcrypt.hashSync(password, 8)
	Users.add({ username, password: hash, role_name })
		.then((newUser) => {
			res.status(201).json(newUser)
		})
		.catch(next)

});

router.post("/login", (req, res, next) => {
let { username, password } = req.body;

Users.findBy({ username }) // it would be nice to have middleware do this
	.then(([user]) => {
		if (user && bcrypt.compareSync(password, user.password)) {
			// build a token using a helper function
			const token = tokenBuilder(user);
			res.status(200).json({
				message: `Welcome back ${user.username}!`,
				token: token,
			});
		} else {
			next({ status: 401, message: "Invalid Credentials" });
		}
	})
	.catch(next);

});

module.exports = router;
