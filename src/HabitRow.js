import React from 'react'

export default function HabitRow(props) {
    const {
        id,
        name,
        streak,
        check,
        rows,
        setRows
    } = props;

    function handleCheck() {
        const index = rows.findIndex(row => row.id === id)
        rows[index] = {id, name, streak, check: !check}
        setRows([...rows])
    }

    // function handleCheck() {
    //     const modifiedRow = {id, name, streak, check: !check}
    //     const index = rows.findIndex(row => row.id === id)
    //     rows.splice(index, 1, modifiedRow)
    //     setRows([...rows])
    // }

    // function handleCheck() {
    //     const modifiedRow = {id, name, streak, check: !check}
    //     const index = rows.findIndex(row => row.id === id)
    //     const rest = rows.slice(index+1)
    //     setRows(rows.slice(0, index).concat(modifiedRow).concat(rest))
    // }

    return (
        <div>
            <p>Name: {name}. Streak: {streak}. Today: {check ? 'Done!' : 'Do it!'}</p>
            <button onClick={handleCheck}>Toggle Habit</button>
        </div>
    )
}
