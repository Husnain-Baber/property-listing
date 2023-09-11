require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../../models/User');


const { SECRET = "secret" } = process.env;

router.get('/test', (req, res) => res.send('user route testing!'));

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ norecordfound: 'No Record Found' }));
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ Error: 'No Record Found by this id' }));
});

router.post('/', async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
    User.create(req.body)
    .then(users => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));

});

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(users => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then(users => res.json({ mgs: 'User deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a listing' }));
});

router.get('/email/:email', (req, res) => {
  User.findOne({ email: req.params.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ NotFound: 'No User Found with this Email' });
      }
      res.json(user);
    })
    .catch(err => res.status(400).json({ error: err }));
});

// router.post('/login', async (req, res) => {
//   User.findOne({ email: req.body.email })
//     .then(user => {
//       if(user) {
//         const result = bcrypt.compare(req.body.password, user.password);
//         if (result) {
//           const token = jwt.sign({email: user.email}, SECRET);
//           res.json({ token })
//         } else {
//           res.status(400).json({ error: "password not match"});
//         }
//       } else {
//         res.status(400).json({ error: "User not exist"});
//       }
//       if (!user) {
//         return res.status(404).json({ NotFound: 'No User Found with this Email' });
//       }
//       res.json(user);
//     })
//     .catch(err => res.status(400).json({ error: err }));
// });

// Login route to verify a user and get a token
router.post("/login", async (req, res) => {
  try {
    
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = jwt.sign({ email: user.email }, SECRET);
        res.json({ token , status: user.status });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;