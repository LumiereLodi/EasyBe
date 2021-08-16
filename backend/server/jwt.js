const {sign, verify} = require("jsonwebtoken");

const createTokens =  (user) => {

    return sign(
        {employeeid: user.employeeid, email: user.email, position: user.position, departmentid: user.departmentid},
        process.env.JWT_SECRET

    );

};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken)
        return res.status(200).json({ error: "User not Authenticated!", authenticated: false });

    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET);
        if (validToken) {
            req.position = validToken.position;
            req.employeeid = validToken.employeeid;
            req.departmentid = validToken.departmentid;

            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err , text: "inside token checker"});
    }
};

module.exports = { createTokens, validateToken };