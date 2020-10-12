import React, { useState } from "react";
import Axios from "axios";
import { API_HOST } from "./constants";

const del = Axios.delete;
const put = Axios.put;
export default function HabitRow(props) {
  const { row, onChange } = props;
  const today = JSON.stringify(new Date()).slice(1, 11);
  const [date, setDate] = useState(today);

  async function handleDelete() {
    try {
      await del(`${API_HOST}/habit/${row.id}`);
      onChange();
    } catch (err) {
      console.log(err);
    }
  }

  async function toggleDate() {
    try {
      await put(`${API_HOST}/habit/${row.id}/days`, { date });
      setDate(today);
      onChange();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <p>
        Name: {row.name}. Streak: {row.streak}.
      </p>
      <button onClick={handleDelete}>Delete Habit</button>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)}></input>
      <button onClick={toggleDate}>Toggle Date</button>
    </div>
  );
}
