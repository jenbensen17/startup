import React from 'react';
import './dashboard.css'
import { NavLink } from 'react-router-dom';
import { WorkoutLog } from './workoutLog';

export function Dashboard(props) {
  const userName = props.userName;

  const [workoutLogs , setWorkoutLogs] = React.useState([]);
  const maxBench = localStorage.getItem(`${userName}-maxBench`) || 0;
  const maxSquat = localStorage.getItem(`${userName}-maxSquat`) || 0;
  const maxDeadlift = localStorage.getItem(`${userName}-maxDeadlift`) || 0;


  React.useEffect(() => {

    const fetchWorkouts = async() => {
      const response = await fetch('/api/workouts', {
        method: 'GET'
      })
      const data = await response.json();
      setWorkoutLogs(data.userWorkouts)
      
    }
    fetchWorkouts();
  }, [])




  return (
    <main className="dashboard-page">
    <div className="user-info">
      <span className="username"> User: {userName}</span>
      <div className="max-lifts">
          <table id="max-lifts">
            <caption>Max Lifts</caption>
            <tbody>
              <tr>
              <th>Bench</th>
              <th>Squat</th>
              <th>Deadlift</th>
              </tr>
              <tr>
              <td>{maxBench} lbs</td>
              <td>{maxSquat} lbs</td>
              <td>{maxDeadlift} lbs</td>
              </tr>
            </tbody>
          </table>
        </div>
        <NavLink to='../workout'>
          <button>Log New Workout</button>
        </NavLink>
    </div>
    <div className='workout-logs'>
    {workoutLogs.length > 0 ? (
                     workoutLogs.map((workout) => (
                      <WorkoutLog 
                          key={workout.timestamp} 
                          userName={userName} 
                          workoutDate={workout.date} 
                          workoutTimestamp={workout.timestamp} 
                          exercises = {workout.exercises}
                          likedWorkout = {workout.likedWorkout}
                          numLikes = {workout.numLikes}
                          comments = {workout.comments}
                      />
                  ))
                ) : (
                    <p>No workouts logged yet.</p>
                )}
    </div>
  </main>
  );
}