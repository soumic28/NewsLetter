const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use('/public',express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));




app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    let first =req.body.fname;
    let last = req.body.lname;
    let email = req.body.email;

    console.log(first,last,email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: first,
                    LNAME: last
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/51d5cf2ace";

    const option ={
        method:"POST",
        auth:"soumicsarkar:3c3e76d80dd4b165a8021205c4ebd0b4-us10"
    }

   const request = https.request(url,option,function(response){
           
    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/suceess.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    };


        response.on("data",function(data){
            console.log(JSON.parse(data));
        })


    });

    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req,res){
    res.redirect("/");
})




app.listen(process.env.PORT || 3000 ,function(){
    console.log("Server is running on port 3000");


});    







//Api key
//3c3e76d80dd4b165a8021205c4ebd0b4-us10

//Audiende id
//51d5cf2ace