var CategoryTransformer = function() {

};

CategoryTransformer.prototype.transformError400 = function(res) {
    res.status(400);
    res.end();
};

function _transformSingleData(category) {
    return {
        links: {
            self: '/categories/'+category.data.id
        },
        type: 'category',
        id: category.data.id,
        attributes: {
            name: category.data.name,
            description: category.data.description,
            fg_status: category.data.fg_status
        }
    };
}

function _transformCollectionData(categories) {
    var data = [];
    categories.forEach(function(category) {
        data.push(_transformSingleData.call(this, category));
    });

    return data;
}

CategoryTransformer.prototype.transform = function(category) {
    return {
        data: _transformSingleData.call(this, category)
    };
};

CategoryTransformer.prototype.transformPath = function(categoryId, categories) {
    return {
        links: {
            self: '/categories/'+categoryId+'/path'
        },
        data: _transformCollectionData.call(this, categories)
    }
};

CategoryTransformer.prototype.transformChildren = function(categoryId, categories) {
    return {
        links: {
            self: '/categories/'+categoryId+'/children'
        },
        data: _transformCollectionData.call(this, categories)
    }
};

module.exports = CategoryTransformer;