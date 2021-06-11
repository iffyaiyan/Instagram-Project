const express = require('express')
const {
    getPosts, 
    createPost, 
    postsByUser, 
    postById,
    isPoster, 
    updatePost,
    deletePost
} = require('../controllers/post');
const { requireSigin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const {createPostValidator} = require('../validator')

const router = express.Router();

router.get('/posts', getPosts);
router.post(
    "/post/new/:userId", 
    requireSigin, 
    createPost,
    createPostValidator
);
router.get("/posts/by/:userId",requireSigin, postsByUser);
router.put("/post/:postId", requireSigin, isPoster, updatePost);
router.delete("/post/:postId", requireSigin, isPoster, deletePost);

// any route containing: userId, our app will first execute userById()
router.param("userId", userById);
// any route containing: postId, our app will first execute postById()
router.param("postId", postById);

module.exports = router;