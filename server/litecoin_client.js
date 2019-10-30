var litecoin = require('node-litecoin');
var fs = require('fs');
var path = require('path');
var config = require('../config/config');

var client = new litecoin.Client({
    host: config.litecoinD_HOST||'localhost',
    port: config.litecoinD_PORT||8332,
    user: config.litecoinD_USER||'sohan',
    pass: config.litecoinD_PASS||'sohan@111',
    ssl: false,
    sslStrict: false,
    sslCa: new Buffer(config.litecoinD_CERT)
});

module.exports = client;
