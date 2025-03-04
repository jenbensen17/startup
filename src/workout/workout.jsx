import React from 'react';
import './workout.css'
import { ExerciseRecord } from './exerciseRecord';
import { SearchExercises } from './searchExercises';
import { NavLink } from 'react-router-dom';

export function Workout(props) {
    const userName = props.userName;
    const [showModal, setShowModal] = React.useState(false);
    const [exercises, setExercises] = React.useState([]);
    const [exerciseSets, setExerciseSets] = React.useState({})
    const [maxLifts, setMaxLifts] = React.useState({ Bench: 0, Squat: 0, Deadlift: 0 });

    const addExercise = (exercise) => {
        setExercises((prevExercises) => [...prevExercises, exercise]);
        setShowModal(false);
      };


    const handleSetChange = (exerciseName, sets) => {
        setExerciseSets((prevSets) => ({
            ...prevSets,
            [exerciseName]: sets,
        }))
    }

    const saveWorkout = async () => {
      const workoutDate = new Date().toLocaleDateString();
      const workoutTimestamp = new Date().toISOString();
      const workoutData = exercises.map((exercise) => ({
          name: exercise,
          sets: exerciseSets[exercise] || []
      }));

      const workoutEntry = {
          date: workoutDate,
          exercises: workoutData,
      };


      try {
        const response = await fetch('/api/workouts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(workoutEntry)
        });

        if(!response.ok) {
          throw new Error('Failed to save workout')
        }
        updateMaxLifts(workoutData)
      } catch (error) {
        console.error('Error saving workout:', error);
      }
    }

  return (
    <main className='workout-page'>
    <div className='record-form'>
        <h2>LOG YOUR WORKOUT HERE</h2>
        <NavLink to="../dashboard"> 
            <button type="button"
            id='save-button'
            onClick={saveWorkout}
            disabled={exercises.length < 1}
            >Save and Record</button>
        </NavLink>
        {exercises.map((exercise, index) => (
          <ExerciseRecord key={index} exerciseName={exercise} onSetChange= {(sets) => handleSetChange(exercise, sets)} />
        ))}
        <button id="add-exercise-btn" onClick={() => setShowModal(true)} >Add Exercise</button>
    </div>
    {showModal && <SearchExercises onClose={() => setShowModal(false)}  onSelect={addExercise} />}
    </main>
  );
}