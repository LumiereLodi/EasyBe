const {createTokens, validateToken,salesmanagerValidation} = require('../jwt');
const db = require("../models/db");

module.exports = {
    auth: async(req, res)=>{
        try{
            res.json(
                {
                    authenticated: req.authenticated,
                    position: req.position,
                    employeeid: req.employeeid,
                    departmentid: req.departmentid,
                    givennames: req.givennames
                }
            )
        }catch (error) {
            res.status(200).json({authenticated: false})
        }

        },
    email: async (req, res)=>{
        const result = await db.query("SELECT email from members where email = $1 ", [req.params.email]);
        if (result.rowCount === 0) {
            res.status(200).json({exist: false})
        } else {
            res.status(200).json({
                results: result.rows.length,
                exist: true,
                data: result.rows
            })
        }
    }
}