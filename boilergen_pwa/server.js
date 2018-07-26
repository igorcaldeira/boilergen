const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();
const zencode = require('./apiZencode');
const awsApi = require('./aws');
const upload = require('express-fileupload');
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/aws', awsApi);
app.use('/api/zencode', zencode);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log(`Server started in ${appEnv.url} :)`);
});
