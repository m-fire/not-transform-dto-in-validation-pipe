import { ResourceNotAllowedException } from '@src-support/infra/web/exception'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

export const validateImageExtension = /\.(jpg|jpeg|png|gif|ico|webp|svg)$/
export const validateFontExtension = /\.(ttf|eot|otf|woff|woff2)$/
export const validateMediaExtension = /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/

export const imageFileFilter: MulterOptions['fileFilter'] = (
    req,
    file,
    callback,
) => {
    // TODO: 향후, 파일의 실제포멧 검증
    const matchedArray: RegExpMatchArray | null = file.originalname.match(
        validateImageExtension,
    )
    if (matchedArray == null) {
        return callback(
            new ResourceNotAllowedException(
                '`imageFileFilter` Function',
                file.originalname,
                (responseMessage) => `이미지가 아닌 파일은 ${responseMessage}`,
            ),
            false,
        )
    }

    return callback(null, true)
}
