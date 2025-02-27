import React from 'react';
import './workout.css'
import { ExerciseRecord } from './exerciseRecord';
import { SearchExercises } from './searchExercises';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

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
      const workoutTimestamp = new Date().toISOString();
      const workoutData = exercises.map((exercise) => ({
          name: exercise,
          sets: exerciseSets[exercise] || []
      }));

      const workoutEntry = {
          workoutDate,
          exercises: workoutData,
          comments: [],
          numLikes: 0,
          likedWorkout: false
      };

      localStorage.setItem(`${userName}-workout-${workoutTimestamp}`, JSON.stringify(workoutEntry));
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