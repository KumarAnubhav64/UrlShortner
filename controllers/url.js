const e = require('express')
const { Url } = require('../model/url')
const { nanoid } = require('nanoid')
async function generateShortUrl(req, res) {
    const shortID = nanoid(8)
    const body = req.body
    if (
        !body || !body.url
    ) {
        return res.status(404).json({ msg: "No URL Found" })
    }
    await Url.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    })
    return res.render('home', {
        id: shortID
    })
}

async function returnOrginalUrl(req, res) {
    const id = req.params.shortId
    const entry = await Url.findOneAndUpdate({ shortId: id }, {
        $push: {
            visitHistory: { timestamp: Date.now() },
        },
    })
    console.log(entry);

    if (!entry) res.status(404).json({ error: "Url not found" })
    else {
        return res.redirect(entry.redirectURL);
    }
}

async function urlAnalytics(req, res) {
    const id = req.params.shortId
    const url = await Url.findOne(id)
    const myUrl = url.redirectURL
    const click = url.visitHistory
    if (!url) res.status(404).json({ error: "URL not found" })
    return res.status(200).json({ url: myUrl, Total_Click: click.length, visitHistory: click })
}

async function test(req, res) {
    const allUrls = await Url.find({})
    return res.render("home", {
        urls: allUrls
    })
}

module.exports = {
    generateShortUrl,
    returnOrginalUrl,
    urlAnalytics, test,
}