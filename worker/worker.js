const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const csvParser = require('csv-parser');
const mongoose = require('mongoose');

// Import models
const Agent = require('../models/agent');
const User = require('../models/user');
const UserAccount = require('../models/userAccount');
const PolicyCategory = require('../models/policyCategory');
const PolicyCarrier = require('../models/policyCarrier');
const PolicyInfo = require('../models/policyInfo');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/worker_db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
    // Read CSV and insert data into MongoDB
    fs.createReadStream(workerData)
        .pipe(csvParser())
        .on('data', (row) => {
            // Process each row from CSV and insert into MongoDB collections
            // Example:
            const agent = new Agent({ agentName: row.agentName });
            agent.save(); // Save agent to MongoDB
            const user = new User({
                firstName: row.firstName,
                dob: parseDate(row.dob), // Assuming dob is in a valid date format in the CSV
                address: row.address,
                phoneNumber: row.phoneNumber,
                state: row.state,
                zipCode: row.zipCode,
                email: row.email,
                gender: row.gender,
                userType: row.userType
            });
            user.save(); // Save user to MongoDB
            const userAccount = new UserAccount({ accountName: row.accountName });
            userAccount.save(); // Save user account to MongoDB
            const policyCategory = new PolicyCategory({ categoryName: row.categoryName });
            policyCategory.save(); // Save policy category to MongoDB
            const policyCarrier = new PolicyCarrier({ companyName: row.companyName });
            policyCarrier.save(); // Save policy carrier to MongoDB
            const policyInfo = new PolicyInfo({
                policyNumber: row.policyNumber,
                policyStartDate: parseDate(row.policyStartDate), // Assuming dates are in a valid format
                policyEndDate: parseDate(row.policyEndDate),
                policyCategory: policyCategory._id, // Assuming policyCategory is already saved to MongoDB
                collectionId: policyCarrier._id, // Assuming collectionId is already saved to MongoDB
                companyCollectionId: userAccount._id, // Assuming companyCollectionId is already saved to MongoDB
                userId: user._id // Assuming userId is already saved to MongoDB
            });
            policyInfo.save(); // Save policy info to MongoDB
        })
        .on('end', () => {
            console.log('CSV processing completed');
            parentPort.postMessage('CSV processing completed');
        });
});

function parseDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // If parsing failed, return null or another default value
        return null;
    }
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    return `${year}-${month}-${day}`;
}