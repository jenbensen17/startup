import React from 'react';
import './dashboard.css'
import { NavLink } from 'react-router-dom';
import { WorkoutLog } from './workoutLog';

export function Dashboard(props) {
  const userName = props.userName;

  const [workoutLogs , setWorkoutLogs] = React.useState([]);

  React.useEffect(() => {

    const storedWorkouts = Object.keys(localStorage)
    .filter((key) => key.startsWith(`${userName}-workout-`))
    .map((key) => JSON.parse(localStorage.getItem(key)))


    storedWorkouts.sort((a, b) => new Date(b.workoutDate) - new Date(a.workoutDate));

    setWorkoutLogs(storedWorkouts)
  }, [userName])


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
              <td>280 lbs</td>
              <td>415 lbs</td>
              <td>475 lbs</td>
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
                    workoutLogs.map((workout, index) => (
                        <WorkoutLog key={index} userName={userName} workoutDate={workout.workoutDate} />
                    ))
                ) : (
                    <p>No workouts logged yet.</p>
                )}
    </div>
  </main>
  );
}