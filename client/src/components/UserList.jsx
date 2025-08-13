import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError('No authentication token available');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Add this to handle cookies
        });
        
        setUsers(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} ({user.username})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;