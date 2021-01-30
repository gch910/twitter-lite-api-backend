const express = require('express');

const { asyncHandler, tweetNotFoundError, handleValidationErrors, validateTweet } = require('./utils')
const db = require('../db/models');
const { Tweet } = db;

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll();

    res.json({tweets})
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const tweetId = parseInt(req.params.id, 10)

    const tweet = await Tweet.findByPk(tweetId)

    if(tweet) {
        res.json({ tweet })
    } else {
        next(tweetNotFoundError(tweetId))
    }
    
}))



router.post('/', validateTweet, handleValidationErrors, asyncHandler(async(req, res) => {
   const { message } = req.body;

   const tweet = await Tweet.create({ message })

   res.json({ tweet })
}))

module.exports = router;