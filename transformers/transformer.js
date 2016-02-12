var Transformer = function() {

};

Transformer.prototype.transformError400 = function(res) {
    res.status(200);
    res.end();
};