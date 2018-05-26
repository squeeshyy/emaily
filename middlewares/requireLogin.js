// this sets the status of the request as forbidden if the user is not logged in, and sends back an error
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  next();
};
