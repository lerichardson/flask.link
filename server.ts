import express from "express";
const redir = require("./src/redir")
const app = express();
const router = express.Router();
const fileDir = `public`
app.listen(3000, () => {
    console.log(`Server is listening on http://localhost:3000`)
  })
app.use(express.static(fileDir, {
    extensions: ['html', 'htm'],
}));