import React, { useState, useEffect } from 'react';
import './NormalTable2.css';

const NormalTable2 = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setShowModal(true); // Show the modal on row click
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setSelectedUser(null); // Clear the selected user
  };

  if (loading) return <p className="loading-text">Loading Data....</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Username</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} onClick={() => handleRowClick(user)}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.username}</td>
              <td>{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>User Details</h2>
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Username:</strong> {selectedUser.username}</p>
            <p><strong>Website:</strong> {selectedUser.website}</p>
            <button className="close-modal" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NormalTable2;
