/**
 * Created by haihoang on 2015-03-08.
 *
 *
 * Converter class to parse .csv file and convert to JSON
 *
 * Parser source code: https://github.com/Keyang/node-csvtojson
 */


////Parser Manager
//var parserMgr=require("csvtojson").core.parserMgr;
//
//parserMgr.addParser("carSafeParser",/^\*TYPE\*/,function (params){
//    var columnTitle=params.head; //params.head be like: *parserRegExp*ColumnName;
//    var fieldName=columnTitle.replace(this.regExp, ""); //this.regExp is the regular expression above.
//    params.resultRow[fieldName]="Hello my parser"+params.item;
//});



//Converter Class
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var csvFileName="./crime_2014.csv";
var fileStream=fs.createReadStream(csvFileName);
//new converter instance
var param={};
var csvConverter=new Converter(param);

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
   console.log(jsonObj); //here is your result json object
});

//read from file
fileStream.pipe(csvConverter);