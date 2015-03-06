/**
 * Created by michaelwagler on 2015-03-05.
 */

module.exports = function (req, res) {

    res.render('admin', {
        title: 'Admin Panel Page',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()});

};