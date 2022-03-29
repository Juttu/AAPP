exports.PORT = process.env.PORT || 8080;
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/mongoHeadlines';
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.OTP_SECRET = process.env.OTP_SECRET || 'secret';
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
exports.TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
exports.TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
exports.TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
exports.TWILIO_MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID;