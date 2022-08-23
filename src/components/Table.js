import React from "react";
import "./table.css";

export const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Age</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, ind) => (
          <tr key={ind}>
            <td>{row.name}</td>
            <td>{row.surname}</td>
            <td>{row.age}</td>
            <td>{row.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
