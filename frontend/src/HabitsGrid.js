import React from "react";
import HabitRow from "./HabitRow";

export default function HabitsGrid(props) {
  const { rows, setRows } = props;

  return (
    <div>
      {rows.map((row, i) => (
        <HabitRow
          key={row.id}
          id={row.id}
          name={row.name}
          streak={row.streak}
          check={row.check}
          rows={rows}
          setRows={setRows}
        />
      ))}
    </div>
  );
}
