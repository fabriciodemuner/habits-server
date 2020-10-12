import React from "react";
import Axios from "axios";
import { API_HOST } from "./constants";

const del = Axios.delete;
export default function HabitRow(props) {
  const { row, onChange } = props;

  async function handleDelete() {
    try {
      await del(`${API_HOST}/habit/${row.id}`);
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
    </div>
  );
}
