const express = require('express');
const router = express.Router();

// Load model
const User = require('../../models/User');

// @route GET api/properties/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('user route testing!'));

// @route GET api/properties
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ norecordfound: 'No Record Found' }));
});

// @route GET api/properties/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ Error: 'No Record Found by this id' }));
});

// @route GET api/properties
// @description add/save book
// @access Public
router.post('/', (req, res) => {
//   let newUser = new User({
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     password: req.body.password
// });
// console.log(newUser);
User.create(req.body)
    .then(users => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user' }));
});

// @route GET api/properties/:id
// @description Update properties
// @access Public
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(users => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/properties/:id
// @description Delete properties by id
// @access Public
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, req.body)
    .then(users => res.json({ mgs: 'User deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a listing' }));
});

// Find listing by title

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
module.exports = router;