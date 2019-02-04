const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const upload = require('express-fileupload');
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log(`Server started in ${appEnv.url} :)`);
});
