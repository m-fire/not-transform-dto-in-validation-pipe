import { IAuthModuleOptions } from '@nestjs/passport'

export const defaultJwtAuthModuleOptions: IAuthModuleOptions = {
    defaultStrategy: 'jwt',
}
