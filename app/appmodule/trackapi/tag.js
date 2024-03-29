var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var tag = module.exports = {};

// Tag

tag.saveTagInfo = function saveTagInfo(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_taginfo") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

tag.getTagDetails = function getTagDetails(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_tagdetails") + "($1,$2::json);", ['tag', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

// Push Tag

tag.saveTagEmployeeMap = function saveTagEmployeeMap(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_tagempmap") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

tag.getTagEmployeeMap = function getTagEmployeeMap(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_tagempmap") + "($1,$2::json);", ['tag', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}