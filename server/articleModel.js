const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    value: String,
    id: Number
});

const alineaSchema = new mongoose.Schema({
    content: [contentSchema]
}, { _id: false });

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    subcomments: [this] // Recursive reference to allow comments on comments
}, { timestamps: true });


const articleSchema = new mongoose.Schema({
    urlId: {
        type: String,
        required: true,
        unique: true
    }, title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    canPublish: {
        type: Boolean,
        default: false
    },
    pretext: String,
    teaser: String,
    coverPhoto: String,
    themes: [String],
    alineas: [alineaSchema],
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updated_at: Date
});

// Middleware to handle the updated_at field
articleSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
