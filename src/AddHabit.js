import React, { useState } from 'react'

export default function AddHabit(props) {
    const {
        rows,
        setRows
    } = props;

    const [value, setValue] = useState('')

    function handleNewHabit() {
        if (value) {
            setRows(rows.concat({
                id: rows[rows.length-1].id + 1,
                streak: 0,
                name: value,
                check: false
            }));
            setValue('');
        }
    }

    return (
        <div>
            <input type='text' value={value} onChange={e => setValue(e.target.value)}></input>
            <button onClick={handleNewHabit}>Add Habit</button>
        </div>
    )
}
