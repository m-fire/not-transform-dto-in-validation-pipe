import { Injectable } from '@nestjs/common'
import { PickRepository } from '@src-support/infra/data/typeorm'
import { ImageEntity } from '@src-module/file/domain'
import {
    ImageOutputPort,
    SaveOrUpdateReturn,
} from '@src-module/file/image.output.port'

@Injectable()
export class ImageOutputAdapter
    extends PickRepository(ImageEntity)
    implements ImageOutputPort
{
    async save(image: ImageEntity): Promise<ImageEntity> {
        return this.repository.save(image)
    }

    async saveAll(...images: ImageEntity[]): Promise<ImageEntity[]> {
        return this.repository.save(images)
    }

    async findAllByOwnerId(ownerId: string): Promise<ImageEntity[]> {
        return this.repository.find({ where: { ownerId } })
    }

    async deleteAll(...images: ImageEntity[]): Promise<void> {
        await this.repository.delete(images.map((i) => i.sequence))
    }

    async saveOrUpdate(...images: ImageEntity[]): Promise<SaveOrUpdateReturn> {
        const result = await this.insert()
            .values(images)
            .orUpdate(['url'])
            .execute()
        return {
            sequences: result.identifiers.map((o) => parseInt(o['sequences'])),
        }
    }
}
