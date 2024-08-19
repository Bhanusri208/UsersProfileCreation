import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import EditUser from './components/EditUser/EditUser';
import AddUser from './components/AddUser/AddUser';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [users, setUsers] = useState([]); 

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);  
  };

  return (
    <div className="App">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange}
        onLocationChange={handleLocationChange}
      />
      <Routes>
        <Route 
          path="/" 
          element={<Dashboard searchQuery={searchQuery} location={selectedLocation} />} 
        />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/add" element={<AddUser onAddUser={handleAddUser} />} /> 
      </Routes>
    </div>
  );
}

export default App;





