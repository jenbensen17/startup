import React from 'react';
import './workout.css'

export function Workout() {
  return (
    <main className='workout-page'>
    <form method="get" action='index.html'>
        <h2>LOG YOUR WORKOUT HERE</h2>
    <button type="button">Save and Record</button>
    <div>
    <div className="exercise">
                <img src="/dumbbell.png" width="25"/>
                <h3> 
                    Bench Press
                </h3>
            </div>
        <table>

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
                <td>
                    <input type="text" placeholder="195"/>
                </td>
                <td>
                    <input type="text" placeholder="8"/>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>
                    <input type="text" placeholder="--"/>
                </td>
                <td>
                    <input type="text" placeholder="--"/>
                </td>
            </tr>
            <tr>
                <td>3</td>
                <td>
                    <input type="text" placeholder="--"/>
                </td>
                <td>
                    <input type="text" placeholder="--"/>
                </td>
            </tr>
            </tbody>
        </table>
        <button id="add-set-btn" type="button">+ Add Set</button>
        <button id="add-exercise-btn" type="button">Add Exercise</button>
        </div>


    </form>
    </main>
  );
}