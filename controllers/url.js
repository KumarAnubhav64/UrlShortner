const {Url} =  require('../model/url')

async function generateShortUrl(req,res){
    const body =  req.body
    if(
        !body||
        !body.url
    ){
        return res.status(404).josn({msg:"No URL Found"})
    }
    const url = await Url.create({
        url: body.url,
        click: 0
    })
    return res.status(201).json({msg:"success",url})
}

async function returnOrginalUrl(req,res){
    const id  = req.params.id
    const url = await Url.findById(id)
    if(!url) res.status(404).json({error:"Url not found"})
    else{
    await Url.findByIdAndUpdate(id,{click:url.click+1})
    return res.status(200).json(url)
    }
}

async function urlAnalytics(req,res){
    const id = req.params.id
    const url =  await Url.findById(id)
    const myUrl =  url.url
    const click = url.click
    if(!url) res.status(404).json({error:"URL not found"})
    return res.status(200).json({url:myUrl,click:click})
}

module.exports = {
    generateShortUrl,
    returnOrginalUrl,
    urlAnalytics,
}