import wrapAsync from "../utils/tryCatchWrapper.js"
import { getAllUserUrlsDao } from "../dao/user.dao.js"

export const getAllUserUrls = wrapAsync(async (req, res, next) => {
    const userId = req.user._id
    const urls = await getAllUserUrlsDao(userId)
    res.status(200).json({message:"success",urls})
})