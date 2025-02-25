import React from "react";

export function ExerciseRecord(props) {
    const exerciseName = props.exerciseName;

    const [sets, setSets] = React.useState([{weight: '', reps: ''}]);
    const addSet = () => {
        setSets([...sets, { weight: '', reps: '' }]);
      };
    const removeSet = () => {
        setSets((prevSets) => {
            if(prevSets.length>1) {
                const newSets = [...prevSets];
                newSets.pop();
                return newSets;
            } else {
                return prevSets;
            }
        })
    }

    React.useEffect(() => {
        props.onSetChange(sets);
    }, [sets]);

    return (
        <>
        <div className="record">
        <div className="exercise">
                <img src="/dumbbell.png" width="25"/>
                <h3> 
                    {exerciseName}
                </h3>
            </div>
        <table>

            <thead>
            <tr>
                <th>Set</th>
                <th>Weight</th>
                <th>Reps</th>
            </tr>
            </thead>
            <tbody>
          {sets.map((set, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  placeholder="--"
                  value={set.weight}
                  onChange={(e) => {
                    const newSets = [...sets];
                    newSets[index].weight = e.target.value;
                    setSets(newSets);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="--"
                  value={set.reps}
                  onChange={(e) => {
                    const newSets = [...sets];
                    newSets[index].reps = e.target.value;
                    setSets(newSets);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        <button className="set-btn" type="button" onClick={addSet}>+ Add Set</button>
        {sets.length > 1 && <button className="set-btn" type="button" onClick={removeSet}>- Remove Set</button>}
        </div>
        </>
    )
}