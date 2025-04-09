const express = require('express');
const { Url } = require('../model/url');

const router = express.Router();

router.get('/',async(req,res)=>{
    const allUrls = await Url.find({})
    return res.render('home',{
        urls : allUrls
    })
})

module.exports =router