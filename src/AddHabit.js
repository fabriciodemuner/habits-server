import React, { useState } from 'react'

export default function AddHabit(props) {
    const {
        rows,
        setRows
    } = props;

    const [value, setValue] = useState('')

    function handleNewHabit() {
        if (value) {
            setRows(rows.concat({num: Math.floor(10*Math.random()), name: value}));
            setValue('');
        }
    }

    return (
        <div>
            <input type='text' value={value} onChange={e => setValue(e.target.value)}></input>
            <button onClick={handleNewHabit}>New Habit</button>
        </div>
    )
}
