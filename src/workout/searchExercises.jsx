import React from "react";

export function SearchExercises(props) {
    const exercises = ["Bench Press", "Squat", "Deadlift"];
    const [search, setSearch] = React.useState("");

    return (
        <div className="overlay">
            <div className="modal">
                <h3>Select an Exercise</h3>
                <input
                type="text"
                placeholder="Search for an exercise..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ></input>
             <ul className="modal-list">
                {exercises
                    .filter((ex) => ex.toLowerCase().includes(search.toLowerCase()))
                    .map((exercise, index) => (
                    <li key={index} className="modal-item" onClick={() => props.onSelect(exercise)}>
                        {exercise}
                    </li>
                    ))}
                </ul>
            <button className="modal-close" onClick={props.onClose}>Close</button>
            </div>
        </div>
    )

}