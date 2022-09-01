import React from "react";
import "./Table.css";
import { FaTimes } from "react-icons/fa";

export const Table = ({ data, handleDeleteRow, handleEditRow }) => {
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, ind) => (
            <tr key={ind}>
              <td>{row.name}</td>
              <td>{row.surname}</td>
              <td>{row.age}</td>
              <td>{row.city}</td>
              <td className="actionColumn">
                <div
                  className="editAction"
                  onClick={() => handleEditRow(row.id)}
                >
                  Edit
                </div>
                <div
                  className="deleteAction"
                  onClick={() => handleDeleteRow(row.id)}
                >
                  Delete
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
