import React, { useState, useEffect } from "react";
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';

const API_URL = 'http://backend:8080/api/entries';

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const addEntry = async (amount, description) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, description }),
      });
      if (response.ok) {
        fetchEntries(); // Refresh the list after adding a new entry
      }
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchEntries(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <EntryForm addEntry={addEntry} />
        <EntryList entries={entries} deleteEntry={deleteEntry} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
