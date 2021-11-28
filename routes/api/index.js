const router = require('express').Router();

// Import user and thought api routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// /api/users - User routes
router.use('/users', userRoutes);

// /api/thoughts - Thought routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;