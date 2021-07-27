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
      // if url != 0 -> return existing database and render
      if (url.length !== 0) {
        return url[0]
      }
      // else return {inputURL, new shortURL} -> create into database
      else {
        let url = {
          inputUrl: inputUrl,
          shortUrl: generateShortUrl()
        }
        Url.create(url)
        return url
      }
    })
    .then(url => {
      res.render('short', { shortUrl: url.shortUrl })
    })
    .catch(error => console.log(error))
})

module.exports = router