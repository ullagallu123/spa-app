#!/bin/bash

# Set the project name
PROJECT_NAME="my-react-crud-app"

# Create the project folder structure
echo "Creating folder structure..."
mkdir -p $PROJECT_NAME/{public,src/components}
cd $PROJECT_NAME

# Create the public folder files
echo "Creating public files..."
cat > public/index.html <<EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React CRUD App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
EOL

echo "Creating src files..."
# Create App.js
cat > src/App.js <<EOL
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
      const response = await fetch(\`\${API_URL}/\${id}\`, { method: "DELETE" });
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
EOL

# Create Header.js
cat > src/components/Header.js <<EOL
import React from "react";

const Header = () => {
  return <header><h1>CRUD Application</h1></header>;
};

export default Header;
EOL

# Create Footer.js
cat > src/components/Footer.js <<EOL
import React from "react";

const Footer = () => {
  return <footer>© 2024 CRUD App</footer>;
};

export default Footer;
EOL

# Create EntryForm.js
cat > src/components/EntryForm.js <<EOL
import React, { useState } from "react";

const EntryForm = ({ addEntry }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && description) {
      addEntry({ amount, description });
      setAmount("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default EntryForm;
EOL

# Create EntryList.js
cat > src/components/EntryList.js <<EOL
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
EOL

# Create App.css
cat > src/App.css <<EOL
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.container {
  max-width: 600px;
  margin: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 10px 15px;
  cursor: pointer;
}
EOL

# Create index.js
cat > src/index.js <<EOL
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
EOL

# Create Dockerfile
cat > Dockerfile <<EOL
FROM node:16 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOL

# Create package.json
echo "Creating package.json..."
cat > package.json <<EOL
{
  "name": "my-react-crud-app",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-scripts": "5.0.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
EOL

echo "React CRUD App setup complete!"

