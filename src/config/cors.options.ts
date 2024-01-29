import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

export const defaultCorsOptions: CorsOptions = {
    origin: true,
    credentials: true,
}
