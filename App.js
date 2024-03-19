import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'; // Correctly import useState
import axios from 'axios'; // Ensure axios is imported


function App() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepos(response.data);
    } catch (error) {
      console.error('Error fetching repos:', error);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="search-button" onClick={fetchRepos}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      <main>
        <ul className="repo-list">
          {repos.map((repo) => (
            <li key={repo.id} className="repo-item">{repo.name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
