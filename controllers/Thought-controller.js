const { Thought } = require('../models');

const ThoughtController = {
    // get all Thoughts
    getAllThought(req, res) {
      Thought.find({})
        
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }, 
  
    // get one Thought by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .then(dbThoughtData => {
          // If no Thought is found, send 404
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    // createThought
    createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.status(400).json(err));
  },
  // update Thought by id
updateThought({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No Thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},
// delete Thought
deleteThought({ params }, res) {
  Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No Thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
},

createReaction({ params, body }, res) {
  //find thought and update reaction
  Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
  ).then(dbThoughtData => {
      if (!dbThoughtData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
      }
      res.json(dbThoughtData);
  })
      .catch(err => res.status(400).json(err));
},
// remove reaction
deleteReaction({ params }, res) {
  Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
  )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
}

  }
  

module.exports = ThoughtController;