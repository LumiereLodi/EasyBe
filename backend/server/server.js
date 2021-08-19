require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")


const hr = require("./routes/hr")
const auth = require("./routes/auth")
const sales = require("./routes/sales")
const user = require("./routes/user")
const dashboard = require("./routes/dashboard")
const employee = require("./routes/manager")


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))



app.use("/sales", sales)

app.use("/hr", hr)

app.use("/user", user)

app.use("/authenticate", auth)

app.use("/dashboard", dashboard)

app.use("/employee", employee)



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server listening on port ${port}...`)
});
