import React from 'react';

export default function EntriesTable({ entries, onDeleteEntry, isLoading }) {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      onDeleteEntry(id);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="entries-container">
      <h2>Entries</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
        </table>
        <div className="table-body">
          <table>
            <tbody>
              {entries.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.amount}</td>
                  <td>{entry.description}</td>
                  <td>
                    <button onClick={() => handleDelete(entry.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}