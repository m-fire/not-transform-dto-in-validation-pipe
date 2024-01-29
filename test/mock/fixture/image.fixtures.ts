import { Objects } from '@src-support/infra/typescript'
import { ImageEntity, ImageProps } from '@src-module/file/domain'
import { TestFileConfig } from '@test-support/file-system'
import { InitialValue } from '@src-support/domain/constant'

const { UPLOAD_SERVER_PATH, TEST_FILE_ROOT } = TestFileConfig

export class ImageFixture {
    static readonly IMAGE_FILE_NAME = 'image-1x1.jpg'
    static readonly UPLOAD_TARGET_FILE_PATH = `${TEST_FILE_ROOT}\\${this.IMAGE_FILE_NAME}`
    static readonly UPLOAED_SERVER_FILE_PATH = `${UPLOAD_SERVER_PATH}/${TestFileConfig.FILE_ID_1}.jpeg`
    static readonly PROPS: ImageProps = {
        url: this.UPLOAED_SERVER_FILE_PATH,
        ownerId: InitialValue.ULID_STRING,
    }

    static create(props: ImageProps = this.PROPS): ImageEntity {
        const image = Objects.updateShallow(new ImageEntity(), {
            ...this.PROPS,
            ...props,
        })
        image.validate()
        return image
    }
}
