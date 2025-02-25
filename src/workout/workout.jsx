import React from 'react';
import './workout.css'
import { ExerciseRecord } from './exerciseRecord';
import { SearchExercises } from './searchExercises';

export function Workout() {

    const [showModal, setShowModal] = React.useState(false);
    const [exercises, setExercises] = React.useState([]);

    const addExercise = (exercise) => {
        setExercises((prevExercises) => [...prevExercises, exercise]);
        setShowModal(false);
      };

  return (
    <main className='workout-page'>
    <div className='record-form'>
        <h2>LOG YOUR WORKOUT HERE</h2>
        <button type="button">Save and Record</button>
        {exercises.map((exercise, index) => (
          <ExerciseRecord key={index} exerciseName={exercise} />
        ))}
        <button id="add-exercise-btn" onClick={() => setShowModal(true)} >Add Exercise</button>
    </div>
    {showModal && <SearchExercises onClose={() => setShowModal(false)}  onSelect={addExercise} />}
    </main>
  );
}