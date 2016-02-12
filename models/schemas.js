var schemas = {
    product: {
        id: null,
        sku: null,
        name: null,
        category_id: null,
        description: null,
        fg_status: null
    },
    category: {
        id: null,
        parentId: null,
        name: null,
        description: null,
        fg_status: null
    }
};

module.exports = schemas;