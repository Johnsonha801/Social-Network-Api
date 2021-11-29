const router = require('express').Router();
const { getAllUsers, getSingleUser, createUser, addFriend, updateUser, deleteUser, removeFriend } = require('../../controllers/user-controllers');

// /api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:id
router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// Manage Friends - /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;