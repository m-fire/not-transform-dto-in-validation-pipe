import { JwtModuleOptions } from '@nestjs/jwt'

export const defaultJwtModuleOptions: JwtModuleOptions = {
    secret: 'S3cr3tk3yS3cr3tk3yS3cr3tk3yS3cr3tk3y',
    signOptions: {
        expiresIn: 3600,
    },
}
