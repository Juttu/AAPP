const crypto = require('crypto');

exports.PORT = process.env.PORT || 8080;
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Anurag:Anurag@cluster0.toske.mongodb.net/Waitlist?retryWrites=true&w=majority';
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.OTP_SECRET = "1wES1i1gcaFhA65jk0Ea0f8XbnuEiiUo" || crypto.randomBytes(64).toString('hex');
exports.JWT_SECRET = "Z3cwqPiWW21owQvOMxFYb9iMhXXJPnUA" || crypto.randomBytes(64).toString('hex');
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
exports.F2S_API_KEY = "Hu7vyw2WULaKPMNfrVFgdqETJoBcQnGeSjp6iXl891ZCstR0IhFBdib10hJItaRq43CK2W7uenSXMAD5";