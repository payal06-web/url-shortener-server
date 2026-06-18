import { getShortUrl } from "../dao/short_url.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;

  let shortUrl;

  if (req.user) {
    shortUrl = await createShortUrlWithUser(url, req.user._id, slug);
  } else {
    shortUrl = await createShortUrlWithoutUser(url);
  }

  res.status(201).json({
    shortUrl: `${process.env.APP_URL}/${shortUrl}`,
  });
});


export const redirectFromShortUrl = wrapAsync(async (req,res,next)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if (!url) {
    return res.status(404).json({ message: "Short URL not found" })
}
    res.redirect(url.full_url)
})

