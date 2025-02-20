import React from 'react';
import { Exercise } from './exercise';


export function WorkoutLog(props) {
    const [numLikes, setNumLikes] = React.useState(0);
    const [likedWorkout, setLikedWorkout] = React.useState(false);
    const benchPressData = [
        { set: 1, weight: "195 lb", reps: "x 8" },
        { set: 2, weight: "195 lb", reps: "x 8" },
        { set: 3, weight: "195 lb", reps: "x 8" },
    ];
    const backSquatData = [
        { set: 1, weight: "245 lb", reps: "x 3" },
        { set: 2, weight: "335 lb", reps: "x 5" },
        { set: 3, weight: "335 lb", reps: "x 5" },
    ];
    return (
    <>
    <div className="workout">
      <div id="workout-title">
        <img src="/dumbbell.png" width="50"/>
        <h3> Early Morning Workout <span id="workout-date"><span id="hyphen">-</span> Tuesday, Jan 21 2025</span></h3>
      </div>
        <Exercise title="Bench Press" data={benchPressData}/>
        <Exercise title ="Back Squat" data={backSquatData} />
        <div className="social">
          <div className="like">
            <button
            onClick={() => {
              if(!likedWorkout) {
                setNumLikes(
                numLikes + 1
              )
              setLikedWorkout(true)
            } else {
                setNumLikes(
                    numLikes - 1
                )
                setLikedWorkout(false)
            }
            }}
            
            >
                <img src="/thumbs_up.png"/>
            </button>
            <span>{numLikes}</span>
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
    </>
    )
}