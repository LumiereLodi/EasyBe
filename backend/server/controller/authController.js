const db = require("../models/db");

module.exports = {

    //RETURN VALUES BELOW TO THE TOKEN INSIDE THE COOKIE
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

    //QUERY TO CHECK IF THE EMAIL EXISTS IN THE DATABASE WHILE ADDING AN EMPLOYEE OR CUSTOMER
    email: async (req, res)=>{
        const result = await db.query("SELECT email from employee where email = $1 ", [req.params.email]);
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