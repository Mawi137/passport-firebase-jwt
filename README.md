# passport-firebase-jwt

Based on [passport-jwt](https://github.com/mikenicholson/passport-jwt) 

A [Passport](http://passportjs.org/) strategy to authenticate with Firebase Auth.

This module lets you authenticate endpoints when using Firebase Auth in a Node.js application.

## Install

    npm install passport-firebase-jwt

## Usage

NestJS TypeScript usage example:

`firebase.strategy.ts`
```ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase') {

    constructor(@Inject("admin.Auth") private readonly auth: admin.auth.Auth) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    validate(token) {
        return this.auth
            .verifyIdToken(token, true)
            .catch((err) => {
                console.log(err);
                throw new UnauthorizedException();
            });
    }
}
```

`firebase-auth.guard.ts`
```ts
import {AuthGuard} from "@nestjs/passport";

export class FirebaseAuthGuard extends AuthGuard('firebase') {
}
```

`auth.module.ts`
```ts
@Module({
    imports: [PassportModule],
    providers: [FirebaseAuthStrategy, FirebaseAuthGuard, {
        provide: "admin.Auth",
        useFactory: () => {return admin.initializeApp().auth()}
    }],
    exports: [FirebaseAuthStrategy, FirebaseAuthGuard],
    controllers: [],
})
export class AuthModule {}
```

`app.module.ts`
```ts
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';


@Module({
    imports: [
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
```

`app.controller.ts`
```
import {Controller, Get, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {FirebaseAuthGuard} from "./auth/firebase-auth.guard";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### Extracting the JWT from the request

There are a number of ways the JWT may be included in a request.  In order to remain as flexible as
possible the JWT is parsed from the request by a user-supplied callback passed in as the
`jwtFromRequest` parameter.  This callback, from now on referred to as an extractor,
accepts a request object as an argument and returns the encoded JWT string or *null*.

#### Included extractors

A number of extractor factory functions are provided in passport-jwt.ExtractJwt. These factory
functions return a new extractor configured with the given parameters.

* ```fromHeader(header_name)``` creates a new extractor that looks for the JWT in the given http
  header
* ```fromBodyField(field_name)``` creates a new extractor that looks for the JWT in the given body
  field.  You must have a body parser configured in order to use this method.
* ```fromUrlQueryParameter(param_name)``` creates a new extractor that looks for the JWT in the given
  URL query parameter.
* ```fromAuthHeaderWithScheme(auth_scheme)``` creates a new extractor that looks for the JWT in the
  authorization header, expecting the scheme to match auth_scheme.
* ```fromAuthHeaderAsBearerToken()``` creates a new extractor that looks for the JWT in the authorization header
  with the scheme 'bearer'
* ```fromExtractors([array of extractor functions])``` creates a new extractor using an array of
  extractors provided. Each extractor is attempted in order until one returns a token.
