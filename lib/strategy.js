var passport = require('passport-strategy')
    , util = require('util');

/**
 * Strategy constructor
 *
 * @param options
 *          jwtFromRequest: (REQUIRED) Function that accepts a request as the only parameter and returns the either JWT as a string or null
 *          passReqToCallback: If true the verify callback will be called with args (request, jwt_payload, done_callback).
 * @param verify - Verify callback with args (jwt_payload, done_callback) if passReqToCallback is false,
 *                 (request, jwt_payload, done_callback) if true.
 */
function FirebaseJwtStrategy(options, verify) {

    passport.Strategy.call(this);
    this.name = 'firebase-jwt';

    this._jwtFromRequest = options.jwtFromRequest;
    if (!this._jwtFromRequest) {
        throw new TypeError('FirebaseJwtStrategy requires a function to retrieve jwt from requests (see option jwtFromRequest)');
    }

    this._verify = verify;
    if (!this._verify) {
        throw new TypeError('JwtStrategy requires a verify callback');
    }
    this._passReqToCallback = options.passReqToCallback;
}
util.inherits(FirebaseJwtStrategy, passport.Strategy);


/**
 * Authenticate request based on JWT obtained from header or post body
 */
FirebaseJwtStrategy.prototype.authenticate = function(req, options) {
    var self = this;
    var token = self._jwtFromRequest(req);

    if (!token) {
        return self.fail(new Error('No auth token'));
    }

    var verified = function(err, user, info) {
        if(err) {
            return self.error(err);
        } else if (!user) {
            return self.fail(info);
        } else {
            return self.success(user, info);
        }
    };

    if (self._passReqToCallback) {
        self._verify(req, token, verified);
    } else {
        self._verify(token, verified);
    }
};

/**
 * Export the Jwt Strategy
 */
 module.exports = FirebaseJwtStrategy;
