const mongoose = require('mongoose');

const policyInfoSchema = new mongoose.Schema({
    policyNumber: String,
    policyStartDate: Date,
    policyEndDate: Date,
    policyCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory' },
    collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier' },
    companyCollectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAccount' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const PolicyInfo = mongoose.model('PolicyInfo', policyInfoSchema);

module.exports = PolicyInfo;
