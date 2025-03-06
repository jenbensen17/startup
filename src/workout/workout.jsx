import React from 'react';
import './workout.css'
import { ExerciseRecord } from './exerciseRecord';
import { SearchExercises } from './searchExercises';
import { fetchMaxLifts } from '../util/maxLifts';
import { useNavigate } from 'react-router-dom';


export function Workout(props) {
    const userName = props.userName;
    const [showModal, setShowModal] = React.useState(false);
    const [exercises, setExercises] = React.useState([]);
    const [exerciseSets, setExerciseSets] = React.useState({})
    const [maxLifts, setMaxLifts] = React.useState({ Bench: 0, Squat: 0, Deadlift: 0 });

    const navigate = useNavigate();

    React.useEffect(() => {
      async function checkMaxLifts() {
        const data = await fetchMaxLifts(userName);
        setMaxLifts(data)
      }
      checkMaxLifts();
    }, []);


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
          timestamp: workoutTimestamp,
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
        await updateMaxLifts(workoutData)

       navigate(`/dashboard/${userName}`)

      } catch (error) {
        console.error('Error saving workout:', error);
      }
    }

    const updateMaxLifts = async(workoutData)=> {
      let newMaxLifts = { ...maxLifts };
      workoutData.forEach((exercise) => {
        exercise.sets.forEach((set) => {
          if (exercise.name === "Bench Press" && set.weight > newMaxLifts.Bench) {
            newMaxLifts.Bench = set.weight;
          } else if (exercise.name === "Squat" && set.weight > newMaxLifts.Squat) {
            newMaxLifts.Squat = set.weight;
          } else if (exercise.name === "Deadlift" && set.weight > newMaxLifts.Deadlift) {
            newMaxLifts.Deadlift = set.weight;
          }
        });
      });

      try {
        const response = await fetch('/api/max-lifts', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ maxLifts: newMaxLifts })
        }) 
        if (response.ok) {
          setMaxLifts(newMaxLifts);
        }
      } catch (error) {
        console.error('Error updating max lifts:', error);
      }
    }

  return (
    <main className='workout-page'>
    <div className='record-form'>
        <h2>LOG YOUR WORKOUT HERE</h2>
            <button type="button"
            id='save-button'
            onClick={saveWorkout}
            disabled={exercises.length < 1}
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