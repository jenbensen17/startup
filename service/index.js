const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const express = require('express');
const app = express();
const DB = require('./database.js')
const {peerProxy} = require('./peerProxy.js')

const authCookieName = 'token';



// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);
  
//CreateAuth a new user
apiRouter.post('/auth/create', async(req, res) => {
    if(await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);
        setAuthCookie(res, user.token);
        res.send({email: user.email})
    }
})

// GetAuth login an existing user
apiRouter.post('/auth/login', async(req, res) => {
    const user = await findUser('email', req.body.email);
    if(user) {
        if(await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({email: user.email});
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
})

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
      delete user.token;
      DB.updateUser(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
  });


// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if(user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
}

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });
  
// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });


//CreateWorkout
apiRouter.post('/workouts', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);

    if(!req.body.date || !req.body.exercises) {
        return res.status(400).send({msg: 'Invalid workout data'})
    }



    const workout = {
        userEmail: user.email,
        date: req.body.date,
        timestamp: req.body.timestamp,
        exercises: req.body.exercises,
        comments: [],
        likedBy: [],
        numLikes: 0,
        likedWorkout: false,
    }

    await DB.addWorkout(workout);
    res.status(200).send(workout);
})


//Get workouts
apiRouter.get('/workouts/:userName', verifyAuth, async(req, res) => {
    const user = req.params.userName;
    if(!user) {
        return res.status(404).send({msg: 'User not found'})
    }
    const userWorkouts = await DB.getWorkouts(user)
    res.status(200).send({userWorkouts: userWorkouts})
})


//Get max lifts
apiRouter.get('/max-lifts/:userName', verifyAuth, async(req, res) => {
    const user = req.params.userName;
    const maxLifts = await DB.getMaxLifts(user)
    res.send(maxLifts || { Bench: 0, Squat: 0, Deadlift: 0 });
})

//Update Max Lifts - use put because we are updating records
apiRouter.put('/max-lifts', verifyAuth, async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if(!req.body.maxLifts) {
        return res.status(400).send({msg: 'Invalid lift data'});
    }
    await DB.updateMaxLifts(user.email, req.body.maxLifts)
    res.status(200).send({msg: 'Max lifts updated'});    
})

//Add Likes
apiRouter.post('/workouts/:userName/:workoutTimestamp/like', verifyAuth, async(req, res) => {
    const {userName, workoutTimestamp} = req.params;
    const actingUser = await findUser('token', req.cookies[authCookieName]);

    const workout = await DB.findSpecificWorkout(userName, workoutTimestamp);
    if (!workout) {
        return res.status(404).send({ msg: "Workout not found" });
    }

   if(!workout.likedBy.includes(actingUser.email)) {
    workout.likedBy.push(actingUser.email); 
   } else {
    workout.likedBy = workout.likedBy.filter(user => user !== actingUser.email);
   }
   workout.numLikes = workout.likedBy.length;

   await DB.updateWorkoutLikes(workout._id, workout.likedBy, workout.numLikes);

    res.status(200).send({ numLikes: workout.numLikes});
})

//add comments
apiRouter.post('/workouts/:userName/:workoutTimestamp/comment', verifyAuth, async (req, res) => {

    const { userName, workoutTimestamp } = req.params;
    const user = await findUser('token', req.cookies[authCookieName]);

    const workout = await DB.findSpecificWorkout(userName, workoutTimestamp);
    if (!workout) {
        return res.status(404).send({ msg: "Workout not found" });
    }
    const newComment = {user: user.email, text: req.body.comment};
    workout.comments.push(newComment);
    await DB.updateWorkoutComments(workout._id, workout.comments);

    res.status(200).send({ comments: workout.comments });
})


async function findUser(field, value) {
    if (!value) return null;
  
    if (field === 'token') {
        return DB.getUserByToken(value);
      }
      return DB.getUser(value);
  }

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await DB.addUser(user);
    return user;
}


function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

peerProxy(httpService);