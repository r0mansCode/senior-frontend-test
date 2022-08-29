import React from "react";
import "./table.css";
import { FaTimes } from "react-icons/fa";

export const Table = ({ data }) => {
  return (
    <div className="tableContainer">
      <div className="tableToolbar">
        <div className="copyButton">Copy Table</div>
        <FaTimes className="deleteIcon" />
      </div>
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
    </div>
  );
};
