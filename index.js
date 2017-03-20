var express = require("express");
var app = express();   // create our app w/ express

var http = require('http');
var Stream = require('stream').Transform;
var fs = require('fs');
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// SEO
app.use(require('prerender-node').set('prerenderToken', 'MfU65RBgi8KRKjxlJtXD'));

// upload ========================

var multer = require('multer');
var storageMood = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/moods/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, '_'))
  }
})

var upload = multer({ storage: storageMood });

var storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/users/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, '_'))
  }
})

var uploadUser = multer({ storage: storageUser });

var storagePlace = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/places/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, '_'))
  }
})

var uploadPlace = multer({ storage: storagePlace });

var storageParcour = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/parcours/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, '_'))
  }
})

var uploadParcour = multer({ storage: storageParcour });


// configuration =================
mongoose.connect('mongodb://localhost:27017/test');     
// connect to mongoDB database
//mongoose.connect('mongodb://preview.w0jghuyc4gh6ko6rav29qnoke7y14izmkvsxjurjzqto6r.box.codeanywhere.com:27017/test');     


app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(express.static(__dirname+ "/app"));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/js', express.static(__dirname + '/app/js'));
app.use('/css', express.static(__dirname + '/app/css'));
app.use('/pages', express.static(__dirname + '/app/pages'));
app.use('/upload', express.static(__dirname + '/upload'));

// routes ======================================================================
require('./app-data/routes.js')(app);
// webhooks ====================================================================
require('./app-data/webhooks.js')(app);

app.post('/upload/mood', upload.array('images'), function (req, res, next) {
  // req.file is the `avatar` file
  console.log(req.files);
  // req.body will hold the text fields, if there were any
  res.json({status: 'success', files: req.files});
})

app.post('/upload/user', uploadUser.array('images'), function (req, res, next) {
  // req.file is the `avatar` file
  console.log(req.files);
  // req.body will hold the text fields, if there were any
  res.json({status: 'success', files: req.files});
})

app.post('/upload/place', uploadPlace.array('images'), function (req, res, next) {
  // req.file is the `avatar` file
  console.log(req.files);
  // req.body will hold the text fields, if there were any
  res.json({status: 'success', files: req.files});
})

app.post('/upload/parcour', uploadParcour.array('images'), function (req, res, next) {
  // req.file is the `avatar` file
  console.log(req.files);
  // req.body will hold the text fields, if there were any
  res.json({status: 'success', files: req.files});
})

//Download file from url
app.post('/download', function (req, res) {
  
  //Log file url
  console.log(req.body.url);
  
  //ask for image data
  http.request(req.body.url, function(response) {                                        
    var data = new Stream();                                                    

    response.on('data', function(chunk) {                                       
      data.push(chunk);                                                         
    });                                                                         

    response.on('end', function() { 
      //write file to folder
      fs.writeFile(__dirname+'/upload/users/'+req.body.name, data.read());                               
    });                                                                         
  }).end();
 
  res.send('data downloaded');
})

app.listen(8000, function(){
    console.log("Server is listening on port 8888");
});


//must be at the end
app.get('*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('app/index.html', { root: __dirname });
});