import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import "./App.css";

const API_URL = "http://docker.ullagallubuffellomilk.store:8080/api/entries";

function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entry) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (response.ok) {
        fetchEntries();
      }
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        fetchEntries();
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="App">
      <Header />
      <EntryForm addEntry={addEntry} />
      {loading ? <p>Loading...</p> : <EntryList entries={entries} deleteEntry={deleteEntry} />}
      <Footer />
    </div>
  );
}

export default App;
