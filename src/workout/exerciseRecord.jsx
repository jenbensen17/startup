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

    const updateSet = (index, category, value) => {
      if(!isNaN(value) || value === '') {
        const newSets = [...sets];
        if(category === 'weight') {
          newSets[index].weight = value;
        } else if(category === 'reps') {
          newSets[index].reps = value;
        }
        setSets(newSets);
      }
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
                  onChange={(e) => updateSet(index, 'weight', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="--"
                  value={set.reps}
                  onChange={(e) => updateSet(index, 'reps',  e.target.value)}
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