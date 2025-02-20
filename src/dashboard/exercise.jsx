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
            <tr key={index}>
                <td>{row.set}</td>
                <td>{row.weight}</td>
                <td>{row.reps}</td>
            </tr>
            ))}
      </tbody>
        </table>
        </>
    )
}