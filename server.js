
require('./config/db');

const signupUser = require("./api/signup");
const signinUser = require("./api/signin");
const vacRequest = require("./api/vacationRequest");
const getVacRequest = require("./api/getVacationRequest");
const updateVacationRequest = require("./api/updateVacationRequest"); 
const getResponse = require("./api/getVacResponse"); 

const deleVacationData = require("./api/deleteVacationData"); 

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/api/v1/signup", signupUser);
app.post("/api/v1/signin", signinUser);
app.post("/api/v1/vacationRequest", vacRequest);
app.get("/api/v1/getVacationRequest", getVacRequest);
app.post("/api/v1/updateVacationRequest", updateVacationRequest); 

app.delete("/api/v1/deleteVacationData", deleVacationData); 


app.get("/api/v1/getVacResponse", getResponse); 


app.listen(port, () => {
    console.log(`Server running on port ${port}`);




//     const jwt = require('jsonwebtoken');


// const adminToken = jwt.sign({ email: 'admin@example.com', isAdmin: true }, 'idristhabet');
// const userToken = jwt.sign({ email: 'user@example.com', isAdmin: false }, 'idristhabet');

// console.log("token admin :", adminToken);
// console.log("user token:", userToken);

});
