const express = require('express')
const router = express.Router();
const userController= require('../controllers/usercontroller')
const roleController=require('../controllers/rolecontroller')
const branchController=require('../controllers/branchcontroller')
//save user path
/**
 * @swagger
 * /api/users/v1.0/:
 *  post:
 *    description: Use to add user in DB
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
 *          properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            dob:
 *              type: string
 *              pattern: '^\d{4}-\d{2}-\d{2}$'
 *              example: 1970-12-02
 *            gender:
 *              type: string
 *              enum: [MALE,FEMALE,TRANSGENDER]
 *              example: MALE
 *            mobileNo :
 *              type: integer
 *              example: 9952032862
 *            password :
 *              type: string
 *              description: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
 *            roles:
 *              type: array
 *              items:
 *                  type: string
 *            
 *
 *    responses:
 *      '200':
 *        description: User added successfully.
 */
router.post('/users/v1.0/', userController.saveUser)
/**
 * @swagger
 * /api/roles/v1.0/:
 *  post:
 *    description: Use to add roles in DB
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
 *        description: role added successfully.
 */
router.post('/roles/v1.0/',roleController.saveRole)

/**
 * @swagger
 * /api/branches/v1.0/:
 *  post:
 *    description: Use to add a branch in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add branch
 *        description: Add a branch in DB.
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
router.post('/branches/v1.0/',branchController.saveBranch)
/**
 * @swagger
 * /api/users/v1.0/:
 *  get:
 *    description: Use to add user in DB
 *    produces:
 *      - application/json
 *    parameters:
 *         - in: query
 *           name: pages
 *           type: integer
 *           required: false
 *           default: 0
 *           minimum: 0
 *           description: The number of items to skip before starting to collect the result set.
 *         - in: query
 *           name: limit
 *           type: integer
 *           required: false
 *           default: 20
 *           minimum: 1
 *           maximum: 100
 *           description: The numbers of items to return.
 *    responses:
 *      '200':
 *        description: Users fetched successfully.
 */
router.get('/users/v1.0/',userController.fetchAllUsers)

module.exports = router