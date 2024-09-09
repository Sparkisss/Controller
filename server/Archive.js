const mongoose = require('mongoose');

const ArchiveSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
});

module.exports = mongoose.model('ArchiveMessage', ArchiveSchema);
