import React from 'react';
import './dashboard.css'
import { NavLink, useParams } from 'react-router-dom';
import { WorkoutLog } from './workoutLog';
import { fetchMaxLifts } from '../util/maxLifts';

export function Dashboard(props) {
  const userName = props.userName;
  const {dashboardUser} = useParams();
  const [workoutLogs , setWorkoutLogs] = React.useState([]);
  const [maxLifts, setMaxLifts] = React.useState({ Bench: 0, Squat: 0, Deadlift: 0 });


  React.useEffect(() => {

    const fetchWorkouts = async() => {
      const response = await fetch(`/api/workouts/${dashboardUser}`, {
        method: 'GET'
      })
      const data = await response.json();
      setWorkoutLogs(data.userWorkouts)
      
    }
    fetchWorkouts();
    console.log(dashboardUser)

    async function checkMaxLifts() {
      const data = await fetchMaxLifts(dashboardUser);
      setMaxLifts(data)
    }
    checkMaxLifts();
  }, [])






  return (
    <main className="dashboard-page">
    <div className="user-info">
      <span className="username"> User: {dashboardUser}</span>
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
              <td>{maxLifts.Bench} lbs</td>
              <td>{maxLifts.Squat} lbs</td>
              <td>{maxLifts.Deadlift} lbs</td>
              </tr>
            </tbody>
          </table>
        </div>
        {userName === dashboardUser ? (
          <NavLink to='../workout'>
          <button>Log New Workout</button>
        </NavLink>
        ) : (
          <NavLink to={`../dashboard/${userName}`}>
            <button>Return to My Dashboard</button>
          </NavLink>
        )

        }
        
    </div>
    <div className='workout-logs'>
    {workoutLogs?.length > 0 ? (
                     workoutLogs.map((workout) => (
                      <WorkoutLog 
                          key={workout.timestamp} 
                          userName={dashboardUser} 
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