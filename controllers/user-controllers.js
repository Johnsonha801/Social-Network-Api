const { User, Thought } = require('../models/index');

const userController = {
    // GET /api/users - Get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    // GET /api/users/:userId - Get single user
    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts'
            })
            .populate({
                path: 'friends'
            })
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err))
    },

    // POST - Create user
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    // POST - Add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId }}, { new: true })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found by this id!'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    // PUT - Update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found by this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE - Delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(async userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return;
                }
                console.log(userData.thoughts);
                Thought.deleteMany({ _id: userData.thoughts }, err => {
                    if(err) {
                        console.log('Something went wrong while deleting thoughts');
                    }
                    res.json('User and associated thoughts have been deleted.')
                });
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE - Remove friend
    removeFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends:  params.friendId } },
            { new: true }
        )
            .then(userData => {
                if(!userData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;