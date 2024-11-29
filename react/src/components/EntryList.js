import React from "react";

const EntryList = ({ entries, deleteEntry }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.id}</td>
            <td>{entry.amount}</td>
            <td>{entry.description}</td>
            <td>
              <button onClick={() => deleteEntry(entry.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntryList;
