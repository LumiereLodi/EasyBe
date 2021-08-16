require("dotenv").config();
const express = require("express");
const db = require("./db")
const app = express();
const cors = require("cors")
const bcrypt = require('bcrypt')
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const {createTokens, validateToken} = require('./jwt')

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
//MIDDLEWARE TO GET DATA FROM THE BODY. IT CONVERTS THE DATA TO A JAVASCRIPT OBJECT.
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

/**=====================================REGISTRATION AND LOGIN=================================**/

app.get("/email/:email", async (req, res) => {
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


})

app.post("/register", async (req, res) => {
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
);

app.get("/admin", async (req, res) => {
    const result = await db.query("SELECT givenNames FROM employee");
    res.status(200).json({
        message: "USER ADDED",
        data: result.rows
    })

})
app.get("/userinformation/:userid", async (req, res) => {
    try{
        const user = await db.query("SELECT employeeid, " +
            "givennames, lastname, dateofbirth, email,address," +
            "contract, position, members.departmentid, department.departmentname  " +
            "from members " +
            "join department\n" +
            "on members.departmentid = department.departmentid where employeeid = $1", [req.params.userid]);
        res.status(200).json({
            user: user.rows[0]
        })
    }catch (error) {
        res.status(400).json({error: error})
    }
})
app.post("/login", async (req, res) => {


    const {email, password} = req.body;
    try {
        const user = await db.query("SELECT employeeid, givennames, lastname, dateofbirth, email,address,contract, position, departmentid from members where email = $1", [email]);

        if (user.rowCount === 0) {
            res.status(200).json({error: "User Doesnt Exist", status: false})
        }

        const dbPassword = await db.query("SELECT password FROM members where email = $1 ", [email])

        const match = await bcrypt.compare(password, dbPassword.rows[0].password)
        if (!match) {
            res.status(200).json({error: "Wrong Username and Password Combination",status: false})
        } else {
            const accessToken =  createTokens(user.rows[0])
            res.cookie("access-token", accessToken, {
                maxAge: 604800000,
                httpOnly: true,
                path: "/",
            });
            res.status(200).json({user: user.rows[0],status: true})
        }

    } catch (error) {
        if (error) {

            res.status(400).json({error: error.detail})
        }
    }


});
app.get("/authenticate", validateToken, (req, res) => {
    try{
        res.json(
            {
                authenticated: req.authenticated,
                position: req.position,
                employeeid: req.employeeid,
                departmentid: req.departmentid
            }
            )
    }catch (error) {
        res.status(200).json({authenticated: false})
    }

})
/**==========================================================================================**/
app.get("/admin/department/departmentlist", async (req, res) => {
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
})


// app.get("/IT/dashboard/completed/:status", async (req, res) => {
//     try {
//         const { status } = req.params;
//         const retrieve = await db.query("SELECT count(*) from project where status =  $1", [status])
//
//         res.json(retrieve.rows)
//     } catch (err) {
//         console.error(err.message)
//     }
// })

/*query for  active project*/
app.get("/dashboard/project/:status", async (req, res) => {
    try {

        const retrieve = await db.query("SELECT count(*) from project where status =  $1", [req.params.status])

        res.status(200).json(retrieve.rows[0])
    } catch (err) {
        res.status(400).json(err.message)
    }
})

/*query for backlog project*/
app.get("/dashboard/project/status/backlog", async (req, res) => {
    try {

        const retrieve = await db.query("SELECT count(*) from project where projectenddate > Now()")

        res.json(retrieve.rows[0])
    } catch (err) {
        res.status(400).json(err.message)
    }
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server listening on port ${port}...`)
});
