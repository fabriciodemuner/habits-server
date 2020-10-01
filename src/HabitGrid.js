import React from 'react'
import HabitRow from './HabitRow'

export default function HabitGrid(props) {
    const { rows } = props

    return (
        <div>
            {rows.map((row, i) => <HabitRow key={i} num={row.num} name={row.name} />)}
        </div>
    )
}
