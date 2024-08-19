const UserProfile = require('../models/UserProfile'); 

// Create a new user profile
exports.createUserProfile = async (req, res) => {
    try {
        const userProfile = new UserProfile(req.body);
        await userProfile.save();
        res.status(201).json(userProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single user profile by ID
exports.getUserProfileById = async (req, res) => {
    try {
        const userProfile = await UserProfile.findById(req.params.id);
        if (!userProfile) {
            return res.status(404).json({ message: 'UserProfile not found' });
        }
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all user profiles
exports.getAllUserProfiles = async (req, res) => {
    try {
        const userProfiles = await UserProfile.find();
        res.status(200).json(userProfiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Get a single user profile by ID
// exports.getUserProfileById = async (req, res) => {
//     try {
//         const userProfile = await UserProfile.findById(req.params.id);
//         if (!userProfile) {
//             return res.status(404).json({ message: 'UserProfile not found' });
//         }
//         res.status(200).json(userProfile);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// Update a user profile by ID
exports.updateUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!userProfile) {
            return res.status(404).json({ message: 'UserProfile not found' });
        }
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user profile by ID
exports.deleteUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findByIdAndDelete(req.params.id);
        if (!userProfile) {
            return res.status(404).json({ message: 'UserProfile not found' });
        }
        res.status(204).json(); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//  distinct locations
exports.getDistinctLocations = async (req, res) => {
    try {
        const locations = await UserProfile.distinct('location');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//  all user profiles with pagination
exports.getAllUserProfilesWithPagination = async (req, res) => {
    try {
        const { page = 1, limit = 10, location, search } = req.query;
        const skip = (page - 1) * limit;
        const query = {};

        if (location) {
            query.location = location;
        }

        if (search) {
            query.name = new RegExp(search, 'i');
        }

        const totalProfiles = await UserProfile.countDocuments(query);
        const profiles = await UserProfile.find(query)
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .sort({ location: 1 });

        const totalPages = Math.ceil(totalProfiles / limit);

        res.status(200).json({
            userProfiles: profiles,
            totalPages,
            currentPage: parseInt(page),
            totalProfiles,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};