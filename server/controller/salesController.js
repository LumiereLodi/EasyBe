const {createTokens, validateToken,salesmanagerValidation} = require('../jwt')
const db = require("../models/db");

module.exports={

    //CHECK IF THE CUSTOMER'S EMAIL WE ARE TRYING TO ADD ALREADY EXISTS
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
    },

    //CODES BELOW ARE SELF EXPLANATORY.
    customerList: async(req, res)=> {
        try{
            const result = await db.query("SELECT customerid, name FROM customer ORDER BY createdat DESC")
            res.status(200).json(result.rows)
        }catch (err) {
            res.status(400).json(err.message)
        }
    },
    addCustomer: async(req, res)=> {
        try{
            const client = await db.query ("INSERT INTO \n" +
                "customer(name,\n" +
                "\t\t email, phone,contactpersonname,\n" +
                "\t\t postalcode, address, createdby)\n" +
                "VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING * ", [
                req.body.name,
                req.body.email,
                req.body.phone,
                req.body.contactPerson,
                req.body.postalCode,
                req.body.address,
                req.params.managerid
            ]);


            res.status(200).json(client.rows[0]);

        }catch(error){
            res.status(400).json(error.message)
        }
    },
    addProject: async (req, res, next)=> {
        try {
            const outcome = await db.query("INSERT INTO \n" +
                "project( name, customerid,\n" +
                "\t\t startdate,\n" +
                "\t\t enddate, staff,createdby)\n" +
                "VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [
                req.body.name,
                req.body.customer,
                req.body.startDate,
                req.body.endDate,
                req.body.staff,
                req.params.managerid
            ]);

            req.newProject = outcome.rows[0]

            next()
            //res.json(outcome.rows[0]);

        } catch (e) {
            console.log(e)
        }
    },

    projectFile: async(req, res) => {
        let result;
        try{
            if(req.body.description){

                // if(req.newProject){
                //     await db.query("INSERT INTO projectfile (projectid, employeeid, departmentid, description) VALUES($1, $2, $3, $4)", [
                //
                //         req.newProject.projectid,
                //         req.newProject.staff,
                //         req.params.departmentid,
                //         req.body.description
                //     ])
                // }else{
                //      result = await db.query("INSERT INTO projectfile (projectid, employeeid, departmentid, description) VALUES($1, $2, $3, $4) RETURNING * ", [
                //
                //         req.params.projectid,
                //         req.params.employeeid,
                //         req.params.departmentid,
                //         req.body.description
                //     ])
                // }

                     result = await db.query("INSERT INTO projectfile (projectid, employeeid, departmentid, description) VALUES($1, $2, $3, $4)", [
                        req.newProject.projectid,
                        req.newProject.staff,
                        req.params.departmentid,
                        req.body.description
                    ])
            }

            console.log("DONE DONE DONE MR. BOB")
            res.status(200).json({newProject : req.newProject, projectFile:  result.rows[0]})


        }catch (error){
            console.log("DONE BUT WITH ERROR MR. BOB")
            res.status(400).json(error.message)
        }
    },

    sendProject: async (req, res) => {
        try{
            const result = await db.query("UPDATE project SET location = '1', status = '1' where projectid = $1 RETURNING *", [req.params.projectid])
            res.status(200).json({editedProject : result.rows[0]})

        }catch (error){
            res.status(400).json(error.message)
        }
    },
    completeProject: async (req, res) => {
        try{
            const result = await db.query("UPDATE project SET status = '2', location = '1' where projectid = $1 RETURNING *", [req.params.projectid])
            res.status(200).json({editedProject : result.rows[0]})

        }catch (error){
            res.status(400).json(error.message)
        }
    },
    getLocation: async (req, res) => {
        try{
            const result = await db.query("SELECT location from project where projectid = $1", [req.params.projectid])
            res.status(200).json(result.rows[0])

        }catch (error){
            res.status(400).json(error.message)
        }
    },
    getStatus : async(req, res) => {
        try{
        const result = await db.query("SELECT status from project where projectid = $1", [req.params.projectid])
        res.status(200).json(result.rows[0])

    }catch (error){
        res.status(400).json(error.message)
        }
    },
    getAllTasks : async(req, res) => {
        try{

            let query = "select task.*, employee.lastname from task \n" +
                "join employee\n" +
                "on task.staff = employee.employeeid\n" +
                "where task.projectid = $1 "
            let result
            result = await db.query(query, [req.params.projectid])

            res.status(200).json(result.rows)

        }catch (error){
            res.status(400).json(error.message)
        }
    },
    defaultCustomer: async (req, res) => {
        try{
            const result = await db.query("SELECT * FROM customer ORDER BY createdat DESC LIMIT 1")

            res.status(200).json(result.rows[0])

        }catch (error){
            res.status(400).json(error.message)
        }
    },
    getCustomer: async (req, res) => {
        try{
            const result = await db.query("SELECT * FROM customer WHERE customerid = $1", [req.params.customerid])

            res.status(200).json(result.rows[0])

        }catch (error){
            res.status(400).json(error.message)
        }
    },

    getCustomerProject : async (req, res) => {
        try{
            const result = await db.query("SELECT project.*, to_char(startdate, $1 ) as formatedStartDate,to_char(enddate, $2 ) as formatedEndDate,  employee.lastname FROM project join employee on employee.employeeid = project.staff WHERE project.customerid = $3", ['DD/MM/YYYY', 'DD/MM/YYYY', req.params.customerid])
            res.status(200).json(result.rows)
        }catch (error){
            res.status(400).json(error.message)
        }
    }
}