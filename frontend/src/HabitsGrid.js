import React from "react";
import HabitRow from "./HabitRow";

export default function HabitsGrid(props) {
  const { rows, onChange } = props;

  return (
    <div>
      {rows.map((row) => (
        <HabitRow key={row.id} row={row} onChange={onChange} />
      ))}
    </div>
  );
}
