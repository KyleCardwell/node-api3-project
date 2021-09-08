const {getById, insert} = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${req.method}] ${req.url} `, Date())
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUserId')
  getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(404).json({ message: "user not found" })
      }
    })
    .catch(next)
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser')
  if (req.body.name) {
    insert(req.body)
      .then(user => {
        req.user = user
        next()
      })
      .catch(next)
  } else {
    res.status(400).json({ message: "missing required name field" })
  }
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePost')
  next()
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId, validateUser, validatePost}