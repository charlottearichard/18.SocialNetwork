const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
     // word count 1-280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
    username: {
      type: String,
      required: true,
      ref: 'User'
    }, 
    reactions: {
        type: String,
        ref: 'Reactions'
      }, 
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of reactions and replies on retrieval
reactionSchema.virtual('reactionCount').get(function() {
  return this.reactions.reduce(
    (total, reaction) => total + reaction.replies.length + 1,
    0
  );
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;