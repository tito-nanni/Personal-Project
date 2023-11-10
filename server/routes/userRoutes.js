import express from 'express';
import * as userController from '../controllers/userController.js';
import bcrypt from 'bcrypt';
import { User } from '../model.js'

const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:userId', userController.updateUser);
router.delete('/users/:userId', userController.deleteUser);

//login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (user && user.password === password) {
      req.session.userId = user.user_id;  // Store user id in session
      res.json({ message: 'Logged in successfully' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  //logout route
  router.post('/logout', (req, res) => {
    req.session.destroy(() => {
      res.json({ message: 'Logged out successfully' });
    });
  });


  
  export default router;