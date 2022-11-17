const jwt = require("jsonwebtoken");
module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.jwtSecret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }

        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.send(500);
    console.log(error);
  }
};
