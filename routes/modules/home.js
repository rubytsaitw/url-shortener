const express = require('express')
const router = express.Router()

const Url = require('../../models/url')
const generateShortUrl = require('../../tools/helpers')


// Get home page
router.get('/', (req, res) => {
  res.render('index')
})

// Create new short URL
router.post('/', (req, res) => {
  const { inputUrl } = req.body
  Url.find({ inputUrl: inputUrl })
    .lean()
    .then(url => {
      // if url != 0 -> render
      if (url.length !== 0) {
        res.render('short', { shortUrl: url[0].shortUrl })
      }
      // else return {inputURL, shortURL}
      else return {
        inputUrl: inputUrl,
        shortUrl: generateShortUrl()
      }
    })
    .then(url => {
      Url.create(url)
      res.render('short', { shortUrl: url.shortUrl })
    })
    .catch(error => console.log(error))
})

module.exports = router