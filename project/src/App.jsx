import React, { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntriesTable from './components/EntriesTable';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
      showMessage('Failed to fetch entries. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEntry = async (entry) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchEntries();
      showMessage('Record added successfully!');
      return true;
    } catch (error) {
      console.error('Error adding entry:', error);
      showMessage('Failed to add record. Please try again.', 'error');
      return false;
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchEntries();
      showMessage('Record deleted successfully!');
    } catch (error) {
      console.error('Error deleting entry:', error);
      showMessage('Failed to delete record. Please try again.', 'error');
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="app">
      <header>CRUD Application</header>

      <div className="container">
        <EntryForm 
          onAddEntry={handleAddEntry}
          message={message}
        />
        <EntriesTable 
          entries={entries}
          onDeleteEntry={handleDeleteEntry}
          isLoading={isLoading}
        />
      </div>

      <footer>&copy; 2024 CRUD App. All rights reserved.</footer>
    </div>
  );
}

export default App;