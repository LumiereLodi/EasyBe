const db = require("../models/db");

module.exports = {
    userInfo: async (req, res)=>{
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
    },
    login: async (req, res)=>{
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

    },
    register: async (req, res)=>{
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

    },

    logout: async(req, res)=> {
        // clear cookie
        res.clearCookie('access-token');
        res.end()
    }

}
