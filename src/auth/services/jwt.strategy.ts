import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    // local authentication
    // super({
    //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //     secretOrKey: process.env.JWT_SECRET
    // });

    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  // local validation without auth 0
  // async validate(payload: { userId: number }) {
  //     const user = await this.usersService.findOne(payload.userId);

  //     if (!user) {
  //         throw new UnauthorizedException();
  //     }

  //     return user;
  // }

  // Auth0 handles all of the user authentication tasks for you in your tenant
  validate(payload: unknown): unknown {
    return payload;
  }
}
