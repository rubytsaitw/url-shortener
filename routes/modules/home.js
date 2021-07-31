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
  const projectUrl = req.protocol + '://' + req.get('host') + '/'
  // check if url exists
  const inputUrl = req.body.inputUrl.trim()
  const url = await Url.find({ inputUrl }).lean()
  if (url.length !== 0) {
    return res.render('short', { projectUrl, shortUrl: url[0].shortUrl })
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
    .then(() => res.render('short', { projectUrl, shortUrl: tempUrl }))
    .catch(error => console.log(error))
})

// link to original url
// not resolved
router.get('/:id', (req, res) => {
  Url.find({ shortUrl: req.params.id })
    .lean()
    .then(url => {
      res.redirect(url[0].inputUrl)
    })
    .catch(err => console.error(err))
})

module.exports = router

// Ref: Get full Url in Express
// https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express