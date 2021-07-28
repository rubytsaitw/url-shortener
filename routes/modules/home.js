const express = require('express')
const router = express.Router()

const Url = require('../../models/url')
const generateShortUrl = require('../../tools/helpers')


// Get home page
router.get('/', (req, res) => {
  res.render('index')
})

// Create short URL
router.post('/', async (req, res) => {
  // check if url exists
  const inputUrl = req.body.inputUrl.trim()
  const url = await Url.find({ inputUrl }).lean()
  if (url.length !== 0) {
    return res.render('short', { shortUrl: url[0].shortUrl })
  }
  // if not, generate unique short url
  const shortUrlArr = await Url.find().distinct('shortUrl').lean()
  let tempUrl = ''
  do {
    tempUrl = generateShortUrl()
  } while (shortUrlArr.includes(tempUrl))

  return Url.create({
    inputUrl: inputUrl,
    shortUrl: tempUrl
  })
    .then(() => res.render('short', { shortUrl: tempUrl }))
    .catch(error => console.log(error))
})

module.exports = router