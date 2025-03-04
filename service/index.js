const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

// The users are saved in memory and disappear whenever the service is restarted.
let users = [];
let workouts = [];


// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Serve up the front-end static content hosting
app.use(express.static('public'));

let apiRouter = express.Router();
app.use(`/api`, apiRouter);
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

