import React, { useState } from 'react';
import AddHabit from './AddHabit';
import './App.css';
import HabitGrid from './HabitGrid';
import Header from './Header';

function App() {
  const [rows, setRows] = useState([
    {num: Math.floor(10*Math.random())},
    {num: Math.floor(10*Math.random())}
  ]);

  return (
    <div>
      <Header />
      <HabitGrid rows={rows} />
      <AddHabit rows={rows} setRows={setRows}/>
    </div>
  );
}

export default App;
