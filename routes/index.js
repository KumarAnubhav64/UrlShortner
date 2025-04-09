const {generateShortUrl,returnOrginalUrl,urlAnalytics,test} = require('../controllers/url')
const express = require('express')
const router =  express.Router();



//API
router.post('/',generateShortUrl)
router.get('/:shortId',returnOrginalUrl)
router.get('/analytics/:id',urlAnalytics)
//Views
module.exports =  router