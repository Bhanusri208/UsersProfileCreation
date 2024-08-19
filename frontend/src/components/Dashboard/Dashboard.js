import React, { useState, useEffect } from 'react';
import { ApiUrl } from '../ApiUrl/ApiUrl';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';

const Dashboard = ({ searchQuery, location }) => {
  const [users, setUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const usersPerPage = 10; 

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${ApiUrl}/users`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const usersData = await response.json();
        setUsers(usersData);
        filterAndSortUsers(usersData);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [location, sortOrder, searchQuery]);

  const filterAndSortUsers = (usersData) => {
    let filteredUsers = usersData;

    if (location) {
      filteredUsers = filteredUsers.filter(user => user.location === location);
    }

    if (searchQuery) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sorted = [...filteredUsers].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.location.localeCompare(b.location);
      } else {
        return b.location.localeCompare(a.location);
      }
    });

    setSortedUsers(sorted);
    setTotalPages(Math.ceil(sorted.length / usersPerPage));
  };

  const handleSortOrderChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleEdit = (userId) => {
    navigate(`/edit/${userId}`);
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`${ApiUrl}/deleteUser/${userId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setUsers(users.filter(user => user._id !== userId));
        filterAndSortUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        console.error('Delete error:', err);
        setError('Failed to delete user');
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2>User Profiles</h2>
      <button onClick={handleSortOrderChange} className="btn btn-primary mb-3">
        Sort by Location ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>
      <div className="grid-container">
        {currentUsers.length > 0 ? (
          currentUsers.map(user => (
            <div key={user._id} className="grid-item">
              <h5>{user.name}</h5>
              <p className="age">Age: {user.age}</p>
              <p className="location">Location: {user.location}</p>
              <p className="profession">Profession: {user.profession}</p>
              <div className="icon-container">
                <FaEdit
                  className="icon edit-icon"
                  onClick={() => handleEdit(user._id)}
                  title="Edit"
                />
                <FaTrash
                  className="icon delete-icon"
                  onClick={() => handleDelete(user._id)}
                  title="Delete"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="grid-item">No users found</div>
        )}
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default Dashboard;

