var Category = require('../models/category');
var CategoryTransformer = require('../transformers/category');
var url = require('url');

exports.getAll = function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    Category.prototype.findAll(query, function (categories) {
        CategoryTransformer.prototype.transformCollection(categories, res, req);
    });
};

exports.get = function(req, res) {
    var categoryId = req.params.categoryId;
    Category.prototype.find(categoryId, function (category) {
        var resData = CategoryTransformer.prototype.transform(category);

        res.status(200);
        res.contentType('application/vnd.api+json');
        res.json(resData);
        res.end();
    });
};

exports.getPath = function(req, res) {
    var categoryId = req.params.categoryId;
    Category.prototype.findPath(categoryId, function (categories) {
        var resData = CategoryTransformer.prototype.transformPath(categoryId, categories);

        res.status(200);
        res.contentType('application/vnd.api+json');
        res.json(resData);
        res.end();
    });
};

exports.getChildren = function(req, res) {
    var categoryId = req.params.categoryId;
    Category.prototype.findChildren(categoryId, true, true, function (categories) {
        var resData = CategoryTransformer.prototype.transformChildren(categoryId, categories);

        res.status(200);
        res.contentType('application/json');
        res.json(resData);
        res.end();
    });
};

exports.getProducts = function(req, res) {
    var Product = require('../models/product');
    var ProductTransformer = require('../transformers/product');
    var query = {
        category_id: req.params.categoryId
    };
    Product.prototype.findAll(query, function (products) {
        var resData = ProductTransformer.prototype.transformCollection(products, res, req);

        res.status(200);
        res.contentType('application/vnd.api+json');
        res.json(resData);
        res.end();
    });
    /*Product.prototype.findByCategoryId(req.params.categoryId, function (products) {
        var resData = ProductTransformer.prototype.transformCollection(products);

        res.status(200);
        res.contentType('application/json');
        res.json(resData);
        res.end();
    });*/
};

exports.post = function(req, res) {
    var jsonString = '';
    req.on('data', function (data) {
        jsonString += data;
    });

    req.on('end', function () {
        var parsedData = JSON.parse(jsonString);

        if (typeof parsedData.data.type == 'undefined'
            || parsedData.data.type != 'category'
            || typeof parsedData.data.attributes == 'undefined') {
            CategoryTransformer.prototype.transformError400(res);
        } else {
            var data = {
                parentId: parsedData.data.attributes.parentId,
                name: parsedData.data.attributes.name,
                description: parsedData.data.attributes.description
            };
            var CategoryModel = new Category(data);
            CategoryModel.save(function() {

            });
        }
    });
    res.end();
};

exports.patch = function(req, res) {
    var jsonString = '';
    req.on('data', function (data) {
        jsonString += data;
    });

    req.on('end', function () {
        var parsedData = JSON.parse(jsonString);

        if (typeof parsedData.data.type == 'undefined'
            || parsedData.data.type != 'category'
            || typeof parsedData.data.attributes == 'undefined') {
            CategoryTransformer.prototype.transformError400(res);
        } else {
            var data = {
                name: parsedData.data.attributes.name,
                description: parsedData.data.attributes.description,
                fg_status: parsedData.data.attributes.fg_status
            };
            var CategoryModel = new Category(data);
            CategoryModel.update(req.params.categoryId, function() {
                res.end();
            });
        }
    });
    res.end();
};

exports.del = function(req, res) {
    var data = {
        fg_status: -2
    };
    var CategoryModel = new Category(data);

    CategoryModel.update(req.params.categoryId, function() {
        res.end();
    });
    res.end();
};