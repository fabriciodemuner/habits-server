import React, { useEffect, useState } from "react";
import AddHabit from "./AddHabit";
import "./App.css";
import HabitsGrid from "./HabitsGrid";
import Header from "./Header";
import Axios from "axios";
import { API_HOST } from "./constants";

const get = Axios.get;
function App() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState(null);

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

  return (
    <div>
      <Header />
      {loading ? <p>Loading...</p> : <HabitsGrid rows={rows} onChange={getHabits} />}
      <AddHabit onChange={getHabits} />
    </div>
  );
}

export default App;
