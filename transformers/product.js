var ProductTransformer = function() {

};

ProductTransformer.prototype.transformError400 = function(res) {
    res.status(400);
    res.end();
};

function _transformSingleData(product) {
    return {
        links: {
            self: '/product/'+product.data.id
        },
        type: 'product',
        id: product.data.id,
        attribute: {
            sku: product.data.sku,
            name: product.data.name,
            description: product.data.description,
            fg_status: product.data.fg_status
        },
        relationships: {

        }
    };
}

ProductTransformer.prototype.transform = function(product, res, req) {
    return {
        data: _transformSingleData.call(this, product, res, req)
    };
};

ProductTransformer.prototype.transformCollection = function(products, res, req) {
    var data = [];
    products.forEach(function(product) {
        data.push(_transformSingleData.call(this, product, res, req));
    });
    return {
        links: {
            self: '/products'
        },
        data: data
    };
};

module.exports = ProductTransformer;