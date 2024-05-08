const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const roleController = require('../controllers/rolecontroller');
const branchController = require('../controllers/branchcontroller');

/**
 * @swagger
 * /api/users/v1.0/:
 *  post:
 *    summary: Add a user to the database
 *    description: Use this endpoint to add a new user to the database.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add user
 *        description: Add user in DB.
 *        schema:
 *          type: object
 *          required:
 *            - firstName
 *            - lastName
 *            - dob
 *            - gender
 *            - mobileNo
 *            - roles
 *            - email
 *            - customerId
 *            - which_is_your_born_city
 *            - What_is_your_pet_name
 *            - password
 *          properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            dob:
 *              type: string
 *              format: date
 *              example: "2000-01-01"
 *            gender:
 *              type: string
 *              enum: [MALE, FEMALE, TRANSGENDER]
 *              example: MALE
 *            mobileNo:
 *              type: string
 *              example: "9952032862"
 *            email:
 *              type: string
 *              format: email
 *              example: "user@example.com"
 *            roles:
 *              type: array
 *              items:
 *                type: string
 *              example: ["role1", "role2"]
 *            branch:
 *              type: array
 *              items:
 *                type: string
 *              example: ["branch1", "branch2"]
 *            customerId:
 *              type: string
 *              example: "1234567890"
 *            which_is_your_born_city:
 *              type: string
 *              example: "New York"
 *            What_is_your_pet_name:
 *              type: string
 *              example: "Fluffy"
 *            password:
 *              type: string
 *              description: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
 *    responses:
 *      '200':
 *        description: User added successfully.
 */

router.post('/users/v1.0/', userController.saveUser);

/**
 * @swagger
 * /api/roles/v1.0/:
 *  post:
 *    summary: Add a role to the database
 *    description: Use this endpoint to add a new role to the database.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add role
 *        description: Add role in DB.
 *        schema:
 *          type: object
 *          required:
 *            - roleId
 *            - roleName
 *          properties:
 *            roleId:
 *              type: integer
 *            roleName:
 *              type: string
 *
 *    responses:
 *      '200':
 *        description: Role added successfully.
 */
router.post('/roles/v1.0/', roleController.saveRole);

/**
 * @swagger
 * /api/branches/v1.0/:
 *  post:
 *    summary: Add a branch to the database
 *    description: Use this endpoint to add a new branch to the database.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add branch
 *        description: Add a branch to the database.
 *        schema:
 *          type: object
 *          required:
 *            - branchCode
 *            - branchName
 *            - address
 *            - city
 *            - state
 *            - country
 *            - phoneNumber
 *          properties:
 *            branchCode:
 *              type: number
 *              example: 12345
 *            branchName:
 *              type: string
 *            address:
 *              type: string
 *            city:
 *              type: string
 *            state:
 *              type: string
 *            country:
 *              type: string
 *            phoneNumber:
 *              type: integer
 *              example: 9952032862
 *
 *    responses:
 *      '200':
 *        description: Branch added successfully.
 */
router.post('/branches/v1.0/', branchController.saveBranch);

/**
 * @swagger
 * /api/fetchallbranches/v1.0/:
 *  get:
 *    summary: Get all branches from the database
 *    description: Use this endpoint to fetch all branches from the database.
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: Branches fetched successfully.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message indicating the success of the operation.
 *                branches:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Branch'
 */
router.get('/fetchallbranches/v1.0/', branchController.fetchAllbranches);

/**
 * @swagger
 * /api/branches/v1.0/{branchname}:
 *  get:
 *    summary: Find a branch by branch name
 *    description: Use this endpoint to find a branch by its name in the database.
 *    parameters:
 *      - in: path
 *        name: branchname
 *        description: The name of the branch to find.
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Branch found successfully.
 *      '404':
 *        description: Branch not found.
 */
router.get('/branches/v1.0/:branchname', branchController.fetchBranchByName);

/**
 * @swagger
 * /api/users/v1.0/:
 *  get:
 *    summary: Get all users from the database
 *    description: Use this endpoint to fetch all users from the database.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: pages
 *        type: integer
 *        required: false
 *        default: 0
 *        minimum: 0
 *        description: The number of items to skip before starting to collect the result set.
 *      - in: query
 *        name: limit
 *        type: integer
 *        required: false
 *        default: 20
 *        minimum: 1
 *        maximum: 100
 *        description: The numbers of items to return.
 *    responses:
 *      '200':
 *        description: Users fetched successfully.
 */
router.get('/users/v1.0/', userController.fetchAllUsers);

/**
 * @swagger
 * /api/users/v1.0/{mobileNo}:
 *  put:
 *    summary: Update user roles by mobile number
 *    description: Use this endpoint to update user roles by their mobile number.
 *    parameters:
 *      - in: path
 *        name: mobileNo
 *        description: The mobile number of the user to update.
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - roles
 *              - mobileNo
 *            properties:
 *              roles:
 *                type: array
 *                items:
 *                  type: string
 *              mobileNo:
 *                type: string
 *                example: "9952032862"
 *    responses:
 *      '200':
 *        description: User roles updated successfully.
 *      '404':
 *        description: User not found.
 */
router.put('/users/v1.0/:mobileNo', userController.updateUserRole);

module.exports = router;
