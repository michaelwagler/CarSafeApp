/**
 * Created by haihoang on 2015-03-08.
 *
 *
 * Converter class to parse .csv file and convert to JSON.
 * Parser selects for only 'Theft Of Auto Under $5000' and 'Theft Of Auto Over $5000'
 * and only displays TYPE and HUNDRED_BLOCK
 *
 * Parser source code: https://github.com/Keyang/node-csvtojson
 * Help for filter: http://stackoverflow.com/questions/25514876/how-to-filter-json-data-in-node-js
 */

var _ = require("underscore");
var Crime = require('../model/crime_entry');

//Converter Class
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var appRoot = require('app-root-path');

var csvFileName= appRoot + "/download_data/temp/crime_data.csv";




var fileStream=fs.createReadStream(csvFileName);


//new converter instance
var param={};
var csvConverter=new Converter(param);

function filtr(jArray){
    for (var i = 0; i< jArray.length; i++){
        delete jArray[i].YEAR;
        //delete jArray[i].MONTH; //comment out to keep MONTH element
        jArray[i].HUNDRED_BLOCK = jArray[i].HUNDRED_BLOCK.replace("XX", "00");
        jArray[i].HUNDRED_BLOCK = jArray[i].HUNDRED_BLOCK.replace("/", "AND");
    }
}

function saveCrimes(jArray){
    Crime.removeAll(function(err){
        if (err){
            console.error(err);
        }
    });
    for (var i = 0; i< jArray.length; i++){
        var type = jArray[i].TYPE,
            month = parseInt(jArray[i].MONTH),
            address = jArray[i].HUNDRED_BLOCK;
        var newCrime = new Crime({
            type: type,
            month: month,
            address: address
        });
        newCrime.save(function(err, crime){
            if(err){
                console.error(err);
            }
        })
    }
}

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
    var filtered = _.filter(jsonObj, function(item){
        return (item.TYPE == "Theft Of Auto Under $5000" || item.TYPE == "Theft Of Auto Over $5000");
    });
    filtr(filtered);
    console.log(filtered);
    saveCrimes(filtered);
});

//read from file
function parseData(){
    fileStream.pipe(csvConverter);
}

module.exports = {parseData: parseData};