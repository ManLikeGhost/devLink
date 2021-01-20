const express = require('express');

const router = express.Router();

// @route    GET api/post
// @access   Public
// @desc     Test route
router.get('/', (req, res) => res.send('Post route'));

module.exports = router;
