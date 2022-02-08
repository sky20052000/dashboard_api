const User = require("../Model/userModel");
//const User = require("../Model/refreshtokenModel");
const jwt = require("jsonwebtoken");
var validator = require("validator");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("mySecretKey");
const refreshTokens = [];
const userController = {
	register: async (req, res) => {
		try {
			const { name, email, national_id, phone_no, password, repeat_password } =
				req.body;

			//Finding user's email.
			const validate = validator.isEmail(email);
			if (!validate) {
				return res.status(400).json({ msg: "Email is not valid!" });
			}
			const user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: "This email already exist!" });
			}
			if (password != repeat_password) {
				return res
					.status(400)
					.json({ msg: "Please confirm the exact password!" });
			}
			const encryptedStringPassword = cryptr.encrypt(password);
			const newUser = new User({
				name: name,
				email: email,
				phone_no: phone_no,
				national_id: national_id,
				password: encryptedStringPassword,
				role: 1,
			});

			if (newUser == 0) {
				return res.status(400).json({ msg: "There is some problem!" });
			}
			//Saving user in database.
			await newUser.save();
			//localStorage.setItem("login", true);
			//localStorage.removeItem("login", true);
			res.json({
				msg: "You have been registered successfully",
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to login user.
	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			//Finding user's email.
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: "User is not exist!" });
			}

			const decryptedString = cryptr.decrypt(user.password);

			if (decryptedString != password) {
				return res.status(400).json({ msg: "Incorrect password" });
			}
			//Creating access token.
			const accesstoken = createAccessToken({ id: user._id });
			console.log(accesstoken, "rtyttttttttttttttttttttttttt");
			//creating refresh token.
			const refreshtoken = createRefreshToken({ id: user._id });
			refreshTokens.push(refreshtoken);
			console.log(refreshTokens, "refresh");
			// console.log(refreshtoken, "rtyttttttttttttttttttttttttt");
			// res.cookie("refreshtoken", refreshtoken, {
			// 	httpOnly: true,
			// 	path: "/api/refresh_token",
			// 	maxAge: 7 * 24 * 60 * 60 * 1000,
			// 	secure: true,
			// });
			// console.log(res, "response");
			res.json({
				msg: "Login Success",
				accesstoken,
				role: user.role,
				user: {
					...user._doc,
					password: " ",
				},
			});
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	get_cookie: (req, res) => {
		console.log(req.cookies);
		res.send(req.cookies);
	},

	//Function to logout user.
	logout: async (req, res) => {
		try {
			res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
			return res.json({ msg: "logged out" });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	//Function to check the refresh token.
	refreshToken: (req, res) => {
		try {
			console.log("1111111111111111111111");
			console.log(refreshTokens, "222222222222222222222");
			const rf_token = refreshTokens[0];
			console.log(rf_token, "rrrrrrrrrrrrrrrrrrrrrrr");
			if (!rf_token) {
				return res.status(400).json({ msg: "please login first" });
			}
			//Verifying jwt token
			jwt.verify(
				rf_token,
				process.env.REFRESH_TOKEN_SECRET,
				console.log(process.env.REFRESH_TOKEN_SECRET, "env"),
				async (err, result) => {
					console.log(result, "result");
					if (err) {
						return res.status(400).json({ msg: "login first" });
					}
					if (!result) {
						return res.status(400).json({ msg: "user does not exist" });
					}
					const user = await User.findById(result.id);
					const access_token = createAccessToken({ id: user.id });
					res.json({
						access_token,
						role: user.role,
						user: {
							...user._doc,
							password: " ",
						},
					});
				},
			);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
	//Function to get the user
	getUser: async (req, res) => {
		try {
			const user = await User.findById(req.body._id);
			if (!user) {
				return res.status(400).json({ msg: "user does not exist" });
			}
			res.json(user);
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},
};

//Function to to create access token.
const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

//Function to to create refresh token.
const createRefreshToken = (user) => {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userController;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mongoose = require("mongoose");
//Model for user details.
const refreshSchema = new mongoose.Schema(
	{
		user_id: {
			type: String,
			required: true,
		},
		ref_token: {
			type: String,
			required: true,
			unique: true,
		},
     },
	{
		timestamps: true,
	},
);
//Exporting file and set collection name user.
module.exports = mongoose.model("ref_token_property", refreshSchema);

