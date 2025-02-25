import React from 'react';
import './workout.css'
import { ExerciseRecord } from './exerciseRecord';
import { SearchExercises } from './searchExercises';

export function Workout(props) {
    const userName = props.userName;
    const [showModal, setShowModal] = React.useState(false);
    const [exercises, setExercises] = React.useState([]);
    const [exerciseSets, setExerciseSets] = React.useState({})

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

    const saveWorkout = () => {
        const workoutDate = new Date().toLocaleDateString();
        const workoutData = exercises.map((exercise) => {
            return {
                name: exercise,
                sets: exerciseSets[exercise] || []
            }
        })
        localStorage.setItem(`${userName}-workout-${workoutDate}`, JSON.stringify({ workoutDate, workoutData }));
    }

  return (
    <main className='workout-page'>
    <div className='record-form'>
        <h2>LOG YOUR WORKOUT HERE</h2>
        <button type="button"
         onClick={saveWorkout}
         >Save and Record</button>
        {exercises.map((exercise, index) => (
          <ExerciseRecord key={index} exerciseName={exercise} onSetChange= {(sets) => handleSetChange(exercise, sets)} />
        ))}
        <button id="add-exercise-btn" onClick={() => setShowModal(true)} >Add Exercise</button>
    </div>
    {showModal && <SearchExercises onClose={() => setShowModal(false)}  onSelect={addExercise} />}
    </main>
  );
}