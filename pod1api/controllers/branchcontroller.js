const { validationResult } = require("express-validator");
const config = require('config');
const Branch = require('../models/branch'); // Assuming the model file is named 'branch'

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
