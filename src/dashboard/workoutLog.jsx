import React from 'react';
import { Exercise } from './exercise';
import { useEffect } from 'react';


export function WorkoutLog(props) {
    const userName = props.userName;
    const workoutDate = props.workoutDate;
    const workoutID = `${userName}-workout-${workoutDate}`;
    const [numLikes, setNumLikes] = React.useState(0);
    const [likedWorkout, setLikedWorkout] = React.useState(false);
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState();


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


    useEffect(() => {
        const storedWorkoutData = JSON.parse(localStorage.getItem(workoutID)) || {
            comments: [],
            numLikes: 0,
            likedWorkout: false,
        };
        setComments(storedWorkoutData.comments);
        setNumLikes(storedWorkoutData.numLikes);
        setLikedWorkout(storedWorkoutData.likedWorkout);
    }, [workoutID])

    useEffect(() => {
        const workoutData = {
            comments,
            numLikes,
            likedWorkout
        };
        localStorage.setItem(workoutID, JSON.stringify(workoutData));
    }), [comments, numLikes, likedWorkout, workoutID];

    const handleCommentButton = () => {
        if (newComment.trim() === "") return;
        setComments([...comments, { user: userName, text: newComment }]);
        setNewComment("");
      };

    // // setInterval(() => {
    // //     const user = `User-${Math.floor(Math.random() * 100)}`;
    // //     setComments([...comments, {user: user, text: "beast mode!"}])
        
    // // }, 5000);

    // setInterval(() => {
    //     setNumLikes(
    //         numLikes + 1
    //     )
    // }, 7000);


    return (
    <>
    <div className="workout">
      <div id="workout-title">
        <img src="/dumbbell.png" width="50"/>
        <h3> Early Morning Workout <span id="workout-date"><span id="hyphen">-</span> {workoutDate}</span></h3>
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
          <div className='comment-form'>
            <div>
              <input 
              type="text" 
              placeholder="" 
              value={newComment}
              onChange={(e) =>{
                setNewComment(e.target.value) 
                }}
                
                />
              <button type="button"
                onClick={handleCommentButton}
              >Comment</button>
            </div>
        </div>
      </div>

      <div className="comments">
          <h3>Comments</h3>
          <ul>
          {comments && comments.map((comment, index) => (
                <li key={index}>
                    {comment.user}: <span>{comment.text}</span>
                </li>
            ))}
        </ul>
      </div>  
    </div>
    </>
    )
}