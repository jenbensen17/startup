import React from 'react';
import { Exercise } from './exercise';
import { useEffect } from 'react';


export function WorkoutLog(props) {
    const userName = props.userName;
    const workoutDate = props.date;
    const workoutTimestamp = props.timestamp;
    const workoutID = `${userName}-workout-${workoutTimestamp}`;
    const [numLikes, setNumLikes] = React.useState(0);
    const [likedWorkout, setLikedWorkout] = React.useState(false);
    const [comments, setComments] = React.useState([]);
    const [newComment, setNewComment] = React.useState("");
    const [exercises, setExercises] = React.useState([]);
    const [users, setUsers] = React.useState(new Set());
    


    useEffect(() => {
      const storedWorkoutData = JSON.parse(localStorage.getItem(workoutID)) || {
          exercises: [],
          comments: [],
          numLikes: 0,
          likedWorkout: false,
      };
      setExercises(storedWorkoutData.exercises || []);
      setComments(storedWorkoutData.comments || []);
      setNumLikes(storedWorkoutData.numLikes || 0);
      setLikedWorkout(storedWorkoutData.likedWorkout || false);

  }, [workoutID]);

  useEffect(() => {
    const workoutData = {
        workoutDate,
        exercises,
        comments,
        numLikes,
        likedWorkout
    };
    localStorage.setItem(workoutID, JSON.stringify(workoutData));
}, [comments, numLikes, likedWorkout, exercises, workoutID]);

    const handleCommentButton = () => {
        if (newComment.trim() === "") return;
        setComments([...comments, { user: userName, text: newComment }]);
        setNewComment("");
      };

    useEffect(() => {
      setInterval(() => {
        const randomChance = Math.floor(Math.random() * 100);
        
        if (randomChance < 33) {
          setUsers((prevUsers) => {
            const newUsers = new Set(prevUsers);
            const user = `User-${Math.floor(Math.random() * 100)}`;
            newUsers.add(user);
            return newUsers;
          })
            
            setComments((prevComments) => [
              ...prevComments,
              { user: `User-${Math.floor(Math.random() * 100)}`, text: "Beast mode!" }
            ])
        }
      }, 1000);
  
      setInterval(() => {
        const randomChance = Math.floor(Math.random() * 100);
        if (randomChance < 33) {
          setNumLikes((prevLikes) => prevLikes + 1);
        }
      }, 1000);
    }, []);





    return (
    <>
    <div className="workout">
      <div id="workout-title">
        <img src="/dumbbell.png" width="50"/>
        <h3> Workout <span id="workout-date"><span id="hyphen">-</span> {workoutDate}</span></h3>
      </div>
      {exercises.length > 0 ? (
                exercises.map((exercise, index) => (
                    <Exercise key={index} title={exercise.name} data={exercise.sets} />
                ))
            ) : (
                <p>No exercises recorded for this workout.</p>
      )}
        <div className="social">
          <div className="like">
            <button
            onClick={() => {
              setNumLikes((prevLikes) => (likedWorkout ? prevLikes - 1 : prevLikes + 1));
                            setLikedWorkout((prevLiked) => !prevLiked);
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
              <button type="button" id='comment-button'
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