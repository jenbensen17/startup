import React from 'react';
import './dashboard.css'
import { NavLink } from 'react-router-dom';

export function Dashboard() {
  return (
    <main className="dashboard-page">
    <div className="user-info">
      <span className="username"> User: Username</span>
      <div className="max-lifts">
          <table id="max-lifts">
            <caption>Max Lifts</caption>
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
          </table>
        </div>
        <NavLink to='../workout'>
          <button>Log New Workout</button>
        </NavLink>
    </div>

    <div className="workout">
      <div id="workout-title">
        <img src="/dumbbell.png" width="50"/>
        <h3> Early Morning Workout <span id="workout-date"><span id="hyphen">-</span> Tuesday, Jan 21 2025</span></h3>
      </div>
      <table>
          <caption>
              Bench Press
          </caption>
          <thead>
            <tr>
              <th>Set</th>
              <th>Weight</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>195 lb</td>
              <td>x 8</td>
            </tr>
            <tr>
              <td>2</td>
              <td>195 lb</td>
              <td>x 8</td>
            </tr>
            <tr>
              <td>3</td>
              <td>195 lb</td>
              <td>x 8</td>
            </tr>
          </tbody>
        </table>
        <br/>
        <table>
          <caption>
              Back Squat
          </caption>
          <thead>
            <tr>
              <th>Set</th>
              <th>Weight</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>245 lb</td>
              <td>x 3</td>
            </tr>
            <tr>
              <td>2</td>
              <td>335 lb</td>
              <td>x 5</td>
            </tr>
            <tr>
              <td>3</td>
              <td>335 lb</td>
              <td>x 5</td>
            </tr>
          </tbody>
        </table>
        <div className="social">
          <div className="like">
            <button>
                <img src="/thumbs_up.png"/>
            </button>
            <span>2</span>
          </div>
          <br/>
          <form method="get" action="">
            <div>
              <input type="text" placeholder="" />
              <button type="submit">Comment</button>
            </div>
        </form>
      </div>

      <div className="comments">
          <h3>Comments</h3>
          <ul>
            <li>
                Joe: <span>Beast Mode</span>
            </li>
            <li>
                Max: <span>nice</span>
            </li>
        </ul>
      </div>  
    </div>
  </main>
  );
}