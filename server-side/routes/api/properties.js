const express = require('express');
const router = express.Router();

// Load model
const Property = require('../../models/Property');

// @route GET api/properties/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('property route testing!'));

// @route GET api/properties
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Property.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(404).json({ norecordfound: 'No Record Found' }));
});

// @route GET api/properties/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  Property.findById(req.params.id)
    .then(property => res.json(property))
    .catch(err => res.status(404).json({ Error: 'No Record Found' }));
});

// @route GET api/properties
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  Property.create(req.body)
    .then(property => res.json({ msg: 'Property added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this property' }));
});

// @route GET api/properties/:id
// @description Update properties
// @access Public
router.put('/:id', (req, res) => {
  Property.findByIdAndUpdate(req.params.id, req.body)
    .then(property => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/properties/:id
// @description Delete properties by id
// @access Public
router.delete('/:id', (req, res) => {
  Property.findByIdAndRemove(req.params.id, req.body)
    .then(property => res.json({ mgs: 'Property deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a listing' }));
});

// Find listing by title

router.get('/property/:property_type', (req, res) => {
  Property.find({ property_type: req.params.property_type })
    .then(property => {
      if (!property) {
        return res.status(404).json({ propertyNotFound: 'No Property Found with this Query' });
      }
      res.json(property);
    })
    .catch(err => res.status(400).json({ error: err }));
});
module.exports = router;