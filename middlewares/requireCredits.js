// this sets the status of the request as forbidden if the user not have enough credits, and sends back an error
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({ error: "You don't have enough credits" });
  }
  next();
};
