var express = require('express');
var router = express.Router();
//var mysql = require('./adapters/mysql');

/* GET products listing. */
router.get('/', function(req, res, next) {
    require('../controllers/products').getAll(req, res);
});

router.get('/:productId', function(req, res, next) {
    require('../controllers/products').get(req, res);
});

router.post('/', function(req, res, next) {
    require('../controllers/products').post(req, res);
});

router.patch('/:productId', function(req, res, next) {
    require('../controllers/products').patch(req, res);
});

router.delete('/:productId', function(req, res, next) {
    require('../controllers/products').delete(req, res);
});

module.exports = router;
