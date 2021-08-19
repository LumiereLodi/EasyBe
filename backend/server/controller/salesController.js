const {createTokens, validateToken,salesmanagerValidation} = require('../jwt')
const db = require("../models/db");

module.exports={
    customerEmail: async(req, res)=> {
        const result = await db.query("SELECT email from customer where email = $1 ", [req.params.email]);
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