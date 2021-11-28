const router = require('express').Router();

// Import api routes
const apiRoutes = require('./api');

// route for api
router.use('/api', apiRoutes);

// Route unknown routes
router.use((req, res) => {
    res.status(404).json('Unknown route request.');
});

module.exports = router;
