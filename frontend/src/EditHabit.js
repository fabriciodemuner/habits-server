import React, { useState } from "react";
import Axios from "axios";
import { API_HOST } from "./constants";

const put = Axios.put;
const del = Axios.delete;
export default function EditHabit(props) {
  const { row, onChange, setEdit } = props;
  const [nameValue, setName] = useState(row.name);
  const [descriptionValue, setDesc] = useState(row.description);
  const [validInputs, setValidInputs] = useState(true);

  async function handleDelete() {
    try {
      await del(`${API_HOST}/habit/${row.id}`);
      setEdit(false);
      onChange();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdate(option) {
    if (option === "cancel" || (nameValue === row.name && descriptionValue === row.description)) {
      setEdit(false);
      return;
    }
    if (!nameValue || !descriptionValue) {
      setValidInputs(false);
      return;
    }
    try {
      await put(`${API_HOST}/habit/${row.id}`, {
        name: nameValue,
        description: descriptionValue,
      });
      setEdit(false);
      onChange();
    } catch (err) {
      console.log(err);
    }
  }

  const invalidInputMessage = validInputs ? (
    <br />
  ) : (
    <p>
      Please fill both <i>name</i> and <i>description</i> fields.
    </p>
  );
  return (
    <div>
      <p>Edit Habit: {row.name}</p>
      <input type="text" value={nameValue} onChange={(e) => setName(e.target.value)}></input>
      <input type="text" value={descriptionValue} onChange={(e) => setDesc(e.target.value)}></input>
      <button onClick={handleUpdate}>Save changes</button>
      <button onClick={() => handleUpdate("cancel")}>Cancel</button>
      <button onClick={handleDelete}>Delete Habit</button>
      {invalidInputMessage}
    </div>
  );
}
