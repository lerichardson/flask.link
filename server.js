"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var open = require("open");
var app = express_1.default();
var path = require('path');
var router = express_1.default.Router();
var fileDir = "public";
app.use(express_1.default.static(__dirname + "/" + fileDir));
app.listen(3000, function () {
    app.use('/', router);
    console.log("The application is listening on port 3000!");
    open("http://localhost:3000");
});
