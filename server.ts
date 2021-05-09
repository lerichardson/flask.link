import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
dotenv.config();
const bodyParser = require(`body-parser`)
const hcaptcha = require(`express-hcaptcha`);
const { redir } = require(`./src/createRedirect`)
const rateLimit = require(`express-rate-limit`);
const app = express();
const router = express.Router();
const fileDir = `public`
const SECRET = process.env.HCAPTCHA_SECRET_KEY;
const creationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3
});
// Since i'm using cloudflare
app.set('trust proxy', 1);
app.use("/submit", creationLimiter);
// remove `.html` from URLs for a e s t h e t i c
app.use(express.static(fileDir, {
    extensions: ['html', 'htm'],
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.listen(3000, () => {
    console.log(`Server is listening on http://localhost:3000`)
  })
    app.post('/submit', (req: express.Request, res: express.Response) => {
    // God be with my soul
    const fileData = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Redirecting...</title>
        <script type="text/javascript">
            window.location.href = "${req.body.destinationUrl}";
        </script>
      </head>
      <body>
        <h2 id="errorLarge"></h2>
        <p id="errorText"></p>
        <small id="errorHint"></small>
        <h1>You're being redirected.</h1>
      </body>
    </html>
    `;
        res.redirect(`/home`)
        if (fs.existsSync(req.body.path)) {
        res.redirect(`/error?type=alreadyExists`);
      } else {
          fs.writeFile(__dirname+`/public/`+req.body.path+`.html`, fileData, function(err){console.log(err)});
      }}),
  app.get('/', function(req: express.Request, res: express.Response) {
    res.redirect('/home');
  });
// some server settings

