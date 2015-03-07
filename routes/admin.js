/**
 * Created by michaelwagler on 2015-03-05.
 *
 * Callback functions for handling admin requests
 */

module.exports = function (req, res) {

    res.render('admin', {
        title: 'Admin Panel Page',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()});

};