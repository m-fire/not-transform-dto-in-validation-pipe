import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { v4 as uuidV4 } from 'uuid'
import { imageFileFilter } from '@src-support/infra/data/file'
import { DynamicModule } from '@nestjs/common'

export const defaultMulterModuleOptions: MulterModuleOptions = {
    /* upload storage engine */
    storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) =>
            callback(null, `${uuidV4()}.${file.mimetype.split('/')[1]}`),
    }),
    fileFilter: imageFileFilter, // 파일 확장자 제한
    limits: {
        fileSize: 1024 * 1024 * 100, // 100M 용량 제한
    },
}

export const multerModule: DynamicModule = MulterModule.register(
    defaultMulterModuleOptions,
)
