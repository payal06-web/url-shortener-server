import urlSchema from "../models/short_url.model.js"
import { ConflictError } from "../utils/errorHandler.js"

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new urlSchema({
      full_url: longUrl,
      short_url: shortUrl,
      user: userId || null,
    });

    await newUrl.save();
  } catch (err) {
    if (err.code === 11000) {
      throw new ConflictError("Short URL already exists");
    }
    throw err; 
  }
};
export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({short_url:shortUrl},{$inc:{clicks:1}});
}

export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({short_url:slug});
}


