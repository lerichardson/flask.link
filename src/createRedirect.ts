import express from "express";
import fs from "fs";
const app = express();
function createRedirect() {
const router = express.Router();
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
    try {
    if (fs.existsSync(req.body.path)) {
    res.redirect(`/error?type=alreadyExists`);
  } else {
    try {
      fs.writeFile(req.body.path+`.html`, fileData, function (err) {
        if (err) res.redirect(`/error?type=unknownError`);
        console.log('Saved!');
      })
    } catch (error) {
      
    }
  }}
  catch (err) {
    console.error(err);
    res.redirect(`/error?type=unknownError`)
}})};

