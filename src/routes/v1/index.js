const express = require('express');

const { InfoController, TweetController, LikeController, CommentController, UserController } = require('../../controllers');
const { authenticate } = require('../../middlewares/authenticate-middleware');

const router = express.Router();

router.get('/info',InfoController.info);


router.post('/tweets', TweetController.createTweet);
router.get('/tweets/:id', TweetController.getTweet);

router.post('/likes/toggle',authenticate, LikeController.toggleLike);

router.post('/comments', authenticate, CommentController.createComment);

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);


module.exports = router;
