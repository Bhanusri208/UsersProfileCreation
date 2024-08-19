const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController'); 

// Route to create a user profile
router.post('/userProfile', userProfileController.createUserProfile);

// Route to get all user profiles
router.get('/users', userProfileController.getAllUserProfiles);

// Route to update a user profile by ID
router.put('/updateUser/:id', userProfileController.updateUserProfile);

// Route to delete a user profile by ID
router.delete('/deleteUser/:id', userProfileController.deleteUserProfile);


// Route to get single all user profiles
router.get('/allUsers/:id', userProfileController.getUserProfileById);

// Route to get distinct locations
router.get('/locations', userProfileController.getDistinctLocations);

// Route to get all user profiles with pagination
router.get('/usersPagination', userProfileController.getAllUserProfilesWithPagination);


module.exports = router;
