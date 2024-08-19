import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApiUrl } from '../ApiUrl/ApiUrl'; 
import './EditUser.css'; 

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', age: '', location: '', profession: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${ApiUrl}/allUsers/${id}`); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        console.log('Fetched user data:', userData); 
        setUser(userData); 
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch user');
      }
    };

    fetchUser();
  }, [id]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiUrl}/updateUser/${id}`, { 
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate('/'); 
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update user');
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Edit User</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name || ''} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={user.age || ''} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={user.location || ''} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Profession:</label>
            <input
              type="text"
              name="profession"
              value={user.profession || ''} 
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

