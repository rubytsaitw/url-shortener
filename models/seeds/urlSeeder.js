const mongoose = require('mongoose')
const Url = require('../url')

mongoose.connect('mongodb://localhost/url', { useNewUrlParser: true, useUnifiedTopology: true })

// create seed url input
const urls = [
  ['https://www.google.com.tw/'],
  ['https://www.google.com.tw/maps/'],
  ['https://github.com/'],
  ['https://jerryae86.pixnet.net/blog/post/217556412-%E3%80%90%E5%8F%B0%E4%B8%AD%E3%80%81%E8%A5%BF%E5%B1%AF%E5%8D%80%E3%80%912020%E5%85%A8%E6%96%B0%E8%8C%B6%E5%85%AD%E8%8F%9C%E5%96%AE-%E8%8C%B6%E5%85%AD%E9%AB%98cp']
]

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

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Url.create(
    urls.map(url => ({
      inputUrl: url[0],
      shortUrl: generateShortUrl()
    }))
  )
    .then(() => {
      db.close()
      console.log('seeder done!')
    })
})