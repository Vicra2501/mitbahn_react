const Group = require("../models/Group");
//const Project = require("../models/Project");

const router = require("express").Router();

// get all the groups
router.get('/', (req, res, next) => {
  Group.find()
    .then(groups => {
      res.status(200).json(groups)
    })
});

// create a group
router.post('/', (req, res, next) => {
  const { title, startStation, endStation, date } = req.body
  Group.create({ title, startStation, endStation, date })
    .then(group => {
      res.status(201).json(group)
    })
    .catch(err => next(err))
})

// get a specific group
router.get('/:id', (req, res, next) => {
  Group.findById(req.params.id)
    .then(group => {
      // check for a valid mongoobject id
      // mongoose.Types.ObjectId.isValid(<id>) 
      if (!group) {
        res.status(404).json(group)
      } else {
        res.status(200).json(group)
      }
    })
});

// update a group
router.put('/:id', (req, res, next) => {
  const { title, startStation, endStation, date } = req.body
  Group.findByIdAndUpdate(req.params.id, {
    title,
    startStation,
    endStation,
    date
  }, { new: true })
    .then(updatedGroup => {
      res.status(200).json(updatedGroup)
    })
    .catch(err => next(err))
});

// delete a group
router.delete('/:id', (req, res, next) => {
  Group.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'project deleted' })
    })
    .catch(err => next(err))
});

//search for a ride
router.get('/', (req, res, next) => {
  console.log("search for a ride route")
    })

// display user details
router.get('/user/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      // check for a valid mongoobject id
      // mongoose.Types.ObjectId.isValid(<id>) 
      if (!user) {
        res.status(404).json(user)
      } else {
        res.status(200).json(user)
      }
    })
});




module.exports = router;