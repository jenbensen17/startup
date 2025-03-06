import React from "react";
import './search.css'

export function SearchExercises(props) {
    const [exercises, setExercises] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const fetchExercises = async (term) => {
            setLoading(true);
            const response = await fetch(`https://wger.de/api/v2/exercise/search/?language=2&term=${term}`);
            const data = await response.json();

            setExercises(data.suggestions)
            setLoading(false);
    }

    React.useEffect(() => {
        if(search.trim()) {
            fetchExercises(search);
        } else {
            setExercises([]);
        }
    }, [search])

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
                {loading ? (
                    <p>Loading...</p> // Show loading text while fetching
                ): (
                        exercises
                            ?.filter((exercise) =>
                                exercise.data.name.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((exercise, index) => (
                                <li key={index} className="modal-item" onClick={() => props.onSelect(exercise.data.name)}>
                                    {exercise.data.name}
                                </li>
                            ))
                            
                    )}
                </ul>
            <button className="modal-close" onClick={props.onClose}>Close</button>
            </div>
        </div>
    )

}