const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: ['MALE', 'FEMALE', 'TRANSGENDER'],
            message: '{VALUE} is not supported'
        },
        required: true
    },
    mobileNo: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    },
    roles: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Role'
    }],
    branch: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'branch'
    }],
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: true, unique: true
    },
    customerId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;'<>,.?/\\|~`-]).{8,}$/.test(v);
            },
            message: props => `Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`
        }
    },
    which_is_your_born_city: {
        type: String,
        required: true
    },
    What_is_your_pet_name: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema);
