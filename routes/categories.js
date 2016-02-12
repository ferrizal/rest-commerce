var express = require('express');
var router = express.Router();

router.get('/:categoryId', function(req, res, next) {
    require('../controllers/categories').get(req, res);
});

router.get('/:categoryId/children', function(req, res, next) {
    require('../controllers/categories').getChildren(req, res);
});

router.get('/:categoryId/path', function(req, res, next) {
    require('../controllers/categories').getPath(req, res);
});

router.get('/:categoryId/products', function(req, res, next) {
    require('../controllers/categories').getProducts(req, res);
});

router.post('/', function(req, res, next) {
    require('../controllers/categories').post(req, res);
});

router.patch('/:categoryId', function(req, res, next) {
    require('../controllers/categories').patch(req, res);
});

router.delete('/:categoryId', function(req, res, next) {
    require('../controllers/categories').delete(req, res);
});

module.exports = router;
