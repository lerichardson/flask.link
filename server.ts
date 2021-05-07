import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const bodyParser = require("body-parser")
const hcaptcha = require('express-hcaptcha');
const redir = require("./src/redir")
const app = express();
const router = express.Router();
const fileDir = `public`
const SECRET = 0x0000000000000000000000000000000000000000;
app.use(express.static(fileDir, {
    extensions: ['html', 'htm'],
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.listen(3000, () => {
    console.log(`Server is listening on http://localhost:3000`)
  })
  app.post('/verify', hcaptcha.middleware.validate(SECRET), (req, res) => {
    res.json({message: 'verified!'});
  });
  app.post('/submit', (req, res) => {
    console.log(req.body.test1)
    console.log(req.body.test2)
    console.log(req.body.test3)
    res.redirect(`/home`)
  })
// some server settings

