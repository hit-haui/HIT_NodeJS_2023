module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
};
