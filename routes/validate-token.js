//const jwt = require("jsonwebtoken");
// middleware to validate token
/*
const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); // to continue the flow
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};
module.exports = verifyToken;
*/

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	try {
		const token = req.header("Auth-token");
		if (!token) {
			return res.status(400).json({ msg: "Invalid Authentication" });
		}
		jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
			if (err) {
				return res.status(400).json({ msg: "Invalid authentication" });
			}
			req.user = user;
			next();
		});
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = verifyToken;



  