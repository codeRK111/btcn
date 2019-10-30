/**
 * For development you can set the variables by creating a .env file on the root
 */
var fs = require('fs');
var production = process.env.NODE_ENV === 'production';

var prodConfig;
if(production) {
  prodConfig = JSON.parse(fs.readFileSync(__dirname + '/build-config.json'));
  console.log('Build config loaded: ', prodConfig);
}

module.exports = {
  "PRODUCTION": production,
  "DATABASE_URL": process.env.DATABASE_URL || "postgres://user:rk111localhost:5432/ldb",
  "BIP32_DERIVED": process.env.BIP32_DERIVED_KEY,
  "AWS_SES_KEY": process.env.AWS_SES_KEY,
  "AWS_SES_SECRET": process.env.AWS_SES_SECRET,
  "CONTACT_EMAIL": process.env.CONTACT_EMAIL || "socialgameshop@gmail.com",
  "SITE_URL": process.env.SITE_URL || "http://localhost:3841",
  "ENC_KEY": process.env.ENC_KEY || "devkey",
  "SIGNING_SECRET": process.env.SIGNING_SECRET || "secret",
  "BANKROLL_OFFSET": parseInt(process.env.BANKROLL_OFFSET) || 0,
  "RECAPTCHA_PRIV_KEY": process.env.RECAPTCHA_PRIV_KEY || '6LctMz8UAAAAAMOs_kDHHXarRbC17xBngzkYInBC',
  "RECAPTCHA_SITE_KEY": process.env.RECAPTCHA_SITE_KEY || '6LctMz8UAAAAACdBMzpFHVXzJ7Aenk878-tPnfp_',
  "litecoinD_HOST": process.env.litecoinD_HOST,
  "litecoinD_PORT": process.env.litecoinD_PORT || 8332,
  "litecoinD_USER": process.env.litecoinD_USER,
  "litecoinD_PASS": process.env.litecoinD_PASS,
  "litecoinD_CERT": process.env.litecoinD_CERT  || '',
  "PORT":  process.env.PORT || 8080,
  "MINING_FEE": process.env.MINING_FEE || 100000,
  "BUILD": prodConfig
};
