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
    customerListSearch: async(req, res)=> {
        try{
            const result = await db.query("SELECT customerid, name FROM customer WHERE LOWER(name) like LOWER('%' || $1 || '%') ORDER BY createdat DESC",[req.params.wordToSearch])
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
    updateCustomer: async(req, res)=> {
        try{
            const client = await db.query ("UPDATE customer SET \n" +
                "name = $1,\n" +
                "\t\t email = $2, phone = $3 ,contactpersonname = $4,\n" +
                "\t\t postalcode = $5, address = $6, createdby = $7\n" +
                "WHERE customerid = $8 RETURNING * ", [
                req.body.name,
                req.body.email,
                req.body.phone,
                req.body.contactPerson,
                req.body.postalCode,
                req.body.address,
                req.params.managerid,
                req.params.customerid
            ]);


            res.json(client.rows);

        }catch(error){
            console.log(error)
            res.status(400).json(error.message)
        }
    },
    addProject: async (req, res, next)=> {

        console.log("WE ALSO CAME HERE")
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

        } catch (error) {
            res.status(400).json(error)
        }
    },
    updateProject: async (req, res)=> {

        console.log("INSIDE THE UPDATE")
        console.log(req.body)
        console.log(req.params.projectid)
        try {
            const response = await db.query("UPDATE project SET \n" +
                " name = $1, customerid = $2,\n" +
                "\t\t startdate = $3,\n" +
                "\t\t enddate = $4, staff = $5,createdby = $6\n" +
                " WHERE projectid = $7 RETURNING *", [
                req.body.name,
                req.body.customer,
                req.body.startDate,
                req.body.endDate,
                req.body.staff,
                req.params.managerid,
                req.params.projectid
            ]);


            res.json(response.rows)

            //res.json("inside")
            //res.json(outcome.rows[0]);

        } catch (error) {
            res.status(400).json(error)
        }
    },

    projectFile: async(req, res) => {

        console.log("DONE DONE DONE MR. BOB")
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
                "where task.projectid = $1 ORDER BY task.createdat DESC, name DESC"
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