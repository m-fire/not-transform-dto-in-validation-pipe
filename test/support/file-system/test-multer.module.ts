import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { DynamicModule } from '@nestjs/common'
import { defaultMulterModuleOptions } from '@src-root/config'
import { ResourceNotAllowedException } from '@src-support/infra/web/exception'
import { TestFileConfig } from '@test-support/file-system/test-file.config'
import { TestUniqueIdHolder } from '@test-support/mock'
import { Objects } from '@src-support/infra/typescript'
import { validateImageExtension } from '@src-support/infra/data/file'

export const testImageFileFilter: MulterModuleOptions['fileFilter'] = (
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
                '[TEST]`testImageFileFilter` Function',
                file.originalname,
                (responseMessage) => `이미지가 아닌 파일은 ${responseMessage}`,
            ),
            false,
        )
    }

    return callback(null, true)
}

export function createTestMulterModuleOptions(
    testFileSequence: string[] = [...TestFileConfig.FILENAME_SEQUENCE],
): MulterModuleOptions {
    const uniqueIdHolder = new TestUniqueIdHolder(testFileSequence)
    return Objects.updateShallow<MulterModuleOptions, MulterModuleOptions>(
        defaultMulterModuleOptions,
        {
            storage: diskStorage({
                destination: './upload',
                filename(req, file, callback) {
                    const ext = file.mimetype.split('/')[1]
                    callback(null, `${uniqueIdHolder.random()}.${ext}`)
                },
            }),
            fileFilter: testImageFileFilter,
        },
    )
}

export const testMulterModule: DynamicModule = MulterModule.register(
    createTestMulterModuleOptions(),
)
