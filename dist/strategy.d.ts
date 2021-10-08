export = FirebaseJwtStrategy;
/**
 * Strategy constructor
 *
 * @param options
 *          jwtFromRequest: (REQUIRED) Function that accepts a request as the only parameter and returns the either JWT as a string or null
 *          passReqToCallback: If true the verify callback will be called with args (request, jwt_payload, done_callback).
 * @param verify - Verify callback with args (jwt_payload, done_callback) if passReqToCallback is false,
 *                 (request, jwt_payload, done_callback) if true.
 */
declare function FirebaseJwtStrategy(options: any, verify: any): void;
declare class FirebaseJwtStrategy {
    /**
     * Strategy constructor
     *
     * @param options
     *          jwtFromRequest: (REQUIRED) Function that accepts a request as the only parameter and returns the either JWT as a string or null
     *          passReqToCallback: If true the verify callback will be called with args (request, jwt_payload, done_callback).
     * @param verify - Verify callback with args (jwt_payload, done_callback) if passReqToCallback is false,
     *                 (request, jwt_payload, done_callback) if true.
     */
    constructor(options: any, verify: any);
    name: string;
    _jwtFromRequest: any;
    _verify: any;
    _passReqToCallback: any;
    /**
     * Authenticate request based on JWT obtained from header or post body
     */
    authenticate(req: any, options: any): any;
}
