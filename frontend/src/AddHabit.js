import React, { useState } from "react";
import Axios from "axios";
import { API_HOST } from "./constants";

const post = Axios.post;
export default function AddHabit(props) {
  const { onChange, setAdd } = props;
  const [nameValue, setName] = useState("");
  const [descriptionValue, setDesc] = useState("");
  const [validInputs, setValidInputs] = useState(true);

  async function handleNewHabit() {
    if (nameValue && descriptionValue) {
      try {
        await post(`${API_HOST}/habit`, {
          name: nameValue,
          description: descriptionValue,
        });
        setName("");
        setDesc("");
        setAdd(false);
        onChange();
      } catch (err) {
        console.log(err);
      }
    } else {
      setValidInputs(false);
    }
  }

  const invalidInputMessage = validInputs ? (
    <br />
  ) : (
    <p>
      Please fill both <i>name</i> and <i>description</i> fields.{" "}
    </p>
  );

  return (
    <div>
      <input type="text" value={nameValue} onChange={(e) => setName(e.target.value)}></input>
      <input type="text" value={descriptionValue} onChange={(e) => setDesc(e.target.value)}></input>
      <button onClick={handleNewHabit}>Save Habit</button>
      {invalidInputMessage}
    </div>
  );
}
