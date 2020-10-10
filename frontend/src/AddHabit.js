import React, { useState } from "react";
import Axios from "axios";
import { API_HOST } from "./constants";

const post = Axios.post;
export default function AddHabit(props) {
  const { onChange } = props;

  async function addHabit() {
    try {
      await post(`${API_HOST}/habit`, {
        name: nameValue,
        description: descriptionValue,
      });
      onChange();
    } catch (err) {
      console.log(err);
    }
  }

  const [nameValue, setName] = useState("");
  const [descriptionValue, setDesc] = useState("");

  function handleNewHabit() {
    if (nameValue && descriptionValue) {
      addHabit();
      setName("");
      setDesc("");
    }
  }

  return (
    <div>
      <input type="text" value={nameValue} onChange={(e) => setName(e.target.value)}></input>
      <input type="text" value={descriptionValue} onChange={(e) => setDesc(e.target.value)}></input>
      <button onClick={handleNewHabit}>Add Habit</button>
    </div>
  );
}
