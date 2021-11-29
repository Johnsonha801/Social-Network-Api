const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

// Reaction Schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            validate: [({ length }) => length <= 280, 'The reaction body can only contain up to 280 characters.']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateValue => formatDate(dateValue)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// Thought Schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: [({ length }) => length >= 1 && length <= 280, 'Thought text must be between 1 and 280 characters.']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: dateValue => formatDate(dateValue)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Virtual - Reaction Count
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;