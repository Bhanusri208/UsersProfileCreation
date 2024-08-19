import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiUrl } from '../ApiUrl/ApiUrl'; 
import './AddUser.css'; 

const AddUser = ({ onAddUser }) => {
    const [user, setUser] = useState({ name: '', age: '', location: '', profession: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!/^[a-zA-Z\s]+$/.test(user.name)) {
            setError('Name should only contain letters and spaces.');
            return;
        }
        if (!/^\d+$/.test(user.age)) {
            setError('Age should be a valid number.');
            return;
        }
        try {
            const response = await fetch(`${ApiUrl}/userProfile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newUser = await response.json();
            onAddUser(newUser); 
            navigate('/'); 
        } catch (err) {
            console.error('Add error:', err);
            setError('Failed to add user');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add User</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={user.age}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={user.location}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Profession:</label>
                    <input
                        type="text"
                        name="profession"
                        value={user.profession}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;



