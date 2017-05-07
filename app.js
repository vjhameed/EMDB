/**
 * Created by Administrator on 5/6/2017.
 */
const express = require('express');
const request = require('request');
const bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static("public"));

var port = process.env.PORT || 3000;
app.get("/",(req,res)=>{
    res.render("search");
});

app.post("/posted",(req,res)=>{
    var result;
        var moviename  =  encodeURIComponent(req.body.mname);
        var type  =  req.body.type  ? encodeURIComponent(req.body.type) : "movie";
        var plot  =  req.body.plot ? encodeURIComponent(req.body.plot) : "full";
        var url = `http://www.omdbapi.com/?s=${moviename}&plot=${plot}&type=${type}`
        request(url,(error,response,body)=>{
            result = JSON.parse(body);
            res.render("results",{thingvar:result})
        });
});

app.listen(port,()=>{console.log("server has started") })