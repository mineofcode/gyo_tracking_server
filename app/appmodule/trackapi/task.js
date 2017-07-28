var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var task = module.exports = {};

task.saveTaskAllocate = function saveTaskAllocate(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_taskallocate") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

task.getTaskAllocate = function getTaskAllocate(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_taskallocate") + "($1,$2::json);", ['at', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}

task.saveTaskNature = function saveTaskNature(req, res, done) {
    db.callFunction("select " + globals.trackschema("funsave_tasknature") + "($1::json);", [req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    })
}

task.getTaskNature = function getTaskNature(req, res, done) {
    db.callProcedure("select " + globals.trackschema("funget_tasknature") + "($1,$2::json);", ['nt', req.body], function(data) {
        rs.resp(res, 200, data.rows);
    }, function(err) {
        rs.resp(res, 401, "error : " + err);
    }, 1)
}