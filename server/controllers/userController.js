import { User } from '../model.js';
import bcrypt from 'bcrypt';

// Fetch all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a single user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (user) {
            res.json();
        } else {
            res.status(404).json({ error: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Create a new user
export const createdUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

// Update a user
export const updateUser = async (req, res) => {
    try {
        const updated = await User.update(req.body, {
            where: { user_id: req.params.userId },
        });
        if (updated) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { user_id: req.params.userId },
        });
        if (deleted) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// create a new user with hashed password
export async function createUser(req, res) {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salting
      const user = await User.create({
        email: email,
        password: hashedPassword,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }