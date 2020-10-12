import React, { useEffect, useState } from "react";
import "./App.css";
import AddHabit from "./AddHabit";
import HabitsGrid from "./HabitsGrid";
import Header from "./Header";
import Axios from "axios";
import { API_HOST } from "./constants";

const get = Axios.get;
function App() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState(null);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    getHabits();
  }, []);

  async function getHabits() {
    try {
      const res = await get(`${API_HOST}/habit`);
      setRows(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const gridDiv = loading ? <p>Loading...</p> : <HabitsGrid rows={rows} onChange={getHabits} />;
  const addDiv = add ? (
    <AddHabit onChange={getHabits} setAdd={setAdd} />
  ) : (
    <button onClick={() => setAdd(true)}>Add Habit</button>
  );

  return (
    <div>
      <Header />
      {gridDiv}
      {addDiv}
    </div>
  );
}

export default App;
