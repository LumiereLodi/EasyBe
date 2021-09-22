const {sign, verify} = require("jsonwebtoken");

const createTokens =  (user) => {

    return sign(
        {employeeid: user.employeeid, email: user.email, position: user.position, departmentid: user.departmentid, givennames: user.givennames},
        process.env.REACT_APP_JWT_SECRET

    );

};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    if (!accessToken)
        return res.status(200).json({ error: "User not Authenticated!", authenticated: false });

    try {
        const validToken = verify(accessToken, process.env.REACT_APP_JWT_SECRET);
        if (validToken) {
            req.position = validToken.position;
            req.employeeid = validToken.employeeid;
            req.departmentid = validToken.departmentid;
            req.givennames = validToken.givennames;

            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err , text: "inside token checker"});
    }
};

const salesmanagerValidation = (req, res, next)=>{
    const accessToken = req.cookies["access-token"];
    if (!accessToken){
        return res.status(200).json({ error: "User not Authenticated!", authenticated: false });
    }

    const validToken = verify(accessToken, process.env.REACT_APP_JWT_SECRET);

    if(validToken){
        if(validToken.departmentid !== '2002'){
            return res.status(200).json({ error: "Not allowed", authenticated: false });
        }else{

            req.createdby = validToken.employeeid


            next()
        }
    }

}

module.exports = { createTokens, validateToken,salesmanagerValidation };