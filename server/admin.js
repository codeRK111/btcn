var assert = require('assert');
var async = require('async');
var database = require('./database');
var config = require('../config/config');
var spawn=require('child_process').spawn;
/**
 * The req.user.admin is inserted in the user validation middleware
 */

exports.giveAway = function(req, res) {
    var user = req.user;
    assert(user.admin);
    res.render('giveaway', { user: user });
};

exports.giveAwayHandle = function(req, res, next) {
    var user = req.user;
    assert(user.admin);

    if (config.PRODUCTION) {
        var ref = req.get('Referer');
        if (!ref) return next(new Error('Possible xsfr')); //Interesting enough to log it as an error

        if (ref.lastIndexOf('https://www.ltcnyan.com/admin-giveaway', 0) !== 0)
            return next(new Error('Bad referrer got: ' + ref));
    }

    var giveAwayUsers = req.body.users.split(/\s+/);
    var bits = parseFloat(req.body.bits);

    if (!Number.isFinite(bits) || bits <= 0)
        return next('Problem with bits...');

    var satoshis = Math.round(bits * 100);

    database.addRawGiveaway(giveAwayUsers, satoshis , function(err) {
        if (err) return res.redirect('/admin-giveaway?err=' + err);

        res.redirect('/admin-giveaway?m=Done');
    });
};

exports.stats = function(req, res) {
    var user = req.user;
    assert(user.admin);
    var child=spawn('litecoin-cli -rpcport=8332 -rpcuser=sohan -rpcpassword=sohan@111 getbalance');


    child.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
    //Here is where the error output goes
    });
    child.stdout.on('data', function(data) {
    console.log(data.toString()); 
    });
    
    res.render('adminpage', { user: user });
};
