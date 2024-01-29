import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKey: 'S3cr3tk3yS3cr3tk3yS3cr3tk3yS3cr3tk3y',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate({ subject: email }: any) {
        return email
    }
}
