//jshint esversion: 6

const bodyParser = require("body-parser");
const https = require("https");
const express = require("express");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const eMail = req.body.eMail

    const data = {
        members: [
            {
            email_address: eMail,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }
        ]
    };
        
const jsonData = JSON.stringify(data);

const url = "https://us20.api.mailchimp.com/3.0/lists/3a41e8e522"

const options = {
    method:"POST",
    auth: "Spenser:9827158e9437fd57d99afd66f630b31d-us20"
}



const request = https.request(url, options, function(response) {

    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    } else {
        res.sendFile(__dirname + "/failure.html");
        console.log(response.statusCode)
    }

    response.on("data", function(data){
        console.log(JSON.parse(data));
    })

});
request.write(jsonData);
request.end();

});


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/failure", function(req, res){
    res.redirect("/")
})

//app.listen(300, function(){
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is up and running on port 3000.")
})

// Api Key
// 9827158e9437fd57d99afd66f630b31d-us20

// audience id
// 3a41e8e522