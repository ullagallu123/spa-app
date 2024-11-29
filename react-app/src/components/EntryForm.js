import React, { useState } from 'react';

function EntryForm({ addEntry }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && description) {
      addEntry(amount, description);
      setAmount('');
      setDescription('');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          id="desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
}

export default EntryForm;
