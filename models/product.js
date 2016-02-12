var pool = require('./db');
var schemas = require('./schemas');
var _ = require('lodash');

var Product = function(data) {
    this.sanitize(data);
};

Product.prototype.data = {};

function _filtersToSql(filters) {
    var sqlFilters = [];
    var bindParams = [];
    if (Object.keys(filters).length > 0) {
        Object.keys(filters).forEach(function (element) {
            switch (element) {
                case 'status':
                    sqlFilters.push("fg_status=?");
                    bindParams.push(filters[element]);
                    break;
                case 'category_id':
                    sqlFilters.push("category_id=?");
                    bindParams.push(filters[element]);
            }
        });
    }

    //If no filter fg_status, by default filter non deleted products
    if (sqlFilters.indexOf('fg_status=?') == -1) {
        sqlFilters.push("fg_status!=-2");
    }

    return {
        sql: sqlFilters.join(' AND '),
        params: bindParams
    };

}

Product.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.product;
    this.data = _.pick(_.defaults(data, schema), _.keys(schema));
};

Product.prototype.findAll = function (filters, callback) {
    var bindParams = [];
    var sql = "SELECT * FROM products ";
    if (Object.keys(filters).length) {
        var filtersToSql = _filtersToSql.call(this, filters);
        if (filtersToSql.sql != null) {
            sql += "WHERE " + filtersToSql.sql;
        }
        if (filtersToSql.params.length > 0) {
            bindParams = filtersToSql.params;
        }
    }

    pool.getConnection(function(err, connection) {
        connection.query(sql, bindParams, function (err, rows) {
            connection.release();
            if (err) {
                throw err;
            }
            var products = [];
            rows.forEach(function (item) {
                products.push(new Product(item));
            });
            callback(products);
        });
    });
};

Product.prototype.find = function (id, callback) {
    var sql = 'SELECT * FROM products where id = ?';
    pool.getConnection(function(err, connection) {
        connection.query(sql, [id], function (err, rows, fields) {
            connection.release();
            if (err) {
                throw err;
            }
            rows.forEach(function (item) {
                callback(new Product(item));
            });
        });
    });
};

Product.prototype.findByCategoryId = function (categoryId, filters, callback) {
    var sql = "SELECT ... WHERE c.id=? ";
    var bindParams = [categoryId];
    if (Object.keys(filters).length) {
        var filtersToSql = _filtersToSql.call(this, filters);
        if (filtersToSql.sql != null) {
            sql += "WHERE " + filtersToSql.sql;
        }
        if (filtersToSql.params.length > 0) {
            bindParams = filtersToSql.params;
        }
    }

    pool.getConnection(function(err, connection) {
        connection.query(sql, bindParams, function (err, rows) {
            connection.release();
            if (err) {
                throw err;
            }
            var products = [];
            rows.forEach(function (item) {
                products.push(new Product(item));
            });
            callback(products);
        });
    });
};

Product.prototype.save = function (req, callback) {
    var self = this;
    var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var sql = "INSERT INTO products (sku, name, description, category_id, fg_status, created_on, modified_on) ";
    sql += "VALUES (?, ?, ?, ?, 0, '"+now+"', '"+now+"')";
    pool.getConnection(function(err, connection) {
        connection.query(sql, [
            self.data.sku,
            self.data.name,
            self.data.description,
            self.data.category_id
        ], function (err) {
            connection.release();
        });
    });
};

Product.prototype.update = function (id, callback) {
    var self = this;
    var setFields = [];
    var setFieldVals = [];
    Object.keys(this.data).forEach(function(element, key, _array) {
        if (self.data[element] !== null) {
            setFields.push(element+"=?");
            setFieldVals.push(self.data[element]);
        }
    });
    setFieldVals.push(id);
    var setSql = setFields.join(',');
    var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var sql = "UPDATE products ";
    sql += "SET "+setSql+", modified_on = '"+now+"' ";
    sql += "WHERE id = ? ";
console.log(sql);
    pool.getConnection(function(err, connection) {
        connection.query(sql, setFieldVals, function (err) {
            connection.release();
        });
    });
};

module.exports = Product;