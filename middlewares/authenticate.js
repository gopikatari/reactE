const jwt = require("jsonwebtoken");

let authenticate = (request, response, next) => {
  const headers = request.headers["authorization"];

  if (headers !== undefined && headers !== null) {
    //get the token
    let token = request.headers["authorization"].split(" ")[1];
    //console.log(token);
    if (!token)
      return response
        .status(500)
        .json({ msg: "InValid Token , Authorization denied!" });

    //verify the token
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      request.user = decoded.user;
      next();
    } catch (error) {
      return response.status(500).json({ msg: "Authorization denied!" });
    }
  } else {
    return response
      .status(500)
      .json({ msg: "InValid login , Authorization denied!" });
  }
};

module.exports = authenticate;
