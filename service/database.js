const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('defcor');
const userCollection = db.collection('user')
const workoutCollection = db.collection('workout')
const maxLiftsCollection = db.collection('max-lifts')

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log(`Connect to database`);
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function addWorkout(workout) {
    return workoutCollection.insertOne(workout);
}

async function getWorkouts(userEmail) {
    return workoutCollection.find({userEmail}).toArray();
}

async function getMaxLifts(userEmail) {
    return maxLiftsCollection.findOne({userEmail});
}

async function updateMaxLifts(userEmail, maxLifts) {
    return maxLiftsCollection.updateOne({userEmail}, {$set: maxLifts}, {upsert: true});
}

module.exports = { 
    getUser, 
    getUserByToken, 
    addUser, 
    updateUser, 
    addWorkout, 
    getWorkouts, 
    getMaxLifts, 
    updateMaxLifts 
};