const db = require("../models/db");
const bcrypt = require('bcrypt')

const {createTokens, validateToken,salesmanagerValidation} = require('../jwt')

module.exports = {
    login: async (req, res)=>{
        const {email, password} = req.body;
        try {
            const user = await db.query("SELECT employeeid, givennames, lastname, dateofbirth, email,address,contract, position, departmentid from members where email = $1", [email]);

            if (user.rowCount === 0) {
                res.status(200).json({error: "User Doesnt Exist", status: false})
            }

            const dbPassword = await db.query("SELECT password FROM members where email = $1 ", [email])

            const match = await bcrypt.compare(password, dbPassword.rows[0].password)
            if (!match) {
                res.status(200).json({error: "Wrong Username and Password Combination",status: false})
            } else {
                const accessToken =  createTokens(user.rows[0])
                res.cookie("access-token", accessToken, {
                    maxAge: 604800000,
                    httpOnly: true,
                    path: "/",
                });
                res.status(200).json({user: user.rows[0],status: true})
            }

        } catch (error) {
            if (error) {

                res.status(400).json({error: error.detail})
            }
        }

    }
}