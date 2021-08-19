const db = require("../models/db");
const bcrypt = require('bcrypt')

module.exports = {
        register: async (req, res)=>{
            const hash = await bcrypt.hash(req.body.password, 10)

            try {
                const result = await db.query("INSERT INTO " +
                    "members( givenNames, lastName, dateOfBirth, email, " +
                    "address, contract, position, password, createdby, departmentid) " +
                    "VALUES($1, $2, $3,$4, $5,$6, $7,$8,$9,$10) RETURNING *",
                    [
                        req.body.givenNames,
                        req.body.lastName,
                        req.body.dateOfBirth,
                        req.body.email,
                        req.body.address,
                        req.body.contract,
                        req.body.position,
                        hash,
                        '1002',
                        req.body.departmentId
                    ]
                )

                res.status(200).json({
                    message: "USER ADDED",
                    data: result.rows
                })
            } catch (error) {
                res.status(400).json({error: error.detail})
            }

        }
}