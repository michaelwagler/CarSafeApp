/**
 * Created by michaelwagler on 2015-03-05.
 */

/**
 * General database settings and other app-wide settings will go here.
 *
 * @type {{cookieSecret: string, uri: string}}
 */


module.exports = {
    cookieSecret: 'myblog',
    //eg  dbType://dbUser:dbPassword@HostName:portnumber/Db_name
    uri: "mongodb://localhost/CarSafe"
    // for production, enter in the remote database uri instead
    //uri:   'mongodb://michael:mfv65dm@ds049641.mongolab.com:49641/heroku_app34387684'
};