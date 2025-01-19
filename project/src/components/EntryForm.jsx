import React, { useState } from 'react';

export default function EntryForm({ onAddEntry, message }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onAddEntry({ amount: Number(amount), description });
    if (success) {
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

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}