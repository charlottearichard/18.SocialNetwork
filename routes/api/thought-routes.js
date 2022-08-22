const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/Thought-controller');

router.route('/')
    .get(getAllThought);
    

router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)
    .post(createThought);

router.route('/:thoughtId/reactions')
    .post(createReaction)

 router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router;