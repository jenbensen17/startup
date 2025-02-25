import React from 'react';
import './workout.css'
import { ExerciseRecord } from './exerciseRecord';

export function Workout() {
  return (
    <main className='workout-page'>
    <form method="get" action='index.html'>
        <h2>LOG YOUR WORKOUT HERE</h2>
    <button type="button">Save and Record</button>
    <ExerciseRecord />


    </form>
            <button id="add-exercise-btn" type="button">Add Exercise</button>
    </main>
  );
}