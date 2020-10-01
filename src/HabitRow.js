import React from 'react'

export default function HabitRow(props) {
    const { num, name } = props;

    return (
        <div>
            <p>Habit row {num}. Name: {name}</p>
        </div>
    )
}
