const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const PORT = 8080;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
require('./app/routes/role.route')(app);
require('./app/routes/user.route')(app);
require('./app/routes/course.route')(app);
require('./app/routes/announcement.route')(app);
require('./app/routes/content.route')(app);
require('./app/routes/department.route')(app);
require('./app/routes/assignment.route')(app);
require('./app/routes/attachment.route')(app);


app.listen(PORT, () => {
  console.log(`Server is running at site: http://localhost:${PORT}`);
});
