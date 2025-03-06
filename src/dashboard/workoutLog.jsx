import React from 'react';
import { Exercise } from './exercise';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export function WorkoutLog(props) {
    const userName = props.userName;
    const workoutDate = props.workoutDate;
    const workoutTimestamp = props.workoutTimestamp;
    const exercises = props.exercises;
    const workoutID = `${userName}-workout-${workoutTimestamp}`;
    const [numLikes, setNumLikes] = React.useState(props.numLikes);
    const [likedWorkout, setLikedWorkout] = React.useState(props.likedWorkout);
    const [comments, setComments] = React.useState(props.comments);
    const [newComment, setNewComment] = React.useState("");
    const [users, setUsers] = React.useState(new Set());
    


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

    const handleCommentButton = async () => {
        if (newComment.trim() === "") return;

        const response = await fetch(`/api/workouts/${userName}/${workoutTimestamp}/comment`,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ comment: newComment }),
      });
      if (response.ok) {
        const { comments } = await response.json();
        setComments(comments);
        setNewComment("");
      } 
      };

    const handleLikeButton = async () => {
      const response = await fetch(`/api/workouts/${userName}/${workoutTimestamp}/like`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const { numLikes, likedWorkout } = await response.json();
        setNumLikes(numLikes);
        setLikedWorkout(likedWorkout);
      }
    }

    // useEffect(() => {
    //   setInterval(() => {
    //     const randomChance = Math.floor(Math.random() * 100);
        
    //     if (randomChance < 33) {
    //       setUsers((prevUsers) => {
    //         const newUsers = new Set(prevUsers);
    //         const user = `User-${Math.floor(Math.random() * 100)}`;
    //         newUsers.add(user);
    //         return newUsers;
    //       })
            
    //         setComments((prevComments) => [
    //           ...prevComments,
    //           { user: `User-${Math.floor(Math.random() * 100)}`, text: "Beast mode!" }
    //         ])
    //     }
    //   }, 1000);
  
    //   setInterval(() => {
    //     const randomChance = Math.floor(Math.random() * 100);
    //     if (randomChance < 33) {
    //       setNumLikes((prevLikes) => prevLikes + 1);
    //     }
    //   }, 1000);
    // }, []);





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
            onClick={handleLikeButton}  >
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
            <NavLink
            to={`../dashboard/${comment.user}`}
            > 
                    {comment.user}
                    </NavLink>: <span>{comment.text}</span>
                </li>
            ))}
        </ul>
      </div>  
    </div>
    </>
    )
}