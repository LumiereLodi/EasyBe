const db = require("../models/db");
const bcrypt = require("bcryptjs");
const {createTokens, validateToken,salesmanagerValidation} = require('../jwt');


module.exports = {
    userInfo: async (req, res)=>{
        try{
            const user = await db.query("SELECT employeeid, " +
                "givennames, lastname, dateofbirth, email,address," +
                "contract, position, employee.departmentid, department.departmentname  " +
                "from employee " +
                "join department\n" +
                "on employee.departmentid = department.departmentid where employeeid = $1", [req.params.userid]);
            res.status(200).json({
                user: user.rows[0]
            })
        }catch (error) {
            res.status(400).json(error.message)
        }
    },

    //BEFORE LOGIN WE CHECK WHETHER YOUR CREDENTIALS ARE CORRECT OR NOT.
    login: async (req, res)=>{
        const {email, password} = req.body;
        try {
            const user = await db.query("SELECT employeeid, givennames, lastname, dateofbirth, email,address,contract, position, departmentid from employee where email = $1", [email]);

            if (user.rowCount === 0) {
                res.status(200).json({error: "User Doesnt Exist", status: false})
            }

            const dbPassword = await db.query("SELECT password FROM employee where email = $1 ", [email])

            //AT REGISTRATION WE HASHED THE PASSWORD. HERE WE COMPARE THE HASH PASSWORD WITH THE ONE ENTERED BY THE USER
            //IF IT HAS THE SAME VALUES THEN THE USER CAN LOGIN

            const match = await bcrypt.compare(password, dbPassword.rows[0].password)
            if (!match) {
                res.status(200).json({error: "Wrong Username and Password Combination",status: false})
            } else {

                //AFTER SUCCESSFULLY LOGGING IN. WE CREATE A TOKEN FOR THE USER
                const accessToken =  createTokens(user.rows[0])

                //WE SAVE THE TOKEN IN THE COOKIE. INSIDE THE BROWSER
                //HTTPONLY MEANS NO JAVASCRIPT CODE CAN ACCESS THE COOKIE.
                //THE CHECK IS ALWAYS HAPPENING IN THE BACKEND.

                res.cookie("access-token", accessToken, {
                    maxAge: 604800000,
                    httpOnly: true,
                    path: "/",
                });
                res.status(200).json({user: user.rows[0],status: true})
            }

        } catch (error) {
                res.status(400).json(error.message)
        }

    },
    register: async (req, res)=>{

        //WE HASH THE PASSWORD BEFORE SAVING THE USER.
        //WE DO NOT SAVE A PLAIN PASSWORD IN OUR DATABASE.

        const hash = await bcrypt.hash(req.body.password, 10)

        try {
            const result = await db.query("INSERT INTO " +
                "employee( givenNames, lastName, dateOfBirth, email, " +
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
                    req.params.id,
                    req.body.departmentId
                ]
            )

            res.status(200).json({
                message: "USER ADDED",
                data: result.rows
            })
        } catch (error) {
            res.status(400).json(error.message)
        }

    },

    logout: async(req, res)=> {
        // clear cookie
        res.clearCookie('access-token');
        res.json("downloaded");
    }

}
