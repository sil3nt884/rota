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
exports.closeDB = exports.openDB = void 0;
var sqlite3 = require("sqlite3");
var sqlite_1 = require("sqlite");
var promises_1 = require("fs/promises");
var fs_1 = require("fs");
exports["default"] = (function () { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = process.env.dbLocation || '../db/database.db';
                return [4, (0, promises_1.access)(db, fs_1.constants.F_OK)["catch"](function () { return __awaiter(void 0, void 0, void 0, function () {
                        var database;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log('file deos not exisit creating file');
                                    (0, promises_1.open)(db, 'w+')
                                        .then(function (e) { return e.close(); });
                                    return [4, (0, exports.openDB)()];
                                case 1:
                                    database = _a.sent();
                                    createDB(database);
                                    return [2];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                console.log('DB exist at', db);
                return [2];
        }
    });
}); });
var openDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        db = process.env.dbLocation || '../db/database.db';
        return [2, (0, sqlite_1.open)({
                filename: db,
                driver: sqlite3.Database
            })];
    });
}); };
exports.openDB = openDB;
var createDB = function (database) { return __awaiter(void 0, void 0, void 0, function () {
    var scriptsFiles, scripts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                scriptsFiles = process.env.scriptFiles || 'src/service/scripts/';
                return [4, (0, promises_1.readdir)(scriptsFiles)];
            case 1:
                scripts = _a.sent();
                scripts
                    .map(function (file) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, (0, promises_1.readFile)("".concat(scriptsFiles, "/").concat(file), 'utf-8')];
                        case 1: return [2, _a.sent()];
                    }
                }); }); })
                    .forEach(function (e) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = database).exec;
                            return [4, e];
                        case 1: return [2, _b.apply(_a, [_c.sent()])];
                    }
                }); }); });
                return [2];
        }
    });
}); };
var closeDB = function (db) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2, db.close()];
}); }); };
exports.closeDB = closeDB;
//# sourceMappingURL=sqlite.js.map