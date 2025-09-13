import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check backend health
        const healthResponse = await axios.get('/api/health');
        setHealth(healthResponse.data);

        // Fetch users
        const usersResponse = await axios.get('/api/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setHealth({ status: 'ERROR', message: 'Backend not reachable' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Knovator DevOps Task</h1>
        
        <div className="status">
          <h2>Backend Status</h2>
          {loading ? (
            <p>Loading...</p>
          ) : health ? (
            <div>
              <p><strong>Status:</strong> {health.status}</p>
              <p><strong>Message:</strong> {health.message}</p>
              <p><strong>Time:</strong> {health.timestamp}</p>
            </div>
          ) : (
            <p>Failed to connect</p>
          )}
        </div>

        <div className="users">
          <h2>Users</h2>
          {loading ? (
            <p>Loading...</p>
          ) : users.length > 0 ? (
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
