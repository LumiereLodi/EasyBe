/********************* MAIN SERVER FILE *************************/

/**************** FOLLOWING THE MVC PATTERN **********************/

require("dotenv").config();
const db = require("./models/db");

/*>>>>>Connection to Express<<<<<<<<<*/

const express = require("express");
const app = express();
const router = express.Router()
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path")

app.use(express.static(path[0] +  "frontend/build"))

if(process.env.NODE_ENV === "production"){
    const path = __dirname.split("\server")
    app.use(express.static(path[0] +  "frontend/build"))
    //D:\lumie\Coding\IE Project\EasyBe\frontend\build
    //frontend\build
} 

/************* CONNECTION TO THE ROUTES ******************/

const hr = require("./routes/hr");
const auth = require("./routes/auth");
const sales = require("./routes/sales");
const user = require("./routes/user");
const dashboard = require("./routes/dashboard");
const manager = require("./routes/manager");
const project = require("./routes/project");



app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));


/*>>>>> first field of the URL <<<<<<<<<*/

app.use("/Sales", sales);
app.use("/hr", hr);
app.use("/department", hr);
app.use("/user", user);
app.use("/authenticate", auth);
app.use("/dashboard", dashboard);
app.use("/employee", manager);
app.use("/team", manager);
app.use("/task", manager);
app.use("/analytics", manager);
app.use("/project", project)


// app.get("/test", async (req, res)=> {
//
//     try{
//         console.log("inside the test")
//         console.log("the JWT_SECRET: " + process.env.REACT_APP_JWT_SECRET)
//         const result = await db.query("SELECT * FROM employee")
//         console.log(result)
//         res.json(result)
//     }catch(e){
//         res.status(400).json(e.message)
//     }
//
// })

console.log("inside backend")

router.get("*", (req, res)=> {

    console.log("inside unknown")
    
    const path = __dirname.split("\server")
    console.log(path[0] + "\n")
    //console.log(path.join(__dirname, "frontend/build/index.html"))
    res.sendFile(path[0] +  "frontend/build/index.html")
    //console.log(path.join(__dirname, "client-side/build/index.html"))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server listening on port ${port}...`);
});
