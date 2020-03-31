const express = require('express');
const multer = require("multer");
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const auth = require("./middleware/auth");
const date = require("date-and-time");

const app = express();
app.use(express.static('uploads/'));

const now = new Date();
const newDate = date.format(now, 'YYYY-MM-DD-HH');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/uploads/auction_items`);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + newDate + "-" + file.originalname);
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})
 
var upload = multer({ storage: storage,  limits: { fileSize: 1 * 1024 * 1024 } })

module.exports.upload = upload;

// Bodyparser Middleware
// parse application/x-www-form-urlencoded
// app.use(express.json()).unless({ path: ['/online']});

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Create A Demo Auction
// const Auction = require("./models/Auction");

// const newAuction = new Auction({
//   name:"Gamdias m1 Keyboard",
//   images:[{
//     first_image:"https://first_image",
//     second_image:"https://second_image",
//     third_image:"https://third_image"
//   }],
//   description:"This is a small Description of the product ... ",
//   catagory:"Electronics"
// });

// newAuction.save().then(auction=> console.log(auction));


//Only Creating Auction will be handeled here
app.post('/auction/add',  upload.array("profile_pic"), function(req, res) {
  
  // console.log(req.files);
  res.json(req.files);
  
});

// Use Routes
// app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use("/api/auction",require("./routes/api/auction"))
// app.use("/api/posts", require("./routes/api/post"));

// Serve static assets if in production
// process.env.NODE_ENV === 'production'
if (true) {
  // Set static folder
  // app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));