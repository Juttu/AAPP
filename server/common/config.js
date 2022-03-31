const crypto = require('crypto');

exports.PORT = process.env.PORT || 8080;
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/app_db';
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.OTP_SECRET = process.env.OTP_SECRET || crypto.randomBytes(64).toString('hex');
exports.JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
exports.F2S_API_KEY = process.env.F2S_API_KEY;