
const {Router} = require('express');
const { search, searchProductByCategory } = require('../controllers/search.controller');

const router = Router();

router.get('/:collection/:item', search);

module.exports = router;