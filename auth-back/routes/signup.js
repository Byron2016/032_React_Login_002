// signup
const router = require('express').Router()

const { jsonResponse } = require('../lib/jsonResponse')

router.post('/', (req, res) => {
  const { username, name, password } = req.body

  if (!username || !name || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: 'Fields are required',
      }),
    )
  }

  // crear usuario.
  res.status(200).json(
    jsonResponse(200, {
      message: 'User created successfully',
    }),
  )
})

module.exports = router
