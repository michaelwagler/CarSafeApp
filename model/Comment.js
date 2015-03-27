/**
 * Created by michaelwagler on 2015-03-26.
 */
/**
 *
 * Comment class and mongoose model. Provides a mongoose schema, defines Comment properties
 * and database CRUD operations.
 *
 */

var config = require('../config');
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
        title: String,
        body: String
    },
    { collection: 'Comments' });

var commentModel = mongoose.model('Comment', CommentSchema);


function Comment(Comment) {
    this.title = Comment.title;
    this.body = Comment.body;
}

Comment.prototype.save = function(callback) {
    var Comment = {
        title: this.title,
        body: this.body
    };
    var newComment = new commentModel(Comment);
    newComment.save(function (err, Comment) {
        if (err) {
            console.log('error in newComment.save:', err);
            return callback(err);
        }
        callback(null, Comment);
    });
};

Comment.get = function(title, callback) {
    commentModel.findOne({title: title},
        function (err, Comment) {
            if (err) {
                return callback(err);
            }
            callback(null, Comment);
        });
};

Comment.removeAll = function(callback){
    commentModel.collection.drop(function(err){
        if (err){
            return callback(err);
        }
        callback(null);
    });
};

Comment.getAll = function( callback){
    commentModel.find({}, 'title, body', function(err, docs) {
        if (!err){
            callback(null, docs);
        } else {
            return callback(err);}
    });

};



module.exports = Comment;
