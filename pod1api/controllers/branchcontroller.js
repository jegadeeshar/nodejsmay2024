const { validationResult } = require("express-validator");
const config = require('config');
const Branch = require('../models/branch'); // Assuming the model file is named 'branch'
const branch = require("../models/branch");

// Save the branch
exports.saveBranch = async (req, res) => {
    // Validating JSON data
    const errors = validationResult(req);
    
    // In case of errors, return bad request
    if (!errors.isEmpty()) {
        return res.status(config.get('statusCode.badRequest')).json({
            errors: errors.array()
        });
    }

    // Create a new branch instance
    const branchInstance = new Branch({
        branchCode: req.body.branchCode,
        branchName: req.body.branchName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        phoneNumber: req.body.phoneNumber
    });

    // Save the branch instance in MongoDB
    try {
        await branchInstance.save();
        return res.status(config.get('statusCode.created')).json({
            message: "Branch successfully created"
        });
    } catch (err) {
        return res.status(config.get('statusCode.logicError')).json({
            error: `Branch could not be created ${err}`
        });
    }
}
// Fetch all branches from the database
exports.fetchAllbranches = (req, res) => {
    branch.find()
        .then(data => {
            // Convert data to JSON, handling BigInt conversion
            const branches = JSON.parse(JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v));

            res.status(config.get('statusCode.success')).send({
                message: 'Branch information ready to consume',
                branches: branches // Corrected key name from 'users' to 'branches'
            });
        })
        .catch(error => {
            res.status(config.get('statusCode.logicError')).send({
                message: 'Branch information not found',
                errorMessage: error.message
            });
        });
};

// Fetch branch by name
exports.fetchBranchByName = async (req, res) => {
    try {
        const result = await Branch.findOne({ branchName: req.params.branchname });
        console.log(req.params.branchname)
        if (result) {
            return res.status(config.get('statusCode.success')).send({
                message: `Branch found for the given branch name`,
                branch: JSON.parse(JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v))
            });
        } else {
            return res.status(config.get('statusCode.logicError')).send({
                message: `Branch could not be found for the given branch name '${req.params.branchname}'`
            });
        }
    } catch (error) {
        return res.status(config.get('statusCode.logicError')).send({
            message: `An error occurred while fetching branch by name`,
            errorMessage: error.message
        });
    }
};
