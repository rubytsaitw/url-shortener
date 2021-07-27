const express = require('express')
const router = express.Router()

// const Url = require('../../models/url')

// Get home page
router.get('/', (req, res) => {
  res.render('index')
})

// Provide original url for shortening
// router.post('/', (req, res) => {
// const { inputUrl } = req.body
// Url.create({
//     name, image, category, rating, location, google_map, phone, description
//   })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })


router.post('/', (req, res) => {
  const { inputUrl } = req.body
  console.log('inputUrl entered:', inputUrl)
  Url.find({ inputUrl })
    .lean()
    .then(url => {
      if (url.length > 0) {
        res.render('short', { shortUrl })
      }
      else if (url.length === 0) {
        ({
          inputUrl,
          shortUrl: generateShortUrl()
        })
        console.log('new url:', url)
        res.render('short', { shortUrl })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router