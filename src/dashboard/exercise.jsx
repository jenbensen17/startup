import React from "react";

export function Exercise(props) {
    const title = props.title;
    const data = props.data;
    return (
        <>
        <table>
            <caption>{title}</caption>
            <thead>
            <tr>
            <th>Set</th>
            <th>Weight</th>
            <th>Reps</th>
            </tr>
        </thead>
        <tbody>
            {data.map((row, index) => (
            row.weight != '' && row.reps !='' ? (
            <tr key={index}>
                <td>{index+1}</td>
                <td>{row.weight}</td>
                <td>{row.reps}</td>
            </tr>) : null
            ))}
      </tbody>
        </table>
        </>
    )
}