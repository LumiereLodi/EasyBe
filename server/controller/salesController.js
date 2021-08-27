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
            const result = await db.query("SELECT customerid, name FROM customer ORDER BY createdat ASC")
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
    addProject: async (req, res)=> {
        try {
            const outcome = await db.query("INSERT INTO \n" +
                "project( name, customerid,\n" +
                "\t\t description,startdate,\n" +
                "\t\t enddate, staff,createdby)\n" +
                "VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *", [
                req.body.name,
                req.body.customer,
                req.body.description,
                req.body.startDate,
                req.body.endDate,
                req.body.staff,
                req.params.managerid
            ]);

            res.json(outcome.rows[0]);

        } catch (e) {
            console.log(e)
        }
    }
}