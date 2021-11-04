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
            const result = await db.query("select * from department order by createdat DESC, name ASC");
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
            await db.query("UPDATE employee SET position = $1, departmentid = $2 WHERE employeeid = $3", ["Manager", req.departmentid, req.body.managerName])
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

            const departmentname = await db.query("SELECT name FROM department where name = $1", [req.body.departmentName]);

            if(departmentname.rows.length > 0){
                res.json({status : true})
            }
            else{
                console.log("inside add department")
                const result = await db.query("INSERT INTO department (name, createdby) VALUES ($1, $2) RETURNING *", [req.body.departmentName, req.params.createdby])
                req.departmentid = result.rows[0].departmentid
                req.departmentname = result.rows[0].name
                next()
            }

        }catch (error) {

            res.status(400).json({
                error: error.message
            })
        }
    },

    getStaffList: async (req, res) => {
        try{
            const result = await db.query("SELECT * FROM employee WHERE position = $1", ['Staff'])
            res.json(result.rows)
        }catch (error) {

            res.status(400).json({
                error: error.message
            })
        }
    },

    getEasybeStaffDetails: async (req, res) => {
        try{
            const result = await db.query("select department.name, employee.lastname, employee.employeeid, employee.position, employee.phonenumber, employee.email, employee.dateofbirth, employee.address,contract, employee.createdat, employee.createdby from employee \n" +
                "join department\n" +
                "on department.departmentid = employee.departmentid\n" +
                "where employee.employeeid = $1", [req.params.employeeid])
            res.json(result.rows[0])
        }catch (error) {

            res.status(400).json({
                error: error.message
            })
        }
    },
    getEasybeStaffList: async (req, res) => {
        try{
            const result = await db.query("SELECT employeeid, lastname as name FROM employee order by createdat ASC, lastname ASC")
            res.json(result.rows)
        }catch (error) {

            res.status(400).json({
                error: error.message
            })
        }
    },
    getDepartmentStaffList: async (req, res) => {
        try{
            const result = await db.query("SELECT lastname, contract, position, email FROM employee WHERE departmentid = $1", [req.params.departmentid])
            res.json(result.rows)
        }catch (error) {

            res.status(400).json({
                error: error.message
            })
        }
    },
    departmentDetails: async(req, res) => {

        try {
            console.log("we have landed")

            const result = await db.query("select department.*, numberOfStaff.staffNumber as numberOfStaff from department\n" +
                "inner join (\n" +
                "\tselect departmentid, count(employeeid) as staffNumber from employee where departmentid = $1 group by departmentid\n" +
                ") as numberOfStaff\n" +
                "on department.departmentid = numberOfStaff.departmentid", [req.params.departmentid])

            res.json(result.rows[0])
        }catch (error) {

            res.status(400).json({
                error: error.message
            })
        }
    }

}