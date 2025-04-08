const {generateShortUrl,returnOrginalUrl,urlAnalytics} = require('../controllers/url')
const express = require('express')
const router =  express.Router();

//API
router.post('/URL',generateShortUrl)
router.get('/:id',returnOrginalUrl)
router.get('/URL/analytics/:id',urlAnalytics)

module.exports =  router