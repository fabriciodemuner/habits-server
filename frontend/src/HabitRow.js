import React from "react";
import Axios from "axios";
import { API_HOST } from "./constants";

const del = Axios.delete;
export default function HabitRow(props) {
  const { id, name, streak, onChange } = props;

  async function handleDelete() {
    try {
      await del(`${API_HOST}/habit/${id}`);
      onChange();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <p>
        Name: {name}. Streak: {streak}.
      </p>
      <button onClick={handleDelete}>Delete Habit</button>
    </div>
  );
}
