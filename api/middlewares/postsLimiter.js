const rateLimit = require('express-rate-limit');

// limiter for posts 
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000 * 24,
  max: 15,

  handler: (request, response, next, options) =>
    response.status(options.statusCode).json({
      message:
        'You can only post 15 posts per day and you have reached the limit. You can post again tomorrow, have fun ',
    }),
});
module.exports = limiter;
