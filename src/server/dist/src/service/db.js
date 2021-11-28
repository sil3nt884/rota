"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.fetch = exports.findByID = exports.update = exports.insert = void 0;
var sqlite_1 = require("./sqlite");
var insert = function (object, table) { return __awaiter(void 0, void 0, void 0, function () {
    var db, cols, insetstm;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, sqlite_1.openDB)()];
            case 1:
                db = _a.sent();
                cols = Object.keys(object);
                insetstm = "insert into \"".concat(table, "\" (").concat(cols.join(','), ") values (").concat(cols.map(function (e) { return "".concat('$' + e); }).join(','), ");");
                return [4, db.run(insetstm, Object.values(object))];
            case 2:
                _a.sent();
                return [4, (0, sqlite_1.closeDB)(db)];
            case 3:
                _a.sent();
                return [2];
        }
    });
}); };
exports.insert = insert;
var update = function (object, table) { return __awaiter(void 0, void 0, void 0, function () {
    var db, id, cols, updateStatement, updateValues;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, sqlite_1.openDB)()];
            case 1:
                db = _a.sent();
                id = object.id;
                delete object.id;
                cols = Object.keys(object)
                    .map(function (e) { return "".concat(e, "=?"); });
                updateStatement = "update ".concat(table, " set ").concat(cols.join(','), " where ").concat(table, ".id = ?;");
                updateValues = Object.values(object);
                updateValues.push(id);
                return [4, db.run(updateStatement, updateValues)];
            case 2:
                _a.sent();
                return [4, (0, sqlite_1.closeDB)(db)];
            case 3:
                _a.sent();
                return [2];
        }
    });
}); };
exports.update = update;
var findByID = function (object, table) { return __awaiter(void 0, void 0, void 0, function () {
    var db, select, record;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, sqlite_1.openDB)()];
            case 1:
                db = _a.sent();
                select = "select * from ".concat(table, " where ").concat(table, ".id = ?");
                return [4, db.get(select, object.id)];
            case 2:
                record = _a.sent();
                return [4, (0, sqlite_1.closeDB)(db)];
            case 3:
                _a.sent();
                return [2, record];
        }
    });
}); };
exports.findByID = findByID;
var fetch = function (table) { return __awaiter(void 0, void 0, void 0, function () {
    var db, select, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, sqlite_1.openDB)()];
            case 1:
                db = _a.sent();
                select = "select * from ".concat(table, ";");
                return [4, db.all(select)];
            case 2:
                results = _a.sent();
                return [4, (0, sqlite_1.closeDB)(db)];
            case 3:
                _a.sent();
                return [2, results];
        }
    });
}); };
exports.fetch = fetch;
//# sourceMappingURL=db.js.map