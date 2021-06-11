const express = require('express');
const { 
    userById, 
    allUsers, 
    getUser, 
    updateUser,
    deleteUser ,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople
} = require('../controllers/user');
const { requireSigin } = require('../controllers/auth');

const router = express.Router();

router.put('/user/follow', requireSigin, addFollowing, addFollower)
router.put('/user/unfollow', requireSigin, removeFollowing, removeFollower)

router.get("/users", allUsers);
router.get("/user/:userId", requireSigin, getUser);
router.put("/user/:userId", requireSigin, updateUser);
router.delete("/user/:userId", requireSigin, deleteUser);

//photo
router.get("/user/photo/:userId", userPhoto);

// who to follow
router.get('/user/findpeople/:userId', requireSigin, findPeople)

// any route containing: userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;