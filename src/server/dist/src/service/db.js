"use strict";
exports.__esModule = true;
exports.update = exports.insert = void 0;
var insert = function (object, table) {
    var cols = Object.keys(object);
    var insetstm = "insert into \"".concat(table, "\" (").concat(cols.join(','), ") values (").concat(cols.map(function (e) { return "".concat('$' + e); }).join(','), ");");
    return insetstm;
};
exports.insert = insert;
var update = function (object, table) {
    var id = object.id;
    delete object.id;
    var cols = Object.keys(object)
        .map(function (e) { return "".concat(e, "=?"); });
    var updateStatement = "update ".concat(table, " set ").concat(cols.join(','), " where ").concat(table, ".id = ?;");
    var updateValues = Object.values(object);
    updateValues.push(id);
    return { updateStatement: updateStatement, values: updateValues };
};
exports.update = update;
//# sourceMappingURL=db.js.map