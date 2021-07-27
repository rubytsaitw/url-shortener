const express = require('express')
const router = express.Router()

// const Url = require('../../models/url')

// Get home page
router.get('/', (req, res) => {
  const cookie = req.cookies
  res.render('index')
})

// Provide original url for shortening


module.exports = router