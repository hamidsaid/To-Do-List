const express = require("express");
const bodyParser = require("body-parser");
//inheriting date.js
const theDate = require(__dirname + "/date.js");

const app = express();

let items = ["Backtest", "Breakfast", "Code"];
let workTasks = [];

//app use ejs as ur view engine
app.set('view engine' , 'ejs');

app.use(bodyParser.urlencoded({extended : true}));

//load the css styles
app.use(express.static("public"));

app.get("/" , function(req, res) {
  
    //calling the function bounded to the constant theDate
   var day = theDate();

    res.render("list", {listTitle : day ,newItems : items});


});

app.post("/" , function(req, res) {


  let listItem = req.body.LItem;

  if( req.body.btn === "Work") {

      workTasks.push(listItem);
      res.redirect("/work");

  }else {
    items.push(listItem);

    res.redirect("/")
  }

  
  
});

app.get("/work" , function (req, res) {

    res.render("list", {listTitle : "Work To-Do List" ,newItems : workTasks});

});

app.get("/about" , function(req, res) {
    res.render("about");
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});