var db = require('./db');
var schemas = require('./schemas');
var _ = require('lodash');

var Category = function(data) {
    this.sanitize(data);
};

Category.prototype.data = {};

Category.prototype.sanitize = function (data) {
    data = data || {};
    var schema = schemas.category;
    this.data = _.pick(_.defaults(data, schema), _.keys(schema));
};

Category.prototype.findAll = function (filters, callback) {

};

Category.prototype.find = function (id, callback) {
    var sql = "SELECT * FROM categories where id=?";
    db.query(sql, [id], function(err, rows) {
        if (err) {
            throw err;
        }
        rows.forEach(function(item) {
            callback(new Category(item));
        });
    });
};

Category.prototype.findPath = function (id, callback) {
    var sql = "SELECT * FROM categories node, categories parent ";
    sql += "WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.id=? AND parent.id!=1 ORDER BY node.lft;";
    db.query(sql, [id], function(err, parents) {
        if (err) {
            throw err;
        }
        var categories = [];
        parents.forEach(function(item) {
            categories.push(new Category(item));
        });
        callback(categories);
    });
};

Category.prototype.findChildren = function (id, isImmediate, activeOnly, callback) {
    var sql = "SELECT node.*, (COUNT(parent.id) - (sub_tree.depth + 1)) AS depth ";
    sql += "FROM categories node, categories parent, categories sub_parent, ";
    sql += "(SELECT node.id, (COUNT(parent.id) - 1) depth FROM categories node, categories parent ";
    sql += "WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.id = ? ";
    sql += "GROUP BY node.id ORDER BY node.lft) AS sub_tree ";
    sql += "WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt ";
    sql += activeOnly == true ? "AND node.fg_status = 1 " : "";
    sql += "AND sub_parent.id = sub_tree.id GROUP BY node.id ";
    sql += isImmediate == true ? "HAVING depth = 1 " : "";
    sql += "ORDER BY node.lft";

    db.query(sql, [id], function(err, children) {
        if (err) {
            throw err;
        }
        var categories = [];
        children.forEach(function(item) {
            categories.push(new Category(item));
        });
        callback(categories);
    });
};

Category.prototype.save = function (callback) {
    var self = this;
    var now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var sql = "LOCK TABLE categories WRITE; ";
    db.query(sql, function(err) {
        if (err) {
            throw err;
        }
        var sql = "SELECT @myLeft := lft FROM categories WHERE id="+self.data.parentId+";";
        db.query(sql, function(err) {
            if (err) {
                throw err;
            }
            var sql = "UPDATE categories SET rgt=rgt+2 WHERE rgt > @myLeft;";
            db.query(sql, function(err) {
                if (err) {
                    throw err;
                }
                var sql = "UPDATE categories SET lft=lft+2 WHERE lft > @myLeft;";
                db.query(sql, function(err) {
                    if (err) {
                        throw err;
                    }
                    var sql = "INSERT INTO categories (name, lft, rgt, fg_status, created_on, modified_on) ";
                    sql += "VALUES ('"+self.data.name+"', @myLeft+1, @myLeft+2, 1, '"+now+"', '"+now+"');";
                    db.query(sql, function(err) {
                        if (err) {
                            throw err;
                        }
                        var sql = "UNLOCK TABLES;";
                        db.query(sql, function(err) {

                        });
                    });
                });
            });
        });
    });
};

Category.prototype.update = function (id, callback) {

};

module.exports = Category;