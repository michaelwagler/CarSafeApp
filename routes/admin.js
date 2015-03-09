/**
 * Created by michaelwagler on 2015-03-05.
 *
 * Callback functions for handling admin requests
 *
 *
 *  Mar 08. Added Functionality by Edward:
 *  ---- File Downloading from any FTP link that does not require authentication
 *  ---- Error handling included, Only valid ftp link with files can be downloaded
 *  ---- All downloaded files are temporarily stored in download_data/temp/ folder
 */

function get(req, res) {

    res.render('admin', {
        title: 'Admin Panel Page',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()});

}

function download(req,res) {
    var link = req.body['link'];

    if(!isAFTPLink(link))
    {
        req.flash('error', 'LINK cannot be invalid!');
        return res.redirect('/admin');
    }
        //console.log(getFTPFilename(link));
        //console.log(getFTPHost(link));
        //console.log(getFTPLink(link));
        var JSFtp = require("jsftp");

        var ftp = new JSFtp({
            host: getFTPHost(link),
            port: 21, // defaults to 21
            user: "anonymous", // defaults to "anonymous"
            pass: "anonymous@" // defaults to "@"
        });
        var filename = Date.now() + getFTPFilename(link);
        var localpath = 'download_data/temp/'+filename;
        console.log(filename);

    ftp.get(getFTPLink(link), localpath, function(hadErr) {
        if (hadErr){
            //console.error('There was an error retrieving the file.');
            req.flash('error', 'Cannot download file from provided FTP LINK!');
            return res.redirect('/admin');
        }

        else {
            console.log('File copied successfully!');
            req.flash('success', 'File copied successfully!');
            res.redirect("/admin");
        }
    });


}

function getFTPLink(link)
{
    var ftpLink;
    var startposFTPLink = 6;
    console.log(link.length);
    for(var i=startposFTPLink; i<link.length;i++)
    {
        if(link.charAt(i)=='/')
        {
            ftpLink= link.substr(i+1);
            return ftpLink;
        }
    }
}

function getFTPHost(link)
{
    var host;
    var startposFTPLink = 6;
    console.log(link.length);
    for(var i=startposFTPLink; i<link.length;i++)
    {
        if(link.charAt(i)=='/')
        {
            host= link.substr(0,i);
            host= host.substr(6);
            return host;
        }
    }
    return null;
}

function getFTPFilename(link){
    var filename;
    for(var i=link.length-1; i>=0;i--)
    {
        if(link.charAt(i)=='/')
        {
            filename= link.substr(i+1);

            return filename;
        }
    }
}

function isAFTPLink(link){
    var aLink = link+"";
    console.log(aLink.substr(0,6));
    if(aLink=="") return false;
    else return aLink.substr(0, 6).toLowerCase() == "ftp://";

}

module.exports = {
    get: get,
    download: download
};