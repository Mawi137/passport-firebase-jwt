var Strategy = require('../lib/strategy');

describe('Strategy', function() {
    var strategy = new Strategy({jwtFromRequest: function(){}, secretOrKey: 'secret', passReqToCallback: false}, function() {});

    it('should be named jwt', function() {
        expect(strategy.name).to.equal('firebase-jwt');
    });

    it('should throw if constructed without a verify callback', function() {
        expect(function() {
            var s = new Strategy({jwtFromRequest: function(r) {}, secretOrKey: 'secret'});
        }).to.throw(TypeError, "JwtStrategy requires a verify callback");
    });

    it('should throw if constructed with both a secretOrKey and a secretOrKeyProvider', function () {
        expect(function() {
            var s = new Strategy({
                jwtFromRequest: function(r) {}
            });
        }).to.throw(TypeError);
    });

    it('should throw if constructed without a jwtFromRequest arg', function() {
        expect(function() {
            var s = new Strategy({secretOrKey: 'secret'}, function() {});
        }).to.throw(TypeError);
    });
});
