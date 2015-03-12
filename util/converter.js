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
var Crime = require('../model/crime');

//Converter Class
var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var appRoot = require('app-root-path');

var csvFileName= appRoot + "/download_data/temp/crime_data.csv";



function filtr(jArray){
    for (var i = 0; i< jArray.length; i++){
        delete jArray[i].YEAR;
        //delete jArray[i].MONTH; //comment out to keep MONTH element
        jArray[i].HUNDRED_BLOCK = jArray[i].HUNDRED_BLOCK.replace("XX", "00");
        jArray[i].HUNDRED_BLOCK = jArray[i].HUNDRED_BLOCK.replace("/", "AND");
    }
}

function saveOneCrime(jArray, i) {
    var type = jArray[i].TYPE,
        month = parseInt(jArray[i].MONTH),
        address = jArray[i].HUNDRED_BLOCK;
    var newCrime = new Crime({
        type: type,
        month: month,
        address: address
    });
    newCrime.save(function (err, crime) {
        if (err) {
            req.flash('error', 'Error when trying to save a crime into the database!');
        }

    });

}
function saveCrimes(jArray){
    Crime.removeAll(function(err){
        if (err){
            console.error(err);
        }
    });
    for (var i = 0; i< jArray.length; i++) {
        saveOneCrime(jArray, i);
    }
}


//read from file
function parseData(){

//new converter instance
    var param={};

    csvConverter=new Converter(param);

    var fileStream=fs.createReadStream(csvFileName);
    fileStream.pipe(csvConverter);

    //end_parsed will be emitted once parsing finished

    csvConverter.on("end_parsed",function(jsonObj){
        var filtered = _.filter(jsonObj, function(item){
            return (item.TYPE == "Theft Of Auto Under $5000" || item.TYPE == "Theft Of Auto Over $5000");
        });
        filtr(filtered);
        //console.log(filtered);
        saveCrimes(filtered);
        csvConverter.end();
    });

}

module.exports = {parseData: parseData};