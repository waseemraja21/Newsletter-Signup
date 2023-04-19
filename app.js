const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}))


// get route of our page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//post route request
app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us18.api.mailchimp.com/3.0/lists/f60bb86e2b";

  const options = {
    method: "POST",
    auth: "waseem:1dfecf09399e799465e6fc0b34897e09-us18"
  }

  const request = https.request(url, options, function(response) {
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();


});

app.post("/failure", function(req, res){
  res.redirect("/")
})


app.listen(3000, function() {
  console.log("Server is running at port 3000");
});
//api key
// 1dfecf09399e799465e6fc0b34897e09-us18
