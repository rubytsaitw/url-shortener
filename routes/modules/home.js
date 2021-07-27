const express = require('express')
const router = express.Router()

const Url = require('../../models/url')

// Get home page
router.get('/', (req, res) => {
  res.render('index')
})

// define sample function to randomly select an item from an array
function sample(array) {
  const i = Math.floor(Math.random() * array.length)
  return array[i]
}

// define generateShortUrl function
function generateShortUrl() {
  // define components for Url
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // create a collection to put in all items
  let collectionItems = lowerCaseLetters + upperCaseLetters + numbers
  let collection = []
  collection = collectionItems.split('')

  let shortUrl = ''
  // generate random shortUrl
  for (i = 1; i <= 5; i++) {
    shortUrl += sample(collection)
  }

  // return shortUrl
  return shortUrl
}

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