const router = require('express').Router();
const pokimonControllers = require('../controllers/pokimonControllers');

router.get('/', pokimonControllers.index);

// used to fetch poki from API then save them to mongoodb
router.get('/fetch', pokimonControllers.fetchPokimons);

module.exports = router;