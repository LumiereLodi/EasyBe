const db = require("../models/db");
const bcrypt = require('bcryptjs')

const {createTokens, validateToken,salesmanagerValidation} = require('../jwt')

module.exports = {
    admin: async(req, res) => {
    const result = await db.query("SELECT givenNames FROM employee");
    res.status(200).json({
        message: "USER ADDED",
        data: result.rows
    })

    },

    //WHEN ADDING USER THE DEPARTMENT THEY ARE JOINING WILL BE LISTED FOR THE ADMIN

    departmentList: async (req, res)=> {
        try {
            const result = await db.query("select * from department");
            await res.status(200).json({
                departmentList: result.rows
            })
        } catch (error) {
            res.status(400).json({
                error: "failed"
            })
        }
    },

    assignManager: async(req, res) => {
        try{
            await db.query("UPDATE employee SET position = $1, departmentid = $2 WHERE employeeid = $3", ["Manager", req.departmentid, req.body.manager])
            res.status(200).json({
                departmentid: req.departmentid,
                departmentname : req.departmentname
            })
        }catch (error) {
            res.status(400).json({
                error: error.message
            })
        }
    },

    addDepartment: async(req, res,next) => {
        try{
            const result = await db.query("INSERT INTO department (departmentname, createdby) VALUES ($1, $2) RETURNING *", [req.body.name, req.params.id])
            req.departmentid = result.rows[0].departmentid
            req.departmentname = result.rows[0].departmentname
            next()
        }catch (error) {

            res.status(400).json({
                error: error.message
            })
        }
    },

}