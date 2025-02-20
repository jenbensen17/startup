import React from 'react';

export function WorkoutLog(props) {
    const [numLikes, setNumLikes] = React.useState(0);
    const [likedWorkout, setLikedWorkout] = React.useState(false);
  
    return (
    <>
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