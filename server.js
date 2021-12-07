'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
var bodyParser = require('body-parser');

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },
  filename: (req, file ,cb) => {
    cb(null, file.originalname)
  }
})

var upload = multer({storage});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  let responseObj = {};
  responseObj.name = req.file.filename;
  responseObj.type = req.file.mimetype;
  responseObj.size = req.file.size;
  console.log(req.file);
  res.json(responseObj);
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
