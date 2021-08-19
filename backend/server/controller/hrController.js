const db = require("../models/db");
const bcrypt = require('bcrypt')

const {createTokens, validateToken,salesmanagerValidation} = require('../jwt')

module.exports = {
    admin: async(req, res) => {
    const result = await db.query("SELECT givenNames FROM employee");
    res.status(200).json({
        message: "USER ADDED",
        data: result.rows
    })

    }
}