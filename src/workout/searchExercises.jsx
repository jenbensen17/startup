import React from "react";
import './search.css'

export function SearchExercises(props) {
    const [exercises, setExercises] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchExercises = async () => {
            const response = await fetch("https://wger.de/api/v2/exercise/?language=2");
            const data = await response.json();
            console.log(data)
            setExercises(data.results)
        }
        fetchExercises();
    }, [])

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
                {(
                        exercises
                            .filter((exercise) =>
                                exercise.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((exercise) => (
                                <li key={exercise.id} className="modal-item" onClick={() => props.onSelect(exercise.name)}>
                                    {exercise.name}
                                </li>
                            ))
                    )}
                </ul>
            <button className="modal-close" onClick={props.onClose}>Close</button>
            </div>
        </div>
    )

}