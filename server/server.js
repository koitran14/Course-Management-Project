const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

require('./app/routes/role.route')(app);
require('./app/routes/user.route')(app);
require('./app/routes/course.route')(app);


app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running at site: http://localhost:${PORT}`);
});
