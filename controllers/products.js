var Product = require('../models/product');
var Category = require('../models/category');
var ProductTransformer = require('../transformers/product');
var CategoryTransformer = require('../transformers/category');
var url = require('url');

exports.get = function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    Product.prototype.find(req.params.productId, function (product) {
        var resData = ProductTransformer.prototype.transform(product, res, req);

        res.status(200);
        res.contentType('application/vnd.api+json');

        if (query.include) {
            var includes = query.include.split(',');
            resData.included = [];
            if (includes.indexOf('category') >= 0) {
                Category.prototype.find(product.data.category_id, function (category) {
                    var cat = CategoryTransformer.prototype.transform(category);
                    resData.included.push(cat.data);
                    res.json(resData);
                    res.end();
                });
            }
        } else {
            res.json(resData);
            res.end();
        }
    });
};

exports.getAll = function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    Product.prototype.findAll(query, function (products) {
        var resData = ProductTransformer.prototype.transformCollection(products, res, req);

        res.status(200);
        res.contentType('application/vnd.api+json');
        res.json(resData);
        res.end();
    });
};

exports.post = function(req, res) {
    var jsonString = '';
    req.on('data', function (data) {
        jsonString += data;
    });

    req.on('end', function () {
        var parsedData = JSON.parse(jsonString);

        if (typeof parsedData.data.type == 'undefined'
            || parsedData.data.type != 'product'
            || typeof parsedData.data.attributes == 'undefined') {
            ProductTransformer.prototype.transformError400(res);
        } else {
            var data = {
                id: null,
                sku: parsedData.data.attributes.sku,
                name: parsedData.data.attributes.name,
                description: parsedData.data.attributes.description,
                category_id: parsedData.data.relationships.category.data.id
            };
            var ProductModel = new Product(data);
            ProductModel.save(req, function() {

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
            || parsedData.data.type != 'product'
            || typeof parsedData.data.attributes == 'undefined') {
            ProductTransformer.prototype.transformError400(res);
        } else {
            var data = {
                id: null,
                sku: parsedData.data.attributes.sku,
                name: parsedData.data.attributes.name,
                description: parsedData.data.attributes.description,
                fg_status: parsedData.data.attributes.fg_status,
                category_id: parsedData.data.attributes.category_id
            };
            var ProductModel = new Product(data);
            ProductModel.update(req.params.productId, function() {
                res.end();
            });
        }
    });
    res.end();
};

exports.delete = function(req, res) {
    var data = {
        fg_status: -2
    };
    var ProductModel = new Product(data);

    ProductModel.update(req.params.productId, function() {
        res.end();
    });
    res.end();
};