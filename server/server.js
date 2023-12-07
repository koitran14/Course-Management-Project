const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const cors = require('cors');
const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
//const auth = require

require('./app/routes/home.route')(app);

app.use(function (req, res, next) 
{
  let check = false;

  if (check)  {
      next();
  } else {
      res.redirect('/login');
  }
});

require('./app/routes/user.route')(app);
require('./app/routes/role.route')(app);
require('./app/routes/content.route')(app);

app.listen(PORT, () => {
  console.log(`Server is running at site: http://localhost:${PORT}`);
});
