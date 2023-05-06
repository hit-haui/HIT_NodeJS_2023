const authMiddleware = (req, res, next) => {
  const { permission } = req.body
  if (permission !== 'admin') {
    throw new Error('Unauthorized')
  }
  next()
}
module.exports = authMiddleware
