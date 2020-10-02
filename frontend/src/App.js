import React, { useState } from 'react';
import AddHabit from './AddHabit';
import './App.css';
import HabitsGrid from './HabitsGrid';
import Header from './Header';

function App() {
  const [rows, setRows] = useState([
    {id: 1, name: 'First Habit', streak: 5, check: true},
    {id: 2, name: 'Second Habit', streak: 5, check: true}
  ]);

  return (
    <div>
      <Header />
      <HabitsGrid rows={rows} setRows={setRows} />
      <AddHabit rows={rows} setRows={setRows}/>
    </div>
  );
}

export default App;
