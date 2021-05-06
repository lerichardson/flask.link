import express from "express";
const open = require(`open`);
const app = express();
const path = require('path');
const router = express.Router();
const fileDir = `public`
app.use(express.static(`${__dirname}/${fileDir}`));
app.listen(3000, () => {
    app.use('/', router);
    console.log(`The application is listening on port 3000!`);
    open(`http://localhost:3000`)
})